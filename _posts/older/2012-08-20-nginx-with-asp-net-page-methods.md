---
title: Nginx with ASP.NET Page Methods
author: Brady
layout: post
permalink: /nginx-with-asp-net-page-methods/
dsq_thread_id: 1203 http://www.geekytidbits.com/?p=1203
---
I recently spent some time moving an ASP.NET 4.0 website from Apache (mod_mono) over to Nginx with FastCGI to take advantage of Nginx&#8217;s killer performance and low memory footprint.

After following the <a href="http://www.mono-project.com/FastCGI_Nginx" target="_blank">FastCGI Nginx</a> guide on the mono website I was mostly up and running.  However, my app has some <a href="http://encosia.com/using-jquery-to-directly-call-aspnet-ajax-page-methods/" target="_blank">Page Methods</a> I use for AJAX calls via jQuery and they were not working properly.  I was getting 405 or 500 responses from Nginx when jQuery posted to the these methods.  I came across this related article: <a href="http://florent.clairambault.fr/lighttpd-mono-asp-net-the-right-configuration" target="_blank">lighttpd + Mono Asp.Net</a>; albeit related to lighttpd it still deals with FastCGI issues.  It shed light of the fact that mono&#8217;s fastcgi-mono-server is expecting parameters to be passed in a certain format from Nginx to properly handle Page Methods.  The default fastcgi config for Nginx does not play nicely with ASP.NET Page Methods.

Then I came across this article: <a href="http://techcrawler.riedme.de/2011/02/14/asp-net-ajax-error-405-on-nginx/" target="_blank">ASP.NET Ajax Error 405 on Nginx</a>, which got me closer to the solution.  Although I thought this would be my fix it didn&#8217;t work when I implemented the example config and actually caused a different server error.  After some trial and error I found that the **fastcgi\_param PATH\_TRANSLATED **config line should ***not*** be included. I&#8217;m not sure why including it worked for the author of this article but perhaps he is using a different version of mono.  For the record,  I am using mono 2.10.8 with fastcgi-mono-server4 (i.e. .NET 4.0).  In the end, the following config worked for me:

<pre>location ~\.aspx(.*) {
        include fastcgi_params;
        fastcgi_split_path_info ^(.+.aspx)(.*)$;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_param SCRIPT_FILENAME    $document_root$fastcgi_script_name;
        fastcgi_index Default.aspx;
        fastcgi_pass 127.0.0.1:9000;
}</pre>

If you are using ASMX Page Methods you simply need to copy this config and change all the aspx references to asmx and it should work.
