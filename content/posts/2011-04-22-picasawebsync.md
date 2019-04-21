---
title: PicasaWebSync
author: Brady
layout: post
permalink: /picasawebsync-project/
dsq_thread_id: 215 http://www.geekytidbits.com/?p=215
---
I have my personal photos and videos on a shared network drive. I&#8217;ve been wanting a way to easily access these from the internet so that I can pull them up on my iPhone and link to them from my personal website. I finally decided upon uploading them to Picasa Web Albums since the Google Data API allows for easy interaction with Picasa and there are many apps and plugins that work with Picasa. Having everything in Picasa allows me to use an iPhone app (I use <a href="http://itunes.apple.com/us/app/web-albums-a-picasa-photo/id344997890?mt=8" target="_blank">Web Albums</a>)  to view on my phone and a WordPress plugin to display on my website.

I know the Picasa desktop application has the ability to upload and sync your files to online Web Albums but you have to initiate this manually. I wanted an automated solution. Also, I wanted a solution I could run on my &#8220;always on&#8221; server so it could be scheduled and unattended.

To get them into Picasa, I wrote a C# .NET command-line utility called PicasaWebSync which does all the heavy lifting. I have this running on a nightly basis to keep everything updated. I am making PicasaWebSync available (including the source) here in case anyone else would like to use it.

### Introducing PicasaWebSync

**PicasaWebSync** is a command-line tool to synchronize local photos and videos to online Picasa Web Albums. It is flexible with a configuration file / run-time options and optionally **resizes** photos before uploading them.

### **Features**

  * Resizes photos before uploading.
  * Resizes videos before uploading (requires external tool like ffmpeg).
  * Allows folders to be excluded by name or hint file included in folder.
  * Allows album access (i.e. Public / Private) to be set by hint files in source folders.
  * Allows excluding files over a specified size.
  * Removes photos/videos/albums from Picasa Web Albums that have been removed locally (can prevent this with -addOnly command line option)
  * Updates files on Picasa which have been updated locally since the last time they were uploaded.
  * Supports these file types: jpg, jpeg, gif, tiff, tif, png, bmp, avi, wmv, mpg, asf, mov, mp4

### More Information

For more information on this project and download instructions, visit the project page at: <a href="http://bradymholt.github.io/picasawebsync/" target="_blank">http://bradymholt.github.io/picasawebsync/</a>

&nbsp;

&nbsp;
