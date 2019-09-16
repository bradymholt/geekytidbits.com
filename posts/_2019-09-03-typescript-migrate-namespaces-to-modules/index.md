---
title: "TypeScript Global Namespaces to Modules"
---

We love TypeScript at YNAB.  One of our main modules is something we called the "Shared Library" and it is a quite large TypeScript project.  Actually, it's comprised of 3 library projects and 3 test projects.  It's big.

To setup progressive migration for our very large project I end up doing this:

1. Added `"exclude": ["**/*.m.ts"]` to my tsconfig.json file in my original global / namespace project.  This allows me to create modules with .m.ts extention and keep the `outFile` config.
2. Created `tsconfig.module.json` file adjacent to my main tsconfig.json file.
3. Used a [project reference](https://www.typescriptlang.org/docs/handbook/project-references.html) in my tsconfig.module.json file to the namespace project: `"references": [{ "path": "./tsconfig.json" }]`.  This makes the global / namespace _types_ available from within my modules project.  It doesn't emit the code for this project but it tells TypeScript to assume these types will be available at runtime.

It looks like this:

#### tsconfig.json
```
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
```
{
  "compilerOptions": {
    "module": "esnext"
  }
  "files": ["./MyClass.m.ts"],
}
```

With the above setup, I can create module files with the extension `.m.ts` adjacent to my existing namespace files like this:

```
- MyClass.ts
- MyClass.m.ts
```

Then, as @DanielRosenwasser [pointed out](https://github.com/Microsoft/TypeScript/issues/12473#issuecomment-263374060), I can use existing code from the namespaced code and wrap it in the module file.

So, my MyClass.m.ts file might look like this, where I reference and call code from my original namespace file:
```
export class MyClass {
  my_namespace.MyClass.hello();
}
```

Then, I have a webpack config that uses one of my module files as an entry point:

#### webpack.config.js
```
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

Notice that I'm using ts-loader and specify `tsconfig.module.json` as the config file.

Finally, in my client, I can include a reference to my original namespace outFile and also the webpack bundle and things seem to work:

#### index.html
```
<head>
  <script src="dist/package.js"></script> <!-- outFile output from tsc -->
  <script src="dist/bundle.js"></script> <!-- webpack bundle -->
</head>
```

Once I've converted over all the files to modules I can remove the original namespace project.

I have an example repository here: https://github.com/bradymholt/ts-progressive-convert-namespace-modules.
