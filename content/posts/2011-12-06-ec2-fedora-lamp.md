---
title: 'Quick Setup Guide: Amazon EC2 LAMP server running Fedora 15'
author: Brady
layout: post
permalink: /ec2-fedora-lamp/
dsq_thread_id: 815 http://www.geekytidbits.com/?p=815
---

New to EC2?  Take a look at the <a href="http://ec2dream.webs.com/AWS-Management-Console.pdf" target="_blank">Getting Started Guide</a>.

<li style="text-align: left;">
  <strong>Launch </strong><span class="Apple-style-span" style="font-weight: normal;">a new EC2 instance from the AWS Management Console.  Search for ami-2abf4443 which is a Fedora 15 64bit image backed by a 10GB EBS instance.</span>
</li>

<p style="padding-left: 30px;">
  <strong></strong><img title="fedora-ami" src="/media/fedora-ami1.png" alt="" width="558" height="158" />
</p>

<li style="text-align: left;">
  On the Configure Firewall step, create a new security group and add an inbound rule for ports 80 (HTTP) and 22 (SSH).<img class="alignnone" title="ec2-firewall" src="/media/firewall.png" alt="" width="637" height="344" />
</li>
  * **Connect** to your new instance using the ssh client of your choice. Note, you’ll need to use the Key Pair your generated when you launched your instance to connect. When asked for the username enter **ec2-user**. I use PuTTY from Windows and it was a little tricky to get connected but the [Appendix: PuTTY][1] helped.  The thing is, you need to use puttygen.exe to convert a .pem key pair file to .ppk format so that Putty can use it.
  * **Install** the needed software with yum.

    ```shell
    sudo yum install httpd mysql mysql-server php
    sudo chkconfig --levels 235 httpd on
    sudo service httpd start
    sudo chkconfig --levels 235 mysqld on
    sudo service mysqld start
    mysql_secure_installation
    ```

* **Test** apache by firing up a browser and navigating to the Public DNS name of your server listed in the EC2 instance properties.  It usually looks something like ec2-52-15-148-17.compute-1.amazonaws.com.  If you get the Apache test page you are in business.

[1]: http://docs.amazonwebservices.com/AmazonEC2/gsg/2007-01-19/putty.html
