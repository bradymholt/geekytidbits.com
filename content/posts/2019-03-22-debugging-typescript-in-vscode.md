---
title: "Debugging TypeScript in VSCode"
permalink: /debugging-typescript-in-vscode/
---

![VSCode, ts-node, debugging](/media/vscode-ts-node-debugging.png)

I am a big fan of using [ts-node](https://github.com/TypeStrong/ts-node) for working with TypeScript from within Node.js.  During development I fire up my app with `ts-node src/index.ts` rather than doing an intermediate `tsc` build step and then pointing Node at the .js output.  Sure, ts-node is still calling TypeScript under the hood but it makes the whole process smooth.

I also like using the [VSCode](https://code.visualstudio.com/) debugger for debugging my TypeScript.  With the help of `ts-node` this is also a smooth process.  Here's how you do it.

First, install the `ts-node` dependency into your Node.js app by running `npm install ts-node`.

Then, create your entry TypeScript file.  For this example, I'll create `index.ts` in the project root and it looks like this:

```typescript
const foo = 1;
console.log(foo);
```

Now, add (or modify) a `.vscode/launch.json` file so that looks like this:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug index.ts",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeArgs": ["-r", "ts-node/register"],
      "args": ["${workspaceRoot}/index.ts"]
    }
  ]
}
```

Now, add a breakpoint in your TypeScript code.

![Set Breakpoint in VSCode](/media/vscode-breakpoint.gif)

Now, start debugging in VSCode:

![Start Debug in VSCode](/media/vscode-debug.png)

![Start Debug in VSCode](/media/vscode-debugging.png)

Volila!  You're now debugging your TypeScript without having to fuss with an intermediate transpile step or fussing with sourcemap settings.

I've created a repo called [vscode-debugging-ts-code](https://github.com/bradymholt/vscode-debugging-ts-code) that has all of the setup correctly.  Using this project looks like this:


![2019-03-22_16-51-09 (1)](https://user-images.githubusercontent.com/759811/54855051-db697a00-4cc2-11e9-94ea-43c56e96e04d.gif)