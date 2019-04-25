---
title: How To Setup A Transparent Content Filtering Proxy
author: Brady
permalink: /transparent-content-filtering-proxy/
dsq_thread_id: 579 http://www.geekytidbits.com/?p=579
---

To speed up web access and block obscene content on my home network, I setup a transparent content filtering proxy on my Arch Linux server with the help of <a href="http://www.squid-cache.org/" target="_blank">Squid </a>and <a href="http://dansguardian.org/" target="_blank">DansGuardian</a>.    Below are the steps I took to get it all working.

### Install and configure Squid (web proxy)

Squid will act as our proxy server which should speed up our web browsing and allow the content filter (DansGuardian, explained below) to function as it requires one.

* Run: **pacman -S squid** to install
* The default config file for squid is pretty much ready to go.  It&#8217;s a good thing because there are an overwhelming number of configuration options.  Anyway, keep the default config but add/change the following in your **/etc/squid/squid.conf **file.

```shell
acl localhost src 127.0.0.1/32
http_access allow localhost
http_access deny all
http_port 3128 transparent
dns_nameservers 208.67.222.123, 208.67.220.123 #OpenDNS FamilyShield DNS
```

_Note: The IP addresses specified for dns_nameservers are the <a href="http://www.opendns.com/landings/familyshield" target="_blank">OpenDNS FamilyShield</a> DNS servers.  This speeds up DNS lookups and provides a simple way to have an up-to-date blacklist for pornographic sites.  This will work in tandem with DansGuardian to filter web content._

* Start Squid by running **/etc/rc.d/squid start**

### Install and configure DansGuardian (content filter)

DansGuardian is the powerful, fast, open-source content filtering engine we will use.  It is very configurable but I will keep it simple for demonstration purposes.

* Run: **pacman -S dansguardian** to install
* Make sure the following configuration options are set in your **/etc/dansguardian/dansguardian.conf** file

```shell
filterport = 8888
proxyport = 3128
```

* Start DansGuardian by running **/etc/rc.d/dansguradian start**

### Configure Your Router

To make our solution truly *transparent *and avoid the need to configure each computer in our network individually, we need to make our router redirect outgoing web traffic to our proxy server that is running DansGuardian and Squid.  To do this, you&#8217;ll need a router running Linux (most do) and one that allows telnet or SSH access.  I have a Netgear router and after searching on the web found that if you navigate to the address: http://192.168.1.1/**setup.cgi?todo=debug** (192.168.1.1 being your router IP, of course), the router will allow telnet access on port 23, with the same credentials you use to login to the web interface.  Once you have connected, run the following command to redirect outgoing port 80 request:

```shell
iptables -t nat -A PREROUTING -i br0 -s ! 192.168.1.2 -d ! 192.168.1.2 -p tcp --dport 80 -j DNAT --to 192.168.1.2:8888
```

### Notes

* 192.168.1.2 is the IP address of our proxy server.  You&#8217;ll need to change this to match your own server&#8217;s address.
* It is likely that if you change anything through the web admin interface of your router, the iptables information will get overwritten.  You will need to re-run the above command if/when you make changes.  I actually setup a cron job that runs daily to reset the iptables configuration.  It first uses wget with http authentication to access the /setup.cgi?todo=debug page so that telnet access will be enabled and then issues remote telnet commands to configure iptables.  This is not necessary but makes for a more stable setup.
* To further ensure no machines are able to access the internet directly, I recommend configuring (through web admin interface) your router to block outgoing port 80 traffic from all IP addresses except the IP of your proxy server (192.158.1.2 in my case).  This is usually pretty easy to do and varies depending on the router you use. Remember, as mentioned above, you might need to re-run the iptables command after locking down outgoing traffic.

### That&#8217;s It!

Now, if you browse to a website on a  client machine in your local network, it should send all the data through your  proxy server and provide content filtering.  There is no client configuration (i.e. proxy settings) needed as we have set things up in a transparent manner.

A good next step would be to read up on <a href="http://dansguardian.org/downloads/detailedinstallation2.html" target="_blank">configuring DansGuardian</a> and make it work to suite your needs.
