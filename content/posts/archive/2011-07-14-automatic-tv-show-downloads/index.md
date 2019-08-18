---
title: Automatic TV Show Downloads
permalink: /automatic-tv-show-downloads/
---

Believe it or not my wife and I don&#8217;t have cable.  I know, it&#8217;s craziness, especially considering only <a href="http://blog.nielsen.com/nielsenwire/wp-content/uploads/2010/04/TVA_2009-for-Wire.pdf" target="_blank">11% of households with televisions don&#8217;t have cable or satellite</a>, but just think about how much \$$ we save ($75.00/month \* 12 months = \$900/year).  Also, we save a lot of time by not being lured into watching a bunch of stupid stuff  across 100&#8217;s of channels.  We use an antenna to get high quality HDTV signals over-the-air.  It usually works great but sometimes the signal won&#8217;t come in for a show recording and the recording will be all messed up.  Also, there are some shows freely available that don&#8217;t get broadcast to us where we live.

That got be thinking about a way to automatically download our favorite shows so that we would always have backup copies and so we could get shows otherwise unavailable (like MythBusters!).  I figured out a completely hands-off solution which works amazingly well.  Credit obviously goes to the various programs and services mentioned below.

It&#8217;s awesome to randomly look in my tv folder add see recent episodes of our favorite shows ready to be watched.  Although not necessary, I took it one step further and have all of this running on a server with a Samba share setup.  We use Windows Media Center hooked up to our TV and when I add the Samba shared tv folder from the server it is easy to navigate through MCE and watch our downloaded shows.  Pretty cool!

Here are the steps:

1. Register for an account at <a href="http://showrss.karmorra.info/" target="_blank">showRSS</a>.  Make a donation while you&#8217;re there to support them!
2. Add some shows to your list.
3. Note &#8220;Your feed address&#8221; from the feeds page.  It looks something like this: \*\*\*\* http://showrss.karmorra.info/rss.php?user_id=00000&hd=null&proper=null
4. Install your favorite BitTorrent client that supports &#8220;watch directories&#8221;.  I use <a href="http://www.transmissionbt.com/" target="_blank">Transmission</a> on Linux but <a href="http://www.utorrent.com/" target="_blank">uTorrent</a> on Windows will work fine.
5. Install <a href="http://flexget.com/wiki/Install" target="_blank">FlexGet</a>
6. Create FlexGet configuration file (config.yml).  Mine looks like this:

   ```yaml
   feeds:
     tv-shows:
     rss: http://showrss.karmorra.info/rss.php?user_id=00000&amp;hd=null&amp;proper=null
     all_series: yes
     download: /transmission/watch/
   ```

   You&#8217;ll obviously want to use your own feed url from showRSS (showrss.karmorra).  I stripped out my specific user_id above.  Also, you need to change &#8220;/transmission/watch&#8221; to be the directory your BitTorrent client uses at its &#8220;watch folder&#8221;.

7. Fire up your BitTorrent client.
8. Run FlexGet from the command line so that it will download .torrent files from your showRSS feed and drop them in your BitTorrent client&#8217;s watch folder.
9. Check your BitTorrent client to ensure it starts to download some shows.
10. Since FlexGet is not a service/daemon, you&#8217;ll need to setup a mechanism to run FlexGet on a regular basis so it will grab new shows once they become available.  If on Windows you could use a Scheduled Task and if on Linux you could use cron.</ol>
