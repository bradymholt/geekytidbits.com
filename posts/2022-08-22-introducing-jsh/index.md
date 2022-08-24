---
title: Introducing jsh
---

Back in 2017, I released [jBash](/jbash/), which is a JavaScript library that provides helpers and Bash-like syntax.  The idea was to make writing scripts in JavaScript less verbose and approachable.  I've used it for some side projects and we've used it at [YNAB](https://www.youneedabudget.com/).  I've been generally happy with it and enjoyed not having struggle with the syntax of Bash scripts as much.

Over time, I began to form some stronger opinions for changes I thought would be good for this library.  In particular, while I enjoyed the syntax staying fairly close to Bash, I felt that some of it was a little _too_ close and started to become a burden.  Some examples:
-  In Bash, to echo all commands you run `set -x` at the top of a script and similarly in jBash, you run `set("-x")`.  While that works and is very similar to Bash, it's not very intuitive.
- By default, a Bash script will not exit with an error code if you run another command that fails.  But, you can run `set -e` to change this behavior.  When writing jBash scripts, I found that I was _always_ adding `set("-e")` to the top of scripts because I want this behavior to be the default.

Also, I found myself wanting some extras that have no Bash equivalent.  Sure, you can install an **npm** package for most anything but I like the idea of having most everything I need for writing a typical script at my fingertips without having to drop down into the big unbridled world of the npm registry.  Some examples:
- Usage helper(s) to print `--help` output
- HTTP request helpers
- Argument parsing and validation
- More file system helpers for things like reading and writing to files, determining if a file or directory exists, etc.
- Some other niceties that libraries like [zx](https://github.com/google/zx) provide

### New Library

Rather than doing a major version update to jBash, I decided to just create a new library, especially since I was able to acquire the `jsh` npm package name!

A few weeks ago, I released [jsh](https://github.com/bradymholt/jsh) as a new library.  It's similar in spirit to jBash but adds some of the aforementioned niceties like usage helpers, argument parsing and validation, sound defaults for error handling.  Oh yes, and it has a spiffy logo to boot:

![jsh logo](jsh-logo.png)

Here is a simple script example that writings some text to a file and shows off some of these niceties:

```
#!/usr/bin/env npx jsh

usage(`\
Usage:
  ${$0} text target_file [--verbose]

Example:
  ${$0} "My text" ./test.txt --verbose

Writes some text to a file\
`);

const [text, target_file] = args.assertCount(2);

if (args.verbose) echo(`Writing text to file...`);

writeFile(target_file, text);

if (args.verbose) echo.green(`Done!`);
```

This was a fun library to build and I tried to build it in a modern way.  It supports CommonJS and ESModules, and is built with TypeScript from the ground up so you'll have access to rich typings.

If this sort of thing interests you, please [check it out](https://github.com/bradymholt/jsh) and Star my repo if you enjoy it.
