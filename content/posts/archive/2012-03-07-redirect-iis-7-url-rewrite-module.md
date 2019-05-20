---
title: Redirecting Old Pages with IIS 7 and the URL Rewrite Module
author: Brady
permalink: /redirect-iis-7-url-rewrite-module/
dsq_thread_id: 991 http://www.geekytidbits.com/?p=991
---

I am a change-a-holic.  I am constantly changing, re-factoring, deleting, moving, renaming, etc. all in the name of **_progress_**.  It&#8217;s intentional, of course, and I learned to embrace change when I started following the principles of <a href="http://www.extremeprogramming.org/" target="_blank">Extreme Programming</a> like <a href="http://www.extremeprogramming.org/rules/refactor.html" target="_blank">Refactor Mercilessly</a>.

An elegant way to handle change when it comes to renaming and moving pages around within an ASP.NET web application is to take advantage of the IIS 7 Rewrite module.  With this strategy in place I can easily add redirects to a single xml file and update it as needed.

Here&#8217;s how to get it setup:

* Make sure you have the <a href="http://www.iis.net/download/URLRewrite" target="_blank">URL Rewrite module</a> installed in IIS 7.
* Add a file called `Web.RewriteMaps.config` to your web application root.  This is the file that will contain all your redirect mappings.  It should look like this:

  ```xml
  <rewriteMaps>
    <rewriteMap name="OldPages">
    <add key="/oldpage.aspx" value="/newstuff/newpage.aspx" />
    <add key="/legacy/really_old.aspx" value="/BrandNew.aspx" />
      </rewriteMap>
  </rewriteMaps>
  ```

* Add the following to the `<system.webServer/>` section of your `web.config` file.  If you already have a `<rewrite/>` section don&#8217;t duplicate but merge the following in.

  ```xml
  <rewrite>
    <rewriteMaps configSource="Web.RewriteMaps.config"/>
    <rules>
      <rule name="Old Page Redirects" stopProcessing="true">
        <match url=".*"/>
        <conditions>
          <add input="{OldPages:{REQUEST_URI}}" pattern="(.+)"/>
        </conditions>
        <action type="Redirect" url="{C:1}" appendQueryString="false" redirectType="Permanent"/>
      </rule>
    </rules>
  </rewrite>
  ```

* That&#8217;s it.  Now IIS will read you `Web.RewriteMaps.config` file and perform a `301 Moved Permanently` on all your old pages and redirect the user to the new page.
