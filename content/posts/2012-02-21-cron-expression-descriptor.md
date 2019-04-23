---
title: Cron Expression Descriptor
author: Brady
layout: post
permalink: /cron-expression-descriptor-project/
dsq_thread_id: 910 http://www.geekytidbits.com/?p=910
---
## Background

I am implementing a system similar to SQL Agent Jobs and Windows Scheduled Tasks where I need to run some type of job on a recurring basis. I needed to store the recurring schedule (every 5 minutes, once a month, every 3 hours, etc.) in my database so my system knows when to fire the jobs.  At first I didn&#8217;t think this would be that big of a challenge to model but the deeper I got into the problem I realized it was a bit hairy. Think about it. How many fields do you need to store this info and how do you account for schedules such as &#8220;every 3 hours, Monday through Friday between 8AM-5PM&#8221;? Bit field for each day of the week, start/end time fields with another field that signifies a recurrence interval? It gets messy fast when you dig into it.

Fortunately, since I am familiar with Linux I have utilized <a href="http://en.wikipedia.org/wiki/Cron" target="_blank">cron</a> on many occasions and know that a <a href="http://en.wikipedia.org/wiki/Cron#CRON_expression" target="_blank">cron expression</a> is a simple representation of a (potentially) complex recurring schedule.  I decided to simply store a cron schedule in 1 (only one!) database varchar field and leverage the excellent <a href="http://code.google.com/p/ncrontab/" target="_blank">ncrontab</a> (a cron parsing library for .NET) to read and work with it.

This left me with one residual challenge.  I needed to display the cron schedule in an interface for end users that will most likely not understand how to, nor should be expected to, interpret a cron schedule.  Looking around for a .NET friendly library that could convert a cron schedule like &#8220;15 11 \* \* 1-5&#8243; into something like &#8220;At 11:15 AM, Monday-Friday&#8221;, I effectively found nothing.

So, I wrote my own.  Why not?  It turned out to be a fun programming challenge, actually, because it is quite challenging.

## Introducing Cron Expression Descriptor

Cron Expression Descriptor is an open source C# library that converts cron expressions into human readable string.

### Examples

|expression|Output|
|--- |--- |
|* * * * *|Every minute, daily|
|*/5 * * * *|Every 5 minutes, daily|
|*/5 15 * * MON-FRI|Every 5 minutes, at 03:00 PM, Monday-Friday|
|* * * 3 *|Every minute, daily, only in March|
|30 6,14,16 * * *|At 06:30 AM, 02:30 PM, and 04:30 PM, daily|
|23 12 * * SUN|At 12:23 PM, only on Sundays|
|0-10 11 * * *|Every minute between 11:00 AM and 11:10 AM, daily|


## More Info / Download

To learn more about this project and to get information on downloading, visit the project page at <a href="http://cronexpressiondescriptor.azurewebsites.net/" target="_blank">http://cronexpressiondescriptor.azurewebsites.net/</a>
