---
title: "CLI apps in TypeScript via ts-node"
permalink: /cli-apps-in-typescript-via-ts-node/
---

I really like the [ts-node](https://github.com/TypeStrong/ts-node) project.  It allows you to run TypeScript in Node.js directly, without having to run the files through the TypeScript compiler (tsc), first.  It does this by registering a handler for files with the `.ts` or `.tsx` file extentions and relying upon ts-node to marshall back and forth to the TypeScript compiler, on the fly.  It also supports a TypeScript REPL which is really neat.

I've mainly been using it for unit tests in Node projects ([example](https://github.com/bradymholt/psqlformat/blob/master/package.json#L52)) to avoid having an intermediate build step.  Also, increasingly, I've been using it to execute TypeScript directly on some of my own server-side projects at runtime.  Again, doing this reduces a build-time step and reduces friction.

Lately, I've been using Node more and more to write CLI apps and thought it would be neat if ts-node could be used for this as well.  It turns out it's pretty easy.

First, install ts-node:

```
npm install ts-node
```

Then, create your TypeScript module file that will contain your CLI logic.

**cli.ts**

```typescript
export function run() {
  const message: string = "Hello from TypeScript!";
  console.log(message);
}
```


Now, create your entry script.  This is the script you will run from your shell.

**my-script**

```js
#!/usr/bin/env node

require('ts-node').register();
require('./cli.ts').run();
```

You need to make this file executable first, so run `chmod +x ./my-script`.

Now, you can run `./my-script` from your shell:

```bash
> ./my-script
Hello from TypeScript!
```

If you make changes to the cli.ts file, they will be picked up the next time you run my-script because the latest is running through ts-node.