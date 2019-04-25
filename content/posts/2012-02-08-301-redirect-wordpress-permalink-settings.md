---
title: 301 Redirect When Changing WordPress Permalink Settings
author: Brady
permalink: /301-redirect-wordpress-permalink-settings/
dsq_thread_id: 898 http://www.geekytidbits.com/?p=898
---

When I originally setup my WordPress site I decided to go with the &#8220;Month and name&#8221; permalink option so that my post urls would include the date they were posted.  In hindsight, I wish I would have chosen the &#8220;Post name&#8221; option initially because this is now what I prefer.  Shorter urls are better.  If someone wants to know when a post was published they can easily find that on the post content itself and don&#8217;t need to have it shown in the url.

![permalinks settings](/media/permalinks_settings.png)

But once I changed this setting my old post urls were resulting in 404 responses.  Posts linked from other sites and search engines now wouldn&#8217;t come up correctly because WordPress is hosting these at a different url.

I looked for a easy plugin to 301 redirect requests from my old format Urls to the new format (i.e. http://www.geekytidbits.com/**2011/05/geeky-post** to http://www.geekytidbits.com/**geeky-post**) but couldn&#8217;t find one that fit the bill.

In the end, I simply added the following RedirectMatch rule to my root .htaccess file.

```
<IfModule mod_rewrite.c>
  RedirectMatch 301 /\d{4}/\d{2}/(.*) http://www.geekytidbits.com/$1
</IfModule>
```

If you previously had used the &#8220;Day and name&#8221; setting where the actual day of the month was included in the permalink you would want to use this instead:

```
<IfModule mod_rewrite.c>
  RedirectMatch 301 /\d{4}/\d{2}/\d{2}/(.*) http://www.geekytidbits.com/$1
</IfModule>
```

If your .htaccess file contains a  # BEGIN WordPress &#8230; section, you&#8217;ll most definitely want to place this bit below the line containing # END WordPress.
