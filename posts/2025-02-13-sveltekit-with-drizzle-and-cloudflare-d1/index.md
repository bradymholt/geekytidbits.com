---
title: SvelteKit with Drizzle and Cloudflare D1
---

I recently started a little side project for my wife and decided to use [SvelteKit](https://svelte.dev/) to build it and [Cloudflare](https://www.cloudflare.com/) to host it. Along the way I decided to use [Drizzle ORM](https://orm.drizzle.team/) along with [Cloudflare D1](https://developers.cloudflare.com/d1/) to store the data. I was really happy with how everything worked but I did run into a few issues: using a local SQLite database for development and applying migrations to both dev and production environments.  After some fiddling I got things working nicely and wanted to document my setup here.

## Instructions

First off, you'll want to follow the [Get Started with Drizzle and SQLite](https://orm.drizzle.team/docs/get-started/sqlite-new) docs to get a local SQLite database setup and working within SvelteKit. This will involve installing some npm packages and creating a few files including the `drizzle.config.ts` file and the `schema.ts` file. Be sure to run `npx drizzle-kit generate && npx drizzle-kit migrate` to create and run the initial migration file from `./drizzle` folder. The guide [SvelteKit with SQLite and Drizzle](https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle) might be helpful here.

**Before proceeding with the instructions below, your app should be setup to work with a local SQLite database using Drizzle.**

Now, you'll want to get your app configured to work with Cloudflare Pages.  Follow the SvelteKit [Cloudflare Pages](https://svelte.dev/docs/kit/adapter-cloudflare) instructions.  You will basically install a npm package and and modify the `svelte.config.js` file.

#### svelte.config.js changes

I did find that the instructions for `svelte.config.js` needed to be changed slightly. `platformProxy.persist` needs to be set to `true` in order to persist the local SQLite database.  Also, change `configPath` to `"wrangler.json"` (from `"wrangler.toml"`).

```js
platformProxy: {
  // Other config ...
  configPath: "wrangler.json";
  persist: true;
}
```

### Install and configure wrangler

Install the `wrangler` CLI tool with `npm install wrangler --save-dev`.

Then, create a `wrangler.json` file with the following contents in the root of your project.

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my_project_name",
  "compatibility_date": "2025-02-04",
  "pages_build_output_dir": ".svelte-kit/cloudflare",
  "d1_databases": [
    {
      "migrations_dir": "./drizzle",
      "binding": "DB",
      "database_name": "my-d1-database-name",
      "database_id": "database_id_TBD"
    }
  ]
}
```

### Create remote D1 database

Now, you'll create your D1 database on Cloudflare using the `wrangler` CLI.

Run the following:

```shell
npx wrangler d1 create my-d1-database-name
```

The output of this command will provide you with JSON config for the `wrangler.json` file.  Just copy paste the value of `database_id` and update your `wrangler.json` file, replacing the `"database_id_TBD"` value.

### Create local "D1" (SQLite) database

To create a local SQLite database used for development, you will first need to find the name of the initial Drizzle migration file.  This file should be named in format `0000_[migration_file].sql` and be located in the `./drizzle` directory.

Now, run the following command, specifying the specific migration file you located.

```shell
npx wrangler d1 execute my-d1-database-name --local --file=./drizzle/0000_[migration_file].sql
```

A .sqlite file will be created in `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/`.  You should find this file name note it's name.

### drizzle.config.ts

The `drizzle.config.ts` file is used by Drizzle when working with migrations. You need to change the `dbCredentials.url` to the location of the SQLite database created by wrangler in the previous step.

Your `drizzle.config.ts` file will look something like this:
```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/server/schema",
  dialect: "sqlite",
  out: "./drizzle",
  dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/e7352547963de7050bd7d94658afc4fe78b61811b7815da12d90be8e863abf4d.sqlite",
  },
});
```

### SvelteKit modifications

Update your `app.d.ts` file to include the `env: Env` field.  Cloudflare (and wrangler locally) will inject the `DB` variable binding into the `env` object which will be used to connect to D1.

```ts
declare global {
	namespace App {
		interface Platform {
			env: Env;
		}
	}
}

export {};
```

Now, anywhere you want to interact with D1 in your SvelteKit code, you'll want to `import { drizzle } from 'drizzle-orm/d1';` and instantiate a db object by passing in the `DB` binding like this: `const db = drizzle(platform.env.DB);`.

Here is an example of how you would set things up and select from a `users` table:
```
import { drizzle } from 'drizzle-orm/d1';

export const actions = {
  fetchUsers: async ({ request, platform }) => {
    const db = drizzle(platform.env.DB);
    const users = await db.select().from("users");
    ...
  }
} satisfies Actions;

```


### package.json

Finally, add the following scripts to `package.json` to make it easier to work with the database and deploy the site.

- `db:migrate:local` - Migrate the local SQLite database
- `db:migrate:prod` - Migrate the Cloudflare D1 database
- `deploy` - Build the site, migrate the production Cloudflare D1 database, and deploy the site

```json
{
  "scripts": {
    ...
    "db:migrate:local": "drizzle-kit migrate",
    "db:migrate:prod": "wrangler d1 migrations apply DB --remote",
    "deploy": "npm run build && npm run db:migrate:prod && wrangler pages deploy"
  }
}
```

Note: for `db:migrate:prod`, we call `wrangler d1 migrations apply` which uses the `wrangler` CLI (rather than `drizzle-kit`!) to apply the migrations to D1. `wrangler` is able to read and work with the migrations created by Drizzle. I found ways for `drizzle-kit` to do this directly, but it was more complicated and I found this to be the easiest way to do it.

### Starting up local development

Run `npm run db:migrate:local` to run any pending migrations you may have for the local database.  Then run `npm run dev` to start up the local development server.  All interactions with Drizzle should now be targeting the local SQLite database, using the `DB` binding.

### Deploying to Cloudflare

Run `npm run deploy` to build the site, run any pending migrations on Cloudflare D1, and deploy the site to Cloudflare.
