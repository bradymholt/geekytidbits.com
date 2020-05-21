---
title: Playing with PostGraphile
---

Web development seems to have gotten more and more complicated in recent years.  When I've stood up pet project applications, it's taken _a lot_ of work to get everything up and running if I use _modern_ patterns such as a frontend JavaScript framework, bundling, JWT tokens for auth, Docker, etc.  Because of this, I've been on the hunt for a modern web develoment toolchain that is productive and not unnessarily complex.

I came across a server called [PostGraphile](https://www.graphile.org/postgraphile/), which promises that you can "Instantly spin-up a GraphQL API server by pointing PostGraphile at your existing PostgreSQL database".  This peaked my curiosity for 2 reasons: I've been wanting to learn more about GraphQL and also recognize that if I have a backend server that is trivial to standup and modify, a lot of complexity can be reduced.  I can spend more time focusing on the build out of the app interface itself.

So, I decided to build a simple app with it.  I mean simple.  Login and show a table of data simple:

![PostGraphile app](/postgraphile-playground/postgraphile-app.gif)

It went pretty well.  It was fun.  Would I use PostGraphile in a production app.  Maybe.  I'm not sure.  There were a few rough patches along the way (authentication and authorization) and some questions I still have (how do I integrate adjacent application logic so I can do something like send an email on signup?).  The fine folks behind the project have answers for these questions I'm sure.  I do like how it uses PostgreSQL for almost everything. They use it to generate JWT tokens and have an authorization system built on top of [Row Security Policies)](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).  Adding a table or field to an existing table and having access to it via GraphQL on the frontend was trivial and is the kind of simplicity I am chasing.  So, I wouldn't be surprised if I reach for this app in the future for a smaller scale project I am working on.

## Things I learned

As usual, I set out to learn a few things and ended up learning a lot.  This is one of the reasons I tell aspiring developers to _always_ be building _something_.

### PostgreSQL
- How to initialize a PostgreSQL server running in Docker with [SQL and shell scripts](https://github.com/bradymholt/postgraphile-playground/tree/master/db/init) in `/docker-entrypoint-initdb.d`.
- Building a server from the ground-up, including creating users and giving apprpropriate permissions.  I learned that "role" is synonymous with "user" in Postgres.
- [Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html), also known as Row-level security (RLS) in some other systems, is something that I learned a bit about while building this out.  It's a very powerful security system for PostgreSQL that gives fine grain control.

### Docker
I learned a lot more about Docker and Docker Compose.  In particular, I solidified my understanding of how environment variables are handled at build time and passed in at runtime.  Also, I learned how to use [nodemon](https://www.npmjs.com/package/nodemon) and the Vue CLI `serve` script to watch for changes and not have to stop and constantly rebuild a container.  This is more productive.

Also, I established a pattern for centralizing configuration and secrets across multiple layers of the stack using Docker and enviromment variables.  In previous projects I've dealt with config sprawl and it's not fun.  Compare having config for each part of the stack (web/secrets.yml, server/config.json, db/init.sql) vs. one (or 2 for overrides) config file in the root folder.  In this project, I have a `.env` file with all config and secrets.  There is also a `.env.production` file that has overrites for production.  All config and secrets are in these files!  For the front-end, server, and database!  Docker is being used as a catalyst to pass these environment variables into the containers.  I really like this pattern and will probably using it for other projects.

### Other
- How to use [Apollo GraphQL Client](https://www.apollographql.com/client/)
- I used the simple [db-migrate](https://www.npmjs.com/package/db-migrate) package to handle migrations in PostgreSQL.  This is a handy tool I will be using again in the future.
- I decided upon using a simple [run script](https://github.com/bradymholt/postgraphile-playground/blob/master/run), that uses [jBash](https://github.com/bradymholt/jBash), to do all sorts of things in the project including starting up the development environment, running database migrations, and deploying to production.  In the recent past I've used npm/package.json scripts for this sort of things but I am really liking having this simple run script for development tooling.

This was a fun build and I learned a ton.

The project source code is located here:
https://github.com/bradymholt/postgraphile-playground
