---
title: Run a program as another domain user in Windows
author: Brady
layout: post
permalink: /run-a-program-as-another-domain-user-in-windows/
dsq_thread_id: 2033 http://www.geekytidbits.com/?p=2033
---
This is a short post, and mainly for my own reference in the future.  I run a MacBook Air at work and have Windows 7 running on a VirtualBox VM.  It&#8217;s a long story as to why, but my Windows VM is not joined on our work domain (Active Directory).  Most of the time this isn&#8217;t a big deal but occasionally there are times I really do need to run a program in the context of my Active Directory domain user.  A good example is SQL Server Management Studio, because to connect to servers with &#8220;Windows Authentication&#8221; it assumes you are already running SSMS in the context of the Windows user you will be connecting with.  Since my box isn&#8217;t even connected to the domain, this is a problem.  To get around this, I changed my SSMS shortcut to use the following command.  This command opens a command prompt, asks me to enter my password, and then opens a program in the context of the user I specify.

<pre>
C:\Windows\System32\runas.exe /netonly
  /user:MYDOMAIN\username &#8220;C:\Program Files (x86)\yada\yada.exe&#8221;
</pre>
