---
title: ESPN3 (WatchESPN) with Squid Proxy
author: Brady
layout: post
permalink: /espn3-squid-prox/
dsq_thread_id: 790 http://www.geekytidbits.com/?p=790
---
Although my ISP (AT&T DSL) is one of the <a href="http://espn.go.com/espn3/affList" target="_blank">Participating Providers</a> for ESPN3.com, I was having trouble getting it to work correctly after setting up a <a href="/transparent-content-filtering-proxy/" target="_blank">Squid based transparent proxy server on my home network</a>.  It turns out there is a Squid setting you have to tweak to prevent ESPN3 from blocking you.

Make sure your /etc/squid.squid.conf file has the forwarded_for setting turned off.  By default it is on.  This setting determines if you local client system IP address is included in the HTTP requests it forwards (i.e. X-Forwarded-For: 192.1.2.3).

**forwarded_for off    **#Needed for ESPN3.com to work correctly

Now go watch the game and be happy.
