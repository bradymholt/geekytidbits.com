---
title: How to Setup a LAMP Server on Amazon EC2
permalink: /setup-lamp-server-amazon-ec2/
---

In an [earlier post][1], I explained that I migrated from my regular web host over to Amazon EC2 for the purpose of running my various websites. Here, I will detail how I got up and running and configured with a full blown CentOS 5 LAMP (Linux, Apache, MySql, PHP) server including support for .NET via [Mono][2].

First off, if you are new to Amazon&#8217;s Elastic Compute Cloud (EC2) then I highly recommend taking a look at t their <a href="http://ec2dream.webs.com/AWS-Management-Console.pdf" target="_blank">Getting Started Guide</a> first.

1. <strong>Signup </strong>for Amazon EC2 if you haven&#8217;t already done so. The <a href="http://docs.amazonwebservices.com/AWSEC2/latest/GettingStartedGuide/index.html?SignUp.html">Sign Up for EC2 guide</a> is helpful here.

2. **Launch** a new EC2 instance from the <span class="value">AWS Management Console</span>:
   I recommend using the community AMI ID <strong>ami-48f90621 </strong>which is CentOS 5, 64 bit. To select this AMI when launching, click &#8220;Community AMIs&#8221; and search for the ID. See the screen shot below.<img class="alignnone size-full wp-image-252" style="border: 1px solid lightgrey;" title="request_instances_centos" src="request_instances_centos.png" alt="" width="733" height="230" />

On the Configure Firewall step, create a new security group and add an inbound rule for ports 80 (HTTP) and 22 (SSH).<img class="alignnone size-full wp-image-274" style="border: 1px solid lightgrey;" title="ec2_security_group" src="firewall.png" alt="" width="677" height="366" />

2. **Connect** to your new instance using the ssh client of your choice. Note, you&#8217;ll need to use the Key Pair your generated when you launched your instance to connect. When asked for the username enter **root**. I use PuTTY from Windows and it was a little tricky to get connected but the [Appendix: PuTTY][3] helped.
3. **Prepare** for software installation. In order to install Mono, you&#8217;ll need to add the Novell Mono Repository to yum so the mono packages can be found.
   - Create the file **/etc/yum.repos.d/mono.repo** (i.e. _nano /etc/yum.repos.d/mono.repo_) with the following contents. _Optionally, you can run the following command and skip this step to make things a bit easier:_
     **wget /wp-content/uploads/mono.repo /etc/yum.repos.d/**
     <pre class="brush: text;">[novel]
     Name=Novell Mono Repository
     baseurl=http://ftp.novell.com/pub/mono/download-stable/RHEL_5/
     enabled=1
     gpgcheck=0</pre>
4. **Install software** packages by issuing the following commands from the shell:
   1. **yum install httpd** [enter]
   2. **yum install php** [enter]
   3. **yum install mysql-server mysql**[enter]
   4. **yum install mono\* &#8211;disablerepo=epel,extras**[enter]
   5. **yum install mod_mono\* &#8211;disablerepo=epel,extras**[enter]
5. **Start services** by issuing the following command:
   1. **service httpd start** [enter]
   2. **service mysql start** [enter]
6. **Configure** PATH environment variable for mono by running this command: **export PATH=/opt/novell/mono/bin:\$PATH **. To persist this after a system bounce, add the same line to the end of the /etc/profile file.


    ****

7. **Test** your server by opening a browser and navigating to your &#8220;Public DNS&#8221; domain (i.e. http://<span class="value">ec2-00-00-00-000.compute-1.amazonaws.com). The Public DNS domain can be found on the properties of your EC2 instance in the AWS Management Console. If you get a page that says &#8220;Apache 2 Test Page&#8221; you are good to go.<br /> </span>

That&#8217;s it. You are now up and running with a CentOS x64 LAMP Server capable of running .NET applications. There is obviously more you will want to do depending on your needs but the steps above give you server that is &#8220;ready to go&#8221;.

[1]: /migrating-to-amazon-ec2-web-services/
[2]: http://www.google.com/url?sa=t&source=web&cd=2&ved=0CCsQFjAB&url=http%3A%2F%2Fwww.mono-project.com%2F&ei=FM_KTaOLOYbn0QGCt5noCA&usg=AFQjCNHVts-EqhUHaT4QJLm5yVTUXvWnUA&sig2=36rlF4rMYyxxzPzI3q7cQQ
[3]: http://docs.amazonwebservices.com/AmazonEC2/gsg/2007-01-19/putty.html
