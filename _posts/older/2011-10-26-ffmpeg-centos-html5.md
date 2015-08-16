---
title: Compiled ffmpeg ready for HTML5 (CentOS 5)
author: Brady
layout: post
permalink: /ffmpeg-centos-html5/
dsq_thread_id: 773 http://www.geekytidbits.com/?p=773
---
Awhile back, I was setting up[ automatic HTML5 video conversion for my WordPress blog sites][1]. I spent a good deal of time actually compiling ffmpeg so that it would work with the various container formats and codecs required for HTML5 video.

I&#8217;ve providing it here as a download for anyone else that has a similar machine that can run the compiled binary. This was compiled on a system running CentOS release 5.4 (Final) with x86_64 architecture. Specifically, it&#8217;s an Amazon EC2 machine built with <a href="http://thecloudmarket.com/image/ami-48f90621--centos-5-64-clean#/definition" target="_blank">ami-48f90621</a>.

## ffmpeg -v output

<pre>ffmpeg version git-N-30697-g36204ed, Copyright (c) 2000-2011 the FFmpeg developers
  built on Jun 12 2011 21:56:11 with gcc 4.1.2 20080704 (Red Hat 4.1.2-46)
  configuration: --enable-gpl --enable-version3 --enable-nonfree --enable-postproc
  --enable-libfaac --enable-libmp3lame --enable-libtheora --enable-libvorbis
  --enable-libx264 --enable-libxvid --enable-libvpx --enable-pthreads
  libavutil    51.  8. 0 / 51.  8. 0
  libavcodec   53.  7. 0 / 53.  7. 0
  libavformat  53.  3. 0 / 53.  3. 0
  libavdevice  53.  1. 1 / 53.  1. 1
  libavfilter   2. 15. 0 /  2. 15. 0
  libswscale    0. 14. 1 /  0. 14. 1
  libpostproc  51.  2. 0 / 51.  2. 0</pre>

## Download

<strong style="font-size: larger;">> <a href="/media/ffmpeg_git-N-30697-g36204ed.tar.gz">Download ffmpeg built for CentOS 5.4 x86_64</a></strong>

 [1]: /painless-html5-video-in-wordpress/
