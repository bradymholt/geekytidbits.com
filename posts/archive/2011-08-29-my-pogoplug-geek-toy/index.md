---
title: My PogoPlug Geek Toy
permalink: /my-pogoplug-geek-toy/
---
**About a year ago, a friend* at work sent me a link about something called a PogoPlug.**

<img class="size-full wp-image-654 aligncenter" title="pogoplug" src="pogoplug.jpg" alt="" width="220" height="220" />

It&#8217;s a &#8220;plug computer&#8221; which is an extremely small full blown computer running a Marvell Sheeva 1.2Ghz processor. It&#8217;s got 256MB of memory and has 4 USB slots. The PogoPlug is sold as a &#8220;media sharing&#8221; device and has the Cloud Engine&#8217;s (vendor) own software running on it allowing you to easily access photos, music, videos, etc. from other locations and from your mobile device. At first glance I thought it was ugly (pink?!) but pretty cool because it was so small. I saw one at MicroCenter one day and decided to try it out. It was only about $75 bucks. Boy am I glad I did! This thing has turned out to be one of my favorite geek toys.

After playing with it for awhile, I found some websites talking about how to get full blown Linux running on the thing. This was cool because you could have a silent, tiny, &#8220;always on&#8221; server running with 4 watts of power in you closet. The possibilities were many. The wheels in my brains were spinning full speed ahead.

I got <a href="http://archlinuxarm.org/" target="_blank">Arch Linux ARM</a> running on it and setup the following on it:

  * Samba &#8212; shared network drive that shows up on my Windows 7 laptop and contains my Pictures, Music, Movies and Docs.
  * Squid Proxy and DansGuardian Content filter &#8211; I use this to speed up web access and block obscene web content. [Read more][2]
  * Automatic TV show downloads &#8211; <a href="/automatic-tv-show-downloads/" target="_blank">Read more</a>
  * Apache web server
  * FTP server
  * Subversion (source control) server
  * Mono &#8211; for running .NET apps.
  * PicasaWebSync &#8211; a little app I wrote that uploads my pictures and videos to Picasa so I can access them. [Read more][3]
  * House Alarm/Garage Door Interface &#8212; I have several applications running that allows me to control my Honeywell Vista house alarm system and Garage Doors. <a href="/iphone-control-house-alarm-and-garage-doors/" target="_blank">Read more</a>
  * Backup &#8211; I have two external hard drives connected to it and run a cron job weekly to mirror them for backup purposes.

<div>
  <strong>Want one too? <a href="http://www.google.com/products/catalog?hl=en&safe=active&q=pogoplug&gs_upl=4936l5040l0l5248l2l2l0l0l0l1l183l183l0.1l1l0&um=1&ie=UTF-8&tbm=shop&cid=8086923100599712541&sa=X&ei=6P5bTtCJMM2PsALksrmtDA&ved=0CIEBEPMCMAs  " target="_blank">Here&#8217;s some places to get one</a>.</strong>
</div>

*- thanks Matt!

 [2]: /transparent-content-filtering-proxy/
 [3]: http://bradymholt.github.io/picasawebsync/
