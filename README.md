
This blog is powered by [Jekyll](http://jekyllrb.com/), the blog-aware, static site generator built in Ruby.  It uses the [kramdown markdown engine](http://kramdown.gettalong.org/quickref.html).

# Development

- Run `jekyll server`
- Navigate to [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

# Provisioning

- Run ansible-playbook -i production provision.yml from `/ansible` directory

# Deployment 

- Add pushurl = [user]@www.geekytidbit.com:repos/geekytidbits.git to `.git/config` and run `git push`.

# CloudFlare Config 

www.geekytidbits.com is behind CloudFlare CDN and the Caching Level has been changed from the default of "Standard" to "No Query String" so that assets _with_ a query string _will not_ be cached.  This was done so that I could append `?cache_mode=none` to `main.css` to prevent the CSS from being cached. 

![image](https://cloud.githubusercontent.com/assets/759811/21596349/a954490a-d0ff-11e6-9233-2cc31db61b1b.png)
