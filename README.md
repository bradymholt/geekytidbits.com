# geekytidbits.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/81c6e367-d012-4a9d-a6bc-7b4b165c7f74/deploy-status)](https://app.netlify.com/sites/frosty-benz-141b70/deploys)

This blog is powered by [Jekyll](http://jekyllrb.com/), the blog-aware, static site generator built in Ruby. It uses the [kramdown markdown engine](http://kramdown.gettalong.org/quickref.html).

## Scripts

* `newpost.sh "My Blog Post"` - creates a new post file

## Development

* Run `rake serve`
* Navigate to [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

### Code Formatting

Code formatting is handled by [rouge](https://github.com/jneen/rouge). Simply use the tripe backtick Markdown syntax (```). To change the styling, update the \_sass/\_syntax-highlighting.scss file with one of the [pygments-css theme files](https://github.com/richleland/pygments-css).  Also, here is the [list of supported languages](https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers).

## Provisioning

Run `rake provision`

## Deployment

Run `rake deploy`

### Cross Posting

[Zapier](https://zapier.com) is configured to cross post new blog posts found on the RSS feed to Twitter and LinkedIn.
