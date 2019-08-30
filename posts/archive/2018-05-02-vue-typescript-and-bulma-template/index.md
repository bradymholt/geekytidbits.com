---
title: "Vue.js template featuring TypeScript and Bulma"
permalink: /vue-typescript-and-bulma-template/
---

I've been getting more and more into [Vue.js](https://vuejs.org/) lately because it's awesome and feels good. Plus, it's not React so using it seems counter-culture and edgy, FTW. Also, Vue has improved **TypeScript** support and I've been checking that out. Oh, and I keep hearing about this new CSS framework called **Bulma** that I want to play around with. What is a developer to do with all these things swirling around in their head? Build a template, of course.

Well, I'm back to making templates again. I don't know why but it seems to be my thing lately. The [last Vue.js template I worked](https://github.com/bradymholt/koa-vuejs-template) on was full stack and included PostgreSQL, authentication, and bunch of other cool stuff. This time, I wanted to make it simple. Just a simple scaffold template using Vue.js that would be a nice starter for the next project I decide to tackle.

So, [vue-typescript-bulma-template](https://github.com/bradymholt/vue-typescript-bulma-template) is what I came up with. I'm good at naming things, right? If you look at the [page output](https://bradymholt.github.io/vue-typescript-bulma-template/#/) you'd think there isn't much to this thing:

![Template Screenshot](vue-ts-bulma.png)

But actually, there is quite a lot of nice stuff built in:

- TypeScript 2.8.3
- [vue-class-component](https://github.com/vuejs/vue-class-component) usage (class-style Vue components via ES decorators)
- Bulma CSS Framework
- Sass
- Font Awesome 5
- Webpack 4
  - Development server
  - Hot Reload support
  - development and production config
  - CDN config for Vue.js and Bulma
  - [Prerender SPA Plugin](prerender-spa-plugin) config

Go [check it out](https://github.com/bradymholt/vue-typescript-bulma-template) and build something neat!
