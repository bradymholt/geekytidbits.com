---
title: "Progressive Conversion of TypeScript Namespaces to Modules"
---

We love TypeScript at <a href="https://youneedabudget.com">YNAB</a>.  One of our main modules is something we called the "Shared Library" and it is a quite large TypeScript project.  Actually, it's comprised of 3 library projects and 3 test projects.  It's big.  And, it was initially written using TypeScript namespaces, before TypeScript had support for ES modules.

We wanted to start converting this library over to using ES modules for the various benefits that gives including the ability to tree-shake and better development tooling.  But, it became obvious we needed to find a _progressive_ way to do this because a few attempts at an all-or-nothing approach proved daunting.  Thousands of errors and no simple or obvious way to automate the conversion.

Guidance for progressively converting a project from namespaces to modules is slim.  There is [this GitHub issue](https://github.com/Microsoft/TypeScript/issues/12473) where some discuss approaches but there are still some gaps the approaches.


To setup progressive migration, we ended up doing the following which has been working well for us.

1. Add `"exclude": ["**/*.m.ts"]` to the tsconfig.json file in the original global / namespace project.  This allows you to create modules with .m.ts extention and keep the `outFile` config.
2. Create a `tsconfig.module.json` file adjacent to the main tsconfig.json file.
3. Use a [project reference](https://www.typescriptlang.org/docs/handbook/project-references.html) in the tsconfig.module.json file pointing to the namespace project: `"references": [{ "path": "./tsconfig.json" }]`.  This makes the global / namespace _types_ available from within the modules project.  It doesn't emit the code for this project but it tells TypeScript to assume these types will be available at runtime.

It looks like this:

#### tsconfig.json
```json
{
  "compilerOptions": {
    "outFile": "../dist/package.js",
    "composite": true
  },
  "include": ["**/*.ts"],
  "exclude": ["**/*.m.ts"]
}
```

#### tsconfig.module.json
```json
{
  "compilerOptions": {
    "module": "esnext"
  }
  "files": ["./MyClass.m.ts"],
  "references": [{ "path": "./tsconfig.json" }]
}
```

With the above setup, you can create module files with the extension `.m.ts` adjacent to the existing namespace files like this:

```
- MyClass.ts
- MyClass.m.ts
```

Then, as @DanielRosenwasser [pointed out](https://github.com/Microsoft/TypeScript/issues/12473#issuecomment-263374060), you can use existing code from the namespaced code and wrap it in the module file.  You can also just export it as is:

```typescript
export import MyClass = my_namespace.MyClass;
```

Since this setup is using ES modules, you can now use a bundler like webpack to prepare it for web consumption.  In the following example, webpack
will be used with ts-loader.  Notice ts-loader is configured to use the `tsconfig.module.json` config file.

#### webpack.config.js
```javascript
module.exports = {
  entry: './src/MyClass.m.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: "./tsconfig.module.json" // Use the module project config!
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};
```

Finally, in your entry webpage, you can include a reference to the original namespace outFile and also the webpack bundle.

#### index.html
```html
<head>
  <script src="dist/package.js"></script> <!-- outFile output from tsc -->
  <script src="dist/bundle.js"></script> <!-- webpack bundle -->
</head>
```

Once you've converted over all the namespaced source files to modules, you can remove the original namespace project and stop loading it.

A more exhaustive example can be found in this repository: https://github.com/bradymholt/ts-progressive-convert-namespace-modules.
