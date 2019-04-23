---
title: Convert current Epoch time to Local time in SQL Server
author: Brady
layout: post
permalink: /convert-current-epoch-time-to-local-time-in-sql-server/
dsq_thread_id: 1187 http://www.geekytidbits.com/?p=1187
---

Epoch, or <a href="http://en.wikipedia.org/wiki/Unix_time" target="_blank">Unix time</a>, is a measure of time represented by the number of seconds since  midnight on January 1, 1970 (UTC).  It is used in various places, especially in POSIX systems such as Unix, Linux, BSD, etc.  I recently came across an integration project where I had the need to convert current epoch time to the &#8216;local&#8217; timezone in SQL Server.  Here is what I ended up with.

```sql
DECLARE @epoch int
SET @epoch = 1342189899 --7/13/2012 14:31:39 UTC
PRINT DATEADD(minute, DATEDIFF(minute, getutcdate(), getdate()), DATEADD(s, @epoch, '19700101 00:00:00:000'))
--output: Jul 13 2012  9:31AM
```

See it in action on **SQL Fiddle** here: <a href="http://sqlfiddle.com/#!3/d41d8/2617/0" target="_blank">http://sqlfiddle.com/#!3/d41d8/2617/0</a>

Note:  The above approach works well for &#8216;current&#8217; epoch timestamps  but is flawed if you are trying to convert historical epoch times, because of the daylight savings time (DST) factor.  The UTC offset calculation above (DATEDIFF(minute, getutcdate(), getdate())) is relying upon current system time and is not DST aware.  In my particular case this is not an issue because I have an external system that is writing new records with a &#8216;current epoch timestamp&#8217; so I convert them to the local timezone soon thereafter and store the result.
