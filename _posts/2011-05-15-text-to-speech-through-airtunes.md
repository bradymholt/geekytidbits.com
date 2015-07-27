---
title: Text to Speech through Airtunes
author: Brady
layout: post
permalink: /text-to-speech-through-airtunes/
dsq_thread_id: 304 http://www.geekytidbits.com/?p=304
---
A few months back, I setup a small Linux server (<a href="http://www.pogoplug.com/" target="_blank">PogoPlug</a> pink version running <a href="http://plugapps.com/" target="_blank">PlugApps Linux</a>) which has been up and running in my front closet. The thing is silent and uses only 4 watts of power. It&#8217;s one of my favorite toys. I plan on writing a post later with details on this bad boy, but for now I mention this as background for this post.

I&#8217;ve recently wanted to figure out a way to get this server to send sound to my <a href="http://www.apple.com/airportexpress/" target="_blank">Airport Express</a> (one of Apple&#8217;s better products I must say) so I could effectively setup an &#8220;alarm clock&#8221; that would play music from my music library. You know, a cron job every morning at 6AM that blares my favorite music at me so I will get out of bed.

It took me awhile to find it but I finally came across <a href="http://nanocr.eu/software/justeport/" target="_blank">JustePort</a> which is a .NET app that streams music to an Airport Express. The author, Jon Lech Johansen, did a great job with this and kindly provides the C# source code which is very interesting to go through. Using <a href="http://www.mono-project.com/Main_Page" target="_blank">Mono</a>, I can easily use this .NET app from within a Linux environment.

Anyway, setting up a cron job to call JustePort and pass in some music files was pretty easy to get up and running. In fact, it works great. But I wanted to take it one step further. I wanted my Linux server to be able to &#8220;speak&#8221; to me through the Airport Express. This enables some interesting scenarios. I could get it to say &#8220;Wake up sleepy head!&#8221;&#8230; followed by some music. Or, it could poll my email account and say &#8220;You&#8217;ve got mail&#8221;. Or, I could setup recurring reminders so that once a month it says &#8220;Change the water filter!&#8221; from the speakers setup in my living room. ***Necessary? Not really. Geeky Cool? Absolutely.***

I finally settled on using [The Unofficial Google Text-To-Speech API][1], which responds with mp3 speech given some text, to generate the audio. I looked at using espeak or festival but the natural voice quality of the Google service is much better. Once I figured out how to use <a href="http://www.gnu.org/software/wget/" target="_blank">wget </a>to download a mp3 of some text, I needed to pad it with some silence on the end because I found that if the audio was less than 8 seconds (or so), JustePort (or the Airtunes) wouldn&#8217;t play it. In addition to padding, I found that I needed to change the sample rate because when I played it, it sounded like chipmunks who inhaled a couple of helium balloons. The awesome <a href="http://sox.sourceforge.net/" target="_blank">sox</a> utility came to the rescue to perform the padding and sample rate conversion.

**With the help of Google Translate, wget, sox, Mono and JustePort I can send dynamic text speech to my Airtunes device and effectively enable my server talk to me.**

Here&#8217;s the single command (heavy piping!) to say &#8220;Hello World&#8221; through the speakers connected to my Airtunes device.

<pre>
wget -O- --user-agent="Mozilla/4.0"
  http://translate.google.com/translate_tts?q=Hello+World | sox
  -t mp3 - -t raw -r 87k - pad 0 4 | mono /opt/JustePort/JustePort.exe
  - 192.168.1.14 -15
</pre>

A few notes:

  * I had to explicitly set the user agent with wget because otherwise translate.google.com would return **403 Forbidden **with wget&#8217;s default user agent.
  * The 87k sample rate conversion was necessary to get the mp3 from Google to play with an acceptable pitch. I came to this number through trial and error. I&#8217;m no audio expert so there might be a better way to handle this that I am not aware of.
  * 192.168.1.14 is the IP address of the Airport Express on my local LAN.
  * Getting this to work in Windows is completely feasible as there are Windows versions of wget, sox, and JustePort will run easily with the .NET framework installed in Windows.

 [1]: http://techcrunch.com/2009/12/14/the-unofficial-google-text-to-speech-api/
