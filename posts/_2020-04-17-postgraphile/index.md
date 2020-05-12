---
title: postgraphile
---

For the last few years, I've been on the hunt for a modern web develoment toolchain that is productive and not unnessarily complex.  I want to take advantage of frontend frameworks like Vue or React, but also have a backend that is easy to work with and backed by a datastore.  In recent past, when I've stood up pet project web applications, it's taken _a lot_ of work to get everything up and running.

Also, I've been wanting to learn more about and use GraphQL.

I came across a server called [PostGraphile](https://www.graphile.org/postgraphile/), which is promises that you can "Instantly spin-up a GraphQL API server by pointing PostGraphile at your existing PostgreSQL database".

I thought I could take it for a spin to learn more about GraphQL, experiment with a backend solution that could make things super easy.

Along the way, I decided upon a `run` script, that uses [jBash](https://github.com/bradymholt/jBash) to do all sorts of things in the project including starting up the development environment, running database migrations, and deploying to production.

Also, I established a pattern for handling configuration and secrets across multiple layers of the stack.  In previous projects I've had config sprawl.  In this project, I have a `.env` file with all config and secrets.  There is also a `.env.production` file that has overrites for production.  All config and secrets are in these files!  For the front-end, server, and database!  Docker is being used as a catalyst to pass these environment variables into the containers.

https://github.com/bradymholt/postgraphile
