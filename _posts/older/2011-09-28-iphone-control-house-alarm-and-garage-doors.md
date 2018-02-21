---
title: iPhone Control of House Alarm and Garage Doors
author: Brady
layout: post
permalink: /iphone-control-house-alarm-and-garage-doors/
dsq_thread_id: 339 http://www.geekytidbits.com/?p=339
---
About a year ago I bought a VISTA-ICM for my Honeywell VISTA-20P alarm system which is installed in my house. This little jewel connects the VISTA up to the internet to provide web interface control as well as event notifications. I originally bought it so I could self monitor my alarm and avoid the high fees of monitoring services. This is what it looks like:

[<img class="size-full wp-image-637 aligncenter" title="VISTA-ICM" alt="" src="/media/VISTA-ICM.jpg" width="300" height="240" />][1]

The setup was easy and it started working within 15 minutes of opening the box up. I set it up to send emails to my cell phone email address so that text messages would be sent when an alarm occured. I tested faulting the system and sure enough I got a text message within seconds of the alarm going off. Also, one time my wife and I were at the airport about to go on a trip and realized we forgot to arm the alarm. I pulled up web interface from my cell phone web browser and was able to arm it. Admittedly, the web interface was not user friendly but it got the job done.

Then I started thinking about writing and interface for the iPhone so that it would be much more usable from my phone.  Also, I wanted to handle sending the notifications on my own so I didn&#8217;t have to worry about them ceasing to work some random day since the delivery mechanism relies upon the vendor&#8217;s API.  As an added bonus, I wanted to control my garage doors as well since the VISTA panel has built-in ability to send X10 commands.

Searching around, I found that a guy named Tomi Blinnikka reverse engineered the VISTA-ICM and graciously posted a C# library/app to  to interface with it here: [http://bliny.net/blog/post/HoneywellAdemco-Vista-ICM-network.aspx][2] .  Many thanks Tomi!  Looking at his code is pretty interesting because it details how the ICM works by broadcasting UDP multicast packets to communicate what is happening with the alarm.

I wrote several applications that utilize this library to enable me to have full control of my VISTA alarm system.  These apps are running on my &#8220;always on&#8221; <a href="/my-pogoplug-geek-toy/" target="_blank">PogoPlug server</a>.

## The Solution

  1. **AlarmServer** &#8211; A service /daemon that constantly runs.  It sends notifications on alarm events, and allows clients to connect via named pipes to send commands to the alarm.  It has integrated support for <a href="http://www.prowlapp.com/" target="_blank">Prowl</a>, so it can send push notifications to iOS.
  2. **AlarmClient** - A command line client for the AlarmServer.  I use this app in conjunction with a cron job at night to automatically arm my alarm in STAY mode before bed.  
    **
  3. **AlarmWeb** &#8211; An iPhone optimized HTML5 web app that provides a web client for the AlarmServer.  It took several iterations to get this app just how I wanted it but it now works very well.  The display  (i.e. &#8220;Ready to Arm&#8221;, &#8220;ARMED STAY&#8221;, etc.) is updated quickly with a long polling request.  Here is what it looks like on my phone:

[<img class="size-full aligncenter" alt="20110827-102534.jpg" src="/media/20110827-102534.jpg" width="384" height="576" />][3]

## Garage Door Control

What are those &#8220;Left / Right Garage&#8221; buttons, you might ask.  Pushing those actually open or close (toggle) my garage doors.  Yes, totally cool!  In a nutshell,  I have 2 X10 relay modules (**X10** **PUM01**) hooked up to each of my garage doors.  The VISTA-20P panel has built-in ability to send X10 commands which can control those 2 relay modules attached to my garages.  You must have the optional **1361X10 **transformer hooked up to the VISTA panel to enable it to send the X10 commands.  When I press one of the blue buttons, a command it sent to the panel through the VISTA-ICM module (just like any other command but with a special syntax) and then the X10 signals are sent.  Additionally, I have 2 wireless door transmitters (Honeywell 5816) hooked up to the garage doors so that I can check their status.  If one of the doors is open it shows as a fault on the alarm display and therefore I can see it using my AlarmWeb app.

## In action

With all the apps hooked up and running, I am able to do some pretty cool stuff:

  * iPhone (browser) control of my alarm over the internet or from my couch.  I can arm, disarm, etc.
  * Open and close my garage doors.
  * Check to see if I forgot to close my garage door(s) when I am away from home.
  * Auto arm alarm in STAY mode each evening before bed (using cron/AlarmClient)
  * Send a notification if I left the garage door(s) open after leaving the house and arming the alarm.  This is accomplished by the AlarmServer waiting 5 minutes after an ARM AWAY event and then checking for a garage door(s) fault.  If either of them are faulted (open) then a notification is sent that says &#8220;Hey, you left the garage door(s) open!&#8221;).  Since I am able to control the garage doors I could simply pull up the AlarmWeb interface on my iPhone from my car and shut the doors.
  * Auto arm alarm in STAY mode each weekday morning after the garage door closes.  Since my wife stays home with the kiddo, I want the alarm to be armed in STAY mode after I leave for work.  So that I don&#8217;t forget to do this, I have AlarmServer configured to watch for a garage door(s) fault between certain hours of the morning (weekdays only) and to arm the alarm after the fault is cleared (garage door closes).  So, this means I don&#8217;t have to remember to arm the alarm in the morning as it is automatically handled.

## Download

For anyone interested, the solution is here: <strike>VISTA_Alarm.zip</strike>. **UPDATE: Please [take a look at my updated solution called vistaicm-server][4].**  I have removed / changed all sensitive information (i.e. alarm passwords, IP addresses, Prowl api key, etc.) as I obviously don&#8217;t want this info publicly available!

 [1]: /media/VISTA-ICM.jpg
 [2]: http://bliny.net/blog/post/h-Vista-ICM-network.aspx
 [3]: /media/20110827-102534.jpg
 [4]: /vistaicm-server/
