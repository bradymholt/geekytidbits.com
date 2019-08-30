---
title: vistaicm-server
permalink: /vistaicm-server/
---
Awhile back, I blogged about <a href="/iphone-control-house-alarm-and-garage-doors/" target="_blank">iPhone Control of House Alarm and Garage Doors</a>, which was a combination of hardware and software that allowed me to control my home alarm system, including doing cool things like opening and closing my garage doors.

It&#8217;s been over 2 years since that post and in the meantime, I have completely rewritten the application that interfaces with the VISTA-ICM so that it is much simpler, provides more flexibility and is a more packaged solution so that others can easily use it themselves.  It was my first <a href="http://nodejs.org/" target="_blank">Node.js</a> application and was a lot of fun to write.

## Introducing vistaicm-server

<img class="size-full wp-image-1765 alignleft" style="margin:15px;" alt="screenshot" src="screenshot.png" width="240" height="262" />
**vistaicm-server** is a server app that works with the [VISTA-ICM][2] module to control VISTA (10/15/20/21/50/128/250) alarm panels. It provides a **clean web interface** and **event handling** through a hook architecture.

**To learn more and download, visit the <a href="https://github.com/bradymholt/vistaicm-server" target="_blank">project page on GitHub</a>. **

 [2]: http://controlworks.com/modules/Product.aspx?pid=80
