---
title: Inline TypeScript with GitHub Actions
---

When working with [GitHub Actions](https://github.com/features/actions) it is very trivial to run inline shell scripts like this:

```yaml
jobs:
  test:
    steps:
      - run: |
          echo 'Hello'
          sleep 5
          echo 'Sleepyhead'
```

That works just fine and is easy.  But, I enjoy writing shell scripts with TypeScript (checkout my library [jsh](https://github.com/bradymholt/jsh)!) and to use TypeScript with Actions, I've usually created a script file and then called it separately.  This requires checking out files from the repo which slows the workflow down and I prefer having most everything in the workflow file itself unless it is more complex.

Recently, I came across a pattern, using [ts-node](https://typestrong.org/ts-node/), to run TypeScript that is defined inline from the workflow file.  It looks like this:

```yaml
jobs:
  test:
    steps:
      - run: |
          npx ts-node <<EOF
            const sleepMs:number = 5000;
            console.log("Hello");
            setTimeout(()=> console.log("Sleepyhead"), sleepMs);
          EOF
```

Nice!  So, you can just write TypeScript right within your workflow file.

### ES Modules
If you want to use an ES Module for top-level await support, the syntax is a bit different:

```yaml
jobs:
  test:
    steps:
      - run: |
          npm install ts-node
          node --loader ts-node/esm --no-warnings --input-type=module <<EOF
            console.log("Hello");
            await new Promise((resolve) => setTimeout(resolve, 5000));
            console.log("Sleepyhead");
          EOF
```
