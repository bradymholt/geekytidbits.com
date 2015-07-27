---
title: Unattended Audio Recordings with a Raspberry Pi
author: Brady
layout: post
permalink: /raspberry-pi-unattended-audio-recordings/
dsq_thread_id: 1314 http://www.geekytidbits.com/?p=1314
---
Have you heard about the new Raspberry Pi computer?  From the <a href="http://www.raspberrypi.org/" target="_blank">website</a>: &#8220;The Raspberry Pi is a credit-card sized computer that plugs into your TV and a keyboard. It’s a capable little PC which can be used for many of the things that your desktop PC does, like spreadsheets, word-processing and games. It also plays high-definition video.&#8221;

**Basically, it&#8217;s an insanely cheap computer ($35) that you can do all sorts of geeky things with.  Go get one NOW (and then come back).**

I waited 3 long months for my Raspberry Pi to arrive after ordering and boy was it was worth the wait!  I love this little thing.  I loaded the recommended image &#8220;Wheezy&#8221; on it and played around for awhile before quickly moving to <a href="http://archlinuxarm.org/platforms/armv6/raspberry-pi" target="_blank">Arch Linux ARM</a> which I know well since I&#8217;ve had it running on my <a href="/my-pogoplug-geek-toy/" target="_blank">PogoPlug</a> for almost 2 years.

After tinkering for awhile I kept trying to come up with a project for it.  There are<a href="http://pingbin.com/2012/12/30-cool-ideas-raspberry-pi-project/" target="_blank"> so many cool Raspberry Pi projects</a> out there right now and it&#8217;s easy to get excited about tackling one of them.  I&#8217;ve had my eye on the <a href="http://www.daveakerman.com/?p=592" target="_blank">High Altitude Ballooning Pi project</a> where you send your Pi to space to take pictures and track its movement with GPS.  Come on now, tell me that isn&#8217;t cool.

Anyway, I finally came up with an idea for a project.  I am responsible for recording the Sunday morning lesson in our church Sunday school class.  For the last 3 years the Sunday morning process has been to buy and bring CDRs, queue up the mic and recording system setup in the room, take the CDR home, rip it, encode the WAV to MP3 and upload it so it is available for Podcasting.  Whew, that&#8217;s a lot of steps.  Because it&#8217;s such a cumbersome process, it&#8217;s been hard to keep up with and easy to &#8220;forget&#8221; from time to time.  Also, it&#8217;s hard to train other volunteers on how to do the process end-to-end.  Since we already have a nice high quality microphone and mic amp setup in the room, I thought I would use the Pi to automatically record the audio and make it available as a Podcast.

[<img class="wp-image-1359" alt="IMG_0037" src="/media/IMG_0037.jpg" width="592" height="443" />][1]

So, that&#8217;s exactly what I did.  It turned out to be a fun project and has been working for the last couple of weeks.  I found an old USB Belkin Wireless G Adapter (F5D7050/v4000) lying around which I used for wifi connectivity to our church&#8217;s wifi hotspot.  Since the Pi doesn&#8217;t have mic input capability I bought a $10 USB Sabrent sound card w/ mic input (SBCV/UP-100) from Micro Center which was easy to get up and working with the help of the <a href="https://wiki.archlinux.org/index.php/Advanced_Linux_Sound_Architecture" target="_blank">ALSA guide on the Arch Linux wiki</a>.   I bought an RCA to 3.5mm audio cable to hook up the mic amp output to the 3.5mm mic input on the USB sound card.

I have cron running the following script every Sunday morning at 11:00AM (when class starts) to record for one hour (podcast-record.sh 3600).  Obviously, I took out my credentials and such but this should be enough to give you an idea of what I&#8217;m doing.  This script does the following:

  * Record audio from mic using arecord
  * Use sox to convert stereo to mono for smaller file size
  * Use lame to encode to mp3 at 64kbps bit rate
  * Upload to Amazon S3 storage
  * Write a record to my mysql database.  I have a web app running on top of this database that generates the podcast xml feed.
  * Send a &#8216;success&#8217; email notifying me it all worked

<pre class="brush: bash;"># Unattended podcast record process
# Author: brady@geekytidbits.com
# Notes: Invoke with seconds parameter specifying how many seconds to record, ex. 'podcast-record.sh 10'

FILENAME=$(date +"%Y%m%d_%H%M")

#record with sudo since arecord seems to want root privledges
sudo arecord -f dat -d $1 ./record/${FILENAME}.wav
[ $? -eq 0 ] || exit $?

#change ownership to jdoe
sudo chown jdoe ./record/${FILENAME}.wav
[ $? -eq 0 ] || exit $?

#copy to process directory
cp ./record/${FILENAME}.wav ./process/${FILENAME}.wav

#stereo &gt; mono
sox ./process/${FILENAME}.wav -c 1 ./process/${FILENAME}-mono.wav

#convert to mp3 (64Kpbs)
lame -b 64 ./process/${FILENAME}-mono.wav ./upload/${FILENAME}.mp3
[ $? -eq 0 ] || exit $?

#remove process files
rm ./record/${FILENAME}.wav
rm ./process/${FILENAME}.wav
rm ./process/${FILENAME}-mono.wav

NOTIFY_EMAIL=MY_EMAIL_ADDRESS@gmail.com
MODTIME=$(stat -c %y ./upload/${FILENAME}.mp3)
DATE=$(date --date="${MODTIME}" +%Y-%m-%d)

#upload to s3
s3cmd put --reduced-redundancy --acl-public ./upload/${FILENAME}.mp3 s3://MY_S3_BUCKET/${FILENAME}.mp3
[ $? -eq 0 ] || continue

#write db record
mysql -h www.mydomain.com -D MY_DB_NAME -u MY_DB_USERNAME -pMY_DB_PASSWORD --execute "INSERT INTO Lesson (Date, Title, Speaker, Audio_File_Name) VALUES ('${DATE}', 'TBD', 'TBD', '${FILENAME}.mp3')"
[ $? -eq 0 ] || continue

mv ./upload/${FILENAME}.mp3 ./complete/

#send email
echo "Done!" | mail -s "Podcast ${DATE} - Upload Complete" $NOTIFY_EMAIL</pre>

To install all the dependencies used in this script simply run the following:

<pre class="brush:bash;">pacman -S sudo alsa-utils sox lame s3cmd mysql</pre>

There you have it.  That was fun.  Now go get a Pi of your own and do something fun with it.

 [1]: /wp-content/uploads/IMG_0037.jpg
