---
title: Surveillance Camera
author: Brady
layout: post
permalink: /surveillance-camera/
dsq_thread_id: 1013 http://www.geekytidbits.com/?p=1013
---
[<img class="size-full wp-image-1019 alignright pull-right" title="400-20120405071852-00" alt="" src="/media/400-20120405071852-00.jpg" width="320" height="240" />][1]Last year my house was burglarized.  I was away from home when it happened and got an iPhone <a href="http://www.prowlapp.com/" target="_blank">Prowl </a>notification from my <a href="/iphone-control-house-alarm-and-garage-doors/" target="_blank">AlarmServer app running on my Pogoplug</a> immediately after my alarm went off.  I called my next door neighbor, who was home at the time, and they went over right away but the thieves were already gone.  Based on alarm logs I know they were only in one part of the house and were in and out in ***less than 60 seconds***.  Anyway, it was pretty cool getting the notification on my phone and being able to call my next door neighbor so soon after they broke in my door.  I have to assume my response time was faster than a paid monitoring service would be.

Although my alarm performed as it should have I realized that I needed video surveillance so I could identify the thieves to the police next time.  I decided to use a TRENDnet wireless IP netcam, my always on Linux server , and the open source program called Motion to accomplish said surveillance of my driveway and increase the security of my home.

### Camera
<img class="wp-image-1014 alignleft pull-left" title="TRENDnet ProView Wireless Internet Surveillance Camera TV-IP501W (White)" alt="" src="/media/41wrIM78PzL._SL500_AA300_.jpg" width="240" height="240" />

The <a href="http://www.amazon.com/gp/product/B002Q0WO92/ref=oh_o04_s00_i00_details" target="_blank">TRENDnet ProView Wireless Internet Surveillance Camera TV-IP501W</a> (left) is a nice looking camera and mounted discreetly on the overhang of my roof.  It was easy to setup as all I needed to do was run a power cable to it.  It uses 802.11g so I didn&#8217;t need to worry about a separate ethernet cable.  It has a built in web server which is pretty easy to use.

### Motion

Although the TRENDnet camera has the ability to upload images to an FTP server, it doesn&#8217;t detect motion and drops many, too many,  images when configured to do so.  I decided to set up <a href="http://www.lavrsen.dk/foswiki/bin/view/Motion/WebHome" target="_blank">Motion</a>, &#8220;a software motion detector&#8221;, which intelligently detects motion and only saves images that show a material change in the picture.  The Motion website has a page with details on interfacing with TRENDnet camera which was helpful in getting everything configured: <http://www.lavrsen.dk/foswiki/bin/view/Motion/TrendNet>.  I installed Motion on my <a href="/my-pogoplug-geek-toy/" target="_blank">Pogoplug server</a> running Arch Linux by simply running **pacman -S motion.** The two important config settings in /etc/motion/motion.conf were:

<pre class="brush:text;">netcam_url http://192.168.1.7/VIDEO.CGI #192.168.1.7 is the IP address of the camera
threshold 3000 #trial and error determined this to be best when camera is at 640x480 resolution</pre>

### Archiving

Motion does a great job of dropping only images that display motion but I wanted to have a bash script run nightly that would zip up all the images for the day and also create a time-lapse video so I could quickly see the motion for an entire day.  Also, I wanted it to only keep 10 days of history.  Here&#8217;s what I came up with:

<pre class="brush:text;">#!/bin/bash

# Format: YEAR MONTH DAY
DATE=$(date +%Y%m%d)
PATH="/srv/surveillance/driveway"
TARGET_FILE="$PATH/$DATE"
cd $PATH

#create timelapse video
/bin/rm $TARGET_FILE.mp4
x=1; for i in $(/bin/ls *jpg); do counter=$(printf %03d $x); /bin/ln -s "$i" img"$count$
/usr/bin/ffmpeg -r 5 -i img%03d.jpg -pix_fmt yuv420p $TARGET_FILE.mp4
/bin/rm img*.jpg

#archive images into zip
zip -m $TARGET_FILE.zip *.jpg -x \*.zip

#remove image archives and videos that are at least 10 days old
find /srv/surveillance/driveway/* -mtime +10 -exec /bin/rm {} \;</pre>

### iPhone Integration

[<img class="alignright" title="iphone alarm keypad with security camera image" alt="" src="/media/photo3.png" width="230" height="346" />][3]In <a href="/iphone-control-house-alarm-and-garage-doors/" target="_blank">another project last year</a>, I wrote several components to monitor my alarm system.  One of the components was something I called AlarmWeb which is basically a HTML5 application that displays nicely on the iPhone (and Andriod for that matter).  After setting up the surveillance camera I decided it would be nice to integrate it with this interface.  I simply included <a href=&#8221;http://192.168.1.7/VIDEO.CGI&#8221;><img src=&#8221;http://192.168.1.7/IMAGE.JPG&#8221;/></a> on the page so that an image still will show (IMAGE.JPG) and then clicking the image will take me to the live video feed (VIDEO.CGI) directly from the camera.

[  
][3]

### Samples

Single image

[<img class="alignnone size-full wp-image-1045" title="586-20120406080742-00" alt="" src="/media/586-20120406080742-00.jpg" width="320" height="240" />][4]

Time-lapse video

<div style="width: 640px; " class="wp-video">
  <video class="wp-video-shortcode" id="video-1013-2" width="640" height="360" poster="/media/surveillance_demo_poster.jpg" preload="metadata" controls="controls"><source type="video/mp4" src="/media/surveillance_demo.mp4?_=2" /><a href="/media/surveillance_demo.mp4">/media/surveillance_demo.mp4</a></video>
</div>

 [1]: /media/400-20120405071852-00.jpg
 [2]: /media/41wrIM78PzL._SL500_AA300_.jpg
 [3]: /media/photo3.png
 [4]: /media/586-20120406080742-00.jpg
