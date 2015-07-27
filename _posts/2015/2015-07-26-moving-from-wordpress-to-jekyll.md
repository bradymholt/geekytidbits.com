---
title: Moving my Blog from WordPress to Jekyll
author: Brady
layout: post
permalink: /moving-from-wordpress-to-jekyll/
---
![Jekyll](/media/jekyll-logo.png){: .pull-right }
When I first started blogging, I leveraged WordPress because it was the perfect tool at the time.  It was easy to setup and use and helped me focus on actually blogging rather than getting distracted with tweaking the settings and trying to get it looking good.  WordPress is impressive in its ease of use and amazing community.  There are a ridiculous number of high quality themes and plugins that allow you to do anything easily.  It really is a great platform.

But, being a tinkering, I was itching for a change.  Over time my blog had been become a bit bloated as I had added a bunch of plugins, incorporate bootstrap styling and highly customized my stylesheet.  The last time I made a design change it was more cumbersome than I would have liked because I was fighting competing styles and trying to understand the themplate organization.

Anyway, I knew I wanted to try [Ghost](https://ghost.org/) or [Jekyll](http://jekyllrb.com/).  I evaluated both briefly and once I used Jekyll I was sold.  I love that it is simple yet I have the ability to control everything about it.  Also, it's great to have my entire blog in a [GitHub repository](https://github.com/bradyholt/geekytidbits.com); no database!

I won't list a step-by-step on getting started with Jekyll here because the [Jekyll website](http://jekyllrb.com/docs/home/) does a fantastic job of that.

## Converting
I used the [wordpress-to-jekyll-exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter) which worked surprisingly well.  You simply install it and click an "export" links.  A .zip file is downloaded that you merge into your Jekyll folder.  It was easy.  There were a handful of my posts that had to be edited because the HTML to Markdown conversion didn't always get it right but all-in-all it was pretty good.  One thing that didn't work so well was getting my Disqus comments back up and running.  For some reason, the WordPress plugin I was using for Disqus was emiting a `disqus_identifier` which was the WordPress **ID** of the page.  This didn't translate over when I exported so I wrote a quick app to extract these IDs and insert Jekyll Front Matter that I could use when emitting the Disqus code.

## Hosting
I initially deployed the site to [GitHub Pages](https://pages.github.com/) because it's dead easy to do so but decided to go for extra credit and setup a `git push` deploy process, similar to how Heroku deploys work.  Why?  Because I thought it'd be fun to learn how and also like the idea of being able to work with Jekyll plugins since GitHub pages doees not support them.  The basic idea is that you create a git bare repository on your target deploy server and they setup a post-receive hook to fire up Jekyll and build your site.  It was surprisingly simple to get working and I was able to create an [Ansible playbook for the provisioning](https://github.com/bradyholt/geekytidbits.com/tree/master/ansible).

Jekyll is a joy to work with and I am so glad I made the switch!
