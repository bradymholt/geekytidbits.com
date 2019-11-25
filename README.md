# geekytidbits.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/81c6e367-d012-4a9d-a6bc-7b4b165c7f74/deploy-status)](https://app.netlify.com/sites/frosty-benz-141b70/deploys)

This blog uses [xertz](https://github.com/bradymholt/xertz), a static site generator.

## Writing

Run `npx xertz new "[titile]"` to create a file in `posts/` with a name in the format of YYYY-MM-DD-title.md.

### Code Formatting

Code formatting is handled by [Prism.js](https://prismjs.com/#supported-languages). Simply use the triple backtick Markdown syntax (i.e. ```js) with a supported format language. The theme file is located at content/styles/prism.css. To chose a different theme, look at [this repository](https://github.com/PrismJS/prism-themes).

## Building

Running `npx xertz serve` will build the site and run a local web server listening at http://localhost:8080, pointing to the `_dist/` folder. Any changes to the `content/` folder will rebuild the site.

## Deploying

Deployment is handled by [Netlify](http://netlify.com) using the `netlify.toml` config file. Netlify will trigger a build / deploy when changes are pushed up to this repository.

### Social Posting

[Zapier](https://zapier.com) is configured to cross post new blog posts found on the RSS feed to Twitter and LinkedIn.
