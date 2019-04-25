---
title: Migrating to Amazon EC2 (Web Services)
author: Brady
permalink: /migrating-to-amazon-ec2-web-services/
dsq_thread_id: 191 http://www.geekytidbits.com/?p=191
---
I&#8217;ve had [DotNetPark][1] as a web host for over 5 years and have been generally pleased with them. Their support is responsive and they&#8217;ve given me some referral deals which they didn&#8217;t have to. And, I get quite a bit for my money. I pay $20/quarter and get 1 database each of SQL Server 2000/2005/2008 (3 total), 1 mySQL database, IIS 6 with support for 5 distinct websites, and all the email features you would usually expect. Not bad, for the money.

Anyway, as I&#8217;ve been playing around more and more with Linux, I&#8217;ve gotten the itch to get a VPS or cloud hosting so I can be totally in control on my server instance. I want to do more than just host websites.

After looking around at the various options I came across Amazon EC2 web services and found that they are offering [1 micro instance free for a year][2]. **Free server for a year? Yes, please**. Also, I&#8217;ve been keeping my eye on Amazon Web Services from afar and think it is quite an impressive technology stack. So, signing up for the free EC2 instance not only gave me something free for a year that I&#8217;m currently paying for, it also gives me the opportunity to play around with AWS in general.

Signing up took less than 5 minutes and I had my EC2 micro instance (with CentOS Linux) up and running soon thereafter. Using yum (package manager), I installed:

  * Apache
  * MySQL
  * phpMyAdmin
  * Mono (needed instructions in this article: [Setting Up Mono on Amazon EC2][3])

Bam, after a few hours of configuration and tweaking I was up and running with a LAMP (Linux, Apache, MySql, PHP) server capable of running .Net/ASP.NET apps thanks to Mono. A little tweak in my DNS records and the migration was complete. Now all of my websites (including geekytidbits.com) are running on my EC2 instance and I am noticing a performance boost, thank you very much.

This was a pretty fun process. Next steps:

  * Experiment with EC2&#8217;s scale up/down options (which is where the true power in AWS lies)
  * Take advantage of Amazon S3 storage.
  * Set up some cron jobs (just because *I can*).

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 198px; width: 1px; height: 1px; overflow: hidden;">
  http://groovbird.blogspot.com/2011/03/setting-up-mono-on-amazon-ec2.html
</div>

<span style="background-color: yellow;"><strong>Update: See my more recent post about getting an EC2 LAMP server setup: <a title="How to Setup a LAMP Server on Amazon EC2" href="/setup-lamp-server-amazon-ec2/"> How to Setup a LAMP Server on Amazon EC2</a>.</strong></span>

 [1]: http://www.dotnetpark.com/
 [2]: http://aws.amazon.com/free/
 [3]: http://groovbird.blogspot.com/2011/03/setting-up-mono-on-amazon-ec2.html
