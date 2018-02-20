This blog is powered by [Jekyll](http://jekyllrb.com/), the blog-aware, static site generator built in Ruby. It uses the [kramdown markdown engine](http://kramdown.gettalong.org/quickref.html).

# Scripts

* `newpost.sh "My Blog Post"` - creates a new post file

# Development

* Run `rake serve`
* Navigate to [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

## Code Formatting

Code formatting is handled by [rouge](https://github.com/jneen/rouge). Simply use the tripe backtick Markdown syntax (```). To change the styling, update the \_sass/\_syntax-highlighting.scss file with one of the [pygments-css theme files](https://github.com/richleland/pygments-css).

# Provisioning

Run `rake provision`

# Deployment

Run `rake deploy`

## CloudFlare Config

www.geekytidbits.com is behind CloudFlare CDN and the Caching Level has been changed from the default of "Standard" to "No Query String" so that assets _with_ a query string _will not_ be cached. This was done so that I could append `?cache_mode=none` to `main.css` to prevent the CSS from being cached.

![image](https://cloud.githubusercontent.com/assets/759811/21596349/a954490a-d0ff-11e6-9233-2cc31db61b1b.png)

## Cross Posting

[Zapier](https://zapier.com) is configured to cross post new blog posts found on the RSS feed to Twitter and LinkedIn.
