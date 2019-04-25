---
title: Painless HTML5 Video in WordPress
author: Brady
permalink: /painless-html5-video-in-wordpress/
dsq_thread_id: 368 http://www.geekytidbits.com/?p=368
---

_Preface: this post contains a specific implementation to a common problem.  Although my solution below involves iPhone videos and integration with a WordPress blog, the information can be used to build a solution to suit your own needs._

### In Short

In this post, I explain how to setup and configure a combination of software and tools on a Linux server running a WordPress blog that enables **painless** uploading and sharing of videos hosted directly from your own server, rather than a third party service like YouTube.  Once everything is setup, adding a video to a blog post is as easy as uploading it through WordPress and using a shortcode such as [video src="/media/myvideo"] to stream your video using HTM5 and Flash as a fallback option.  The initial setup for this solution is a bit of work but the payoff is huge!

Watch the video below to see a demo of just how painless it is!

<video width="780" height="380" autoplay poster="/media/painless_poster.png">
  <source src="/media/painless_html5_video.m4v" type="video/mp4">
  Sorry, your browser doesn't support embedded videos,
  but don't worry, you can <a href="/media/painless_html5_video.m4v">download it</a>
  and watch it with your favorite video player!
</video>

### Assumptions

You need a Linux web server with administrative privileges and a WordPress (self-hosted) blog software installation to complete the steps below.  _If you don&#8217;t use Linux or WordPress see the preface at the top of this post._

### Background

My wife and I recently had our first child. With that comes the insatiable desire to share video after video of our adorable little daughter!

The way I&#8217;ve usually shared videos on the web has been to upload them to <a href="http://www.YouTube.com" target="_blank">YouTube</a> or <a href="http://www.vimeo.com" target="_blank">Vimeo</a> and embed them on my own site. As the quantity and frequency of my video posting was about to skyrocket I stepped back and thought, &#8220;Why do I have to post my videos on a 3rd party site just to share it on the web&#8221;?  It just seems like in principle I shouldn&#8217;t have to.  Also,  it can be kind of tedious to login to another site, upload a video, wait for conversion, get the embed code, etc.  Yes, I could use a Flash player and host on my own but Flash doesn&#8217;t work everywhere (i.e. iPhone / iPad) and there are other heavy issues to deal with such as video format (container / codec), bitrate, etc.  HTML5 video seems like a good option but because of the ongoing <a href="http://arstechnica.com/open-source/news/2009/07/decoding-the-html-5-video-codec-debate.ars" target="_blank">codec debate</a> you still have to do some painful work to get your video in the right formats to support all the major browsers and also allow for a fallback option when HTML5 video isn&#8217;t available (I&#8217;m glaring at you, Internet Explorer 7 & 8).

**Let&#8217;s be honest**.  Working with video on the web isn&#8217;t exactly easy.

### Wish List

I wanted the following:

* Support videos taken from my **iPhone**, which are MOV / QuickTime format.
* Integration with <a href="http://wordpress.org/" target="_blank">WordPress</a> blogging software (self-hosted version).
* Host and serve the videos from my **own server** without delegating to a 3rd party service like YouTube or Vimeo.
* Support playback on most all browsers / platforms, including **platforms without Flash support**.
* Take advantage of **HTML5** video.  It&#8217;s the future of the web so now is a good time to learn it and use it.
* Be able to **quickly** and **easily** upload and share videos.  I didn&#8217;t want to have to run a video conversion program and convert to 4 different formats and write a ton of HTML markup just to share.  If it isn&#8217;t easy, I probably won&#8217;t use it long-term.

### Solution

#### High-level approach

I have a file watching service running on my Linux web server.  When it detects a new file in a specified directory it runs a script.  This script checks for a video file type and if found, converts it to other HTML5 compatible formats using some command line video conversion utilities.  Then, I have a WordPress plugin installed that dynamically checks the filesystem for available video formats and generates HTML5 markup with Flash fallback accordingly.

#### Setup Steps

1. Install the following on your Linux box:

   **<a href="http://inotify.aiken.cz/?section=incron&page=about&lang=en" target="_blank">incron</a>**- This is a daemon that is similar to cron except it is triggered by filesystem events rather than time intervals.
   **<a href="http://www.ffmpeg.org/" target="_blank">ffmpeg</a>**-_The_ swiss-army knife for audio / video conversion.  This is one powerful program!  Note: you will likely need to compile ffmpeg yourself because most package repositories (i.e. yum install ffmpeg) contain a version of ffmpeg not compiled with options you will need.  I used the <a href="http://ubuntuforums.org/showthread.php?t=786095" target="_blank">HOWTO: Install and use the latest FFmpeg and x264</a> guide to install with the following ffmpeg configure / make statements: <pre class="brush: text;">./configure --enable-gpl --enable-version3 --enable-nonfree --enable-postproc --enable-libfaac --enable-libmp3lame --enable-libtheora --enable-libvorbis --enable-libx264 --enable-libxvid --enable-libvpx --enable-pthreads; make; make install</pre>

   **qt-faststart**- This is a tool that reorders MP4 meta-data for better web streaming.  qt-faststart is included as part of the ffmpeg source but you need to build it separately.  The ffmpeg HOWTO guide above includes instructions on building and installing qt-faststart so be sure to follow those.
   **<a href="http://v2v.cc/~j/ffmpeg2theora/" target="_blank">ffmpeg2theora</a>**- A simple converter to create Ogg Theora files.

   * <a href="http://matroska.org/downloads/mkclean.html" target="_blank"><strong>mkclean</strong></a> &#8211; A command line tool to clean and optimize WebM video files for better web streaming.

2. Install and activate the <a href="http://wordpress.org/extend/plugins/degradable-html5-audio-and-video/" target="_blank">Degradable HTML5 audio and video</a> WordPress plugin.  This plugin is responsible for generating the HTML markup for us.
   1. Login to your WordPress admin console and click &#8220;Add New&#8221; under the Plugins area.
   2. Search for &#8220;Degradable HTML5 audio and video&#8221; and click to Install and then Activate when prompted.
3. Create a bash script to handle the video conversions:

   * Run **nano /usr/local/bin/convert_video_html5** from your Linux shell to create the bash script.
   * Add the following contents to the script:

```shell
#!/bin/bash
ORIG_FILENAME=${1##*/}
ORIG_EXTENSION=${ORIG_FILENAME##*.}
ORIG_EXTENSION=$(echo $ORIG_EXTENSION | tr "[:upper:]" "[:lower:]")
ORIG_BASE=${1%$ORIG_EXTENSION}
JPG_FILENAME=""
MP4_FILENAME=""
MP4_FFMPEG_CONVERT_OPTIONS=" -y -f mp4 -acodec libfaac -vcodec libx264 -b 700k -vf scale=480:-1"
OGV_FILENAME=""
WEBM_FILENAME=""
WEBM_FFMPEG_CONVERT_OPTIONS=" -y -f webm -b 700k"
TEMP_FILE_SUFFIX="_tmp"
PROCESS_PRIORITY="15"

if [ "$ORIG_EXTENSION" == "mov" -o "$ORIG_EXTENSION" == "mp4" -o "$ORIG_EXTENSION" == "avi" ]; then
JPG_FILENAME=$ORIG_BASE"jpg"
MP4_FILENAME=$ORIG_BASE"m4v"
OGV_FILENAME=$ORIG_BASE"ogv"
WEBM_FILENAME=$ORIG_BASE"webm"

#pause to wait for file to finish writing
sleep 3

#generate poster thumbnnail
nice -n "$PROCESS_PRIORITY" /usr/local/bin/ffmpeg -y -i "$1" -f image2 -an -ss 00:00:04 -vframes 1 "$JPG_FILENAME"

if [ $ORIG_EXTENSION == 'mp4' ]; then
  #no conversion needed for m4v format, just copy it
  cp "$1" "$MP4_FILENAME$TEMP_FILE_SUFFIX"
elif [ $ORIG_EXTENSION == 'mov' ]; then
  #simple container conversion needed, copy video / audio content without re-encoding
  nice -n "$PROCESS_PRIORITY" /usr/local/bin/ffmpeg -y -i "$1" -f mp4 -acodec copy -vcodec copy "$MP4_FILENAME$TEMP_FILE_SUFFIX"
else
  #re-encoding is needed
  nice -n "$PROCESS_PRIORITY" /usr/local/bin/ffmpeg -i "$1" ${MP4_FFMPEG_CONVERT_OPTIONS} "$MP4_FILENAME$TEMP_FILE_SUFFIX"
fi

#move mp4 metadata to front of file for streaming
nice -n "$PROCESS_PRIORITY" /usr/local/bin/qt-faststart "$MP4_FILENAME$TEMP_FILE_SUFFIX" "$MP4_FILENAME"
rm "$MP4_FILENAME$TEMP_FILE_SUFFIX"

#generate Ogg Theora format
nice -n "$PROCESS_PRIORITY" /usr/local/bin/ffmpeg2theora "$MP4_FILENAME" -o "$OGV_FILENAME$TEMP_FILE_SUFFIX"
mv "$OGV_FILENAME$TEMP_FILE_SUFFIX" "$OGV_FILENAME"

#generate WEBM format
nice -n "$PROCESS_PRIORITY" /usr/local/bin/ffmpeg -i "$MP4_FILENAME" ${WEBM_FFMPEG_CONVERT_OPTIONS} "$WEBM_FILENAME$TEMP_FILE_SUFFIX"
nice -n "$PROCESS_PRIORITY" /usr/local/bin/mkclean --optimize --remux "$WEBM_FILENAME$TEMP_FILE_SUFFIX" "$WEBM_FILENAME"
rm "$WEBM_FILENAME$TEMP_FILE_SUFFIX"
fi
```

* Run **chmod+x /usr/local/bin/convert_video_html5**

4. Setup **incron**. 1. Start incron by running **service incrond start**.  This command may vary depending on the Linux distribution you are using. 2. Edit the incron action table table by runing **incrontab -e**and adding the following line (entry) to the table:

```
/var/www/html/wordpress/wp-content/uploads IN_CLOSE_WRITE,IN_MOVED_TO,IN_NO_LOOP /usr/local/bin/convert_video_html5 $@/$#
```

You should change _/var/www/html/wordpress/wp-content/uploads_ above to be the wp-content/uploads folder location of your own WordPress installation.</li>

* The action entry above tells incron to execute /usr/local/bin/convert_video_html5 when a file is either written to (IN_CLOSE_WRITE) or moved (IN_MOVED_TO) into the /var/www/html/wordpress/wp-content/uploads folder.  $@/$# tells incron to pass in the full path of the created/moved file to our conversion script.</ol> </li>

* Configure **web server**

  1. Locate your web server config file.  I use Apache and the location of the file is /etc/httpd/conf/httpd.conf
  2. Add mime-type definitions for (at least) the following extensions: .ogv, .m4v, .mp4, .webm
  3. My Apache config has the following:
     ```
     AddType video/ogg .ogv .ogg
     AddType video/mp4.mp4 .m4v
     AddType video/webm .webm
     ```

#### Usage

Now, with everything setup it is easy to upload a video and embed it in a WordPress blog post.  All I need to do is use the [video] shortcode with the following syntax.  Assuming I uploaded a video name myvideo.mov, you would use:

```
[video src="/media/myvideo"]
```

Notice the omission of the mov file extension above.  This is because the WordPress plugin we installed (&#8220;Degradable HTML5 audio and video&#8221;)  auto detect the videos present of the file system and generates the markup accordingly.  Our bash script (convert_video_html5) does all the video conversion behind the scenes and drops newly converted files in the same directory and the WordPress plugin finds them to use them.  If some of the conversions are still in process, the plugin will only use those currently available.

### Conclusion

Phew.  That was a lot of work right?  But the payoff is huge!  It took quite a bit of time (and frustration) to come up with this solution but I am extremely happy with the outcome.  Now, I can take a quick video, upload it to WordPress and have it streaming HTML5 video cross platform/browser (with Flash fallback support) within seconds. **_Painless_**.

### Enhancement

This is my laundry list of things to work on in the future to make this solution even better:

* Support more than just iPhone (MOV/QuickTime) and AVI video file formats.  This shouldn&#8217;t be hard since ffmpeg can work with tons of codecs and container formats.  A tweak to the convert_video_html5 script should enable this.
* Possibly add a trigger to the wp_posts WordPress MySql table so that default file upload syntax will automatically be changed to the shortcode syntax.  When you upload a video in WordPress, it adds an anchor link pointing to the new file (i.e. <a href=&#8221;/wp-content/uploads/video.mov&#8221;>Your Video</a>).  With a trigger I would not have to modify this markup to the [video src...] format and it would truly be a &#8220;hands-off&#8221; approach.  I generally despise database triggers (except for audit purposes) and this seems very hackish to me so I doubt I will ever do this but it is at least a thought.  Perhaps there is a more elegant way to accomplish this.
