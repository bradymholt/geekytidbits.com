---
title: cRonstrue
author: Brady
layout: post
permalink: /cRonstrue/
---

Way back in 2012, I started work on and eventually released a library called [cron-expression-descriptor](https://github.com/bradyholt/cron-expression-descriptor) which takes a cron expression and describes the cron scheduled in human readable text.  You know, `*/5 * * * *` > `"Every 5 minutes"`.  It filled a need and gained quite a bit of usage and contribution activity from the community.  It would be translated to 14 languages and ported to Java, Ruby and Python.  It was a fun library to write, maintain and use as a catalyst to learn new things (like handling i18n in .NET and publishing a package to [NuGet](https://www.nuget.org/)).

A few weeks ago I was listening to the [Changelog podcast, episode #210](https://changelog.com/210/) with Alan Shreve, the smart guy behind [ngrok](https://ngrok.com/).  Alan mentioned that the way he likes to learn a new language/ecosystem is to take an existing codebase and port it over.  I like this approach, and agree.  It prompted me to port cron-expression-descriptor over to JavaScript since I am using JavaScript more and more these days at work and on side projects.  Just when I think I have a fairly good handle on JavaScript, I realize there is so much more for me to learn.  Porting this library over to JavaScript would be a good opportunity to learn not only JavaScript syntax in a deeper way but also the everchanging ecosystem and tooling around it.

So, I started work on a JavaScript port which I eventually named [cRonstrue](https://github.com/bradyholt/cronstrue) (I like this name much more than cron-expression-descriptor, BTW 😀 ).  I used [TypeScript](https://www.typescriptlang.org/) for the source, [Mocha](https://mochajs.org/) (with [Chai](http://chaijs.com/)) for unit tests, and [webpack](https://webpack.github.io/) for bundling the final distributables.  I learned a bunch of stuff along the way and it was fun!

## Example Usage

~~~
var cronstrue = require('cronstrue');
console.log(cronstrue.toString("23 12 * * SUN#2));
> "At 12:23 PM, on the second Sunday of the month"

-- i18n support
var cronstrue_i18n = require('cronstrue/i18n');
console.log(cronstrue_i18n.toString("*/5 15 * * MON-FRI", { locale: "zh_CN" }));
> "每 5 分钟, 在 03:00 PM, 星期一 到 星期五"

~~~

## Links

- [cRonstrue on GitHub](fix/ts-module-to-namespace)
- [cRonstrue on npm](https://www.npmjs.com/package/cronstrue)