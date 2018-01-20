---
title: Rolling snapshots for EC2
author: Brady
layout: post
permalink: /rolling-snapshots-ec2/
dsq_thread_id: 1240 http://www.geekytidbits.com/?p=1240
---

One of the best things about EBS backed EC2 instances is the ability to create <a href="http://docs.amazonwebservices.com/AWSEC2/latest/UserGuide/ebs-creating-snapshot.html" target="_blank">snapshots</a>.  To say this makes backing up your instances &#8220;easy&#8221; would be an understatement.  You can create these snapshots manually through the AWS Management Console and also using the <a href="http://docs.amazonwebservices.com/AWSEC2/latest/CommandLineReference/ApiReference-cmd-CreateSnapshot.html" target="_blank">ec2-create-snapshot</a> API command line tool.  The cost of these snapshots is just $0.125 per GB of data stored and incremental snapshots only store changed data so it&#8217;s really cheap to make lots of snapshots.

I wanted to be able to setup a daily cron job to automatically snapshot my EC2 instance so I wouldn&#8217;t have to worry about backups.  If I ever had a failure or data loss I could simply grab the automatically created snapshot from the previous day and restore it.  Running ec2-create-snapshop with cron is easy enough but there is a 500 count limit to snapshots and I really don&#8217;t want to keep hundreds of snapshots.  I really wanted to just keep a handful of &#8216;latest&#8221; snapshots.

Searching around I came cross a script that handled &#8220;rolling&#8221; snapshots which basically means it will create a snapshot and delete older ones to keep a specified number of latest snapshots.  This is exactly what I wanted.  The script I found was a bit outdated and needed some updates but I was able to make the needed changes fairly easily.  Here&#8217;s how you use it:

**Usage**:

<pre class="brush:text;">ec2-create-rolling-snapshot [OPTIONS] -d DESCRIPTION VOLUME MAX_SNAPSHOTS</pre>

**Example** (keeps 7 most recent snapshots):

<pre class="brush:text;">ec2-create-rolling-snapshot -d "Daily backup-vol-fzz00z0z" vol-fzz00z0z 7</pre>

This script depends on, and assumes the <a href="http://aws.amazon.com/developertools/351" target="_blank">Amazon EC2 API Tools</a> are installed.  If you are running Amazon Linux these should already be installed.  You&#8217;ll need to ensure the following environment variables are set and available at runtime.  If you are running from cron, remember, you&#8217;ll need to set these manually in your crontab or a wrapper script as environment variables set in your shell are not available at cron runtime.

* AWS_ACCESS_KEY
* AWS_SECRET_KEY
* EC2_HOME
* JAVA_HOME

Here&#8217;s the script:

{% gist bradymholt/3953611 %}

For my own use, I wrapped this script in another script called from cron so I can set the needed environment variables and stop/start MySQL to ensure data integrity at time of snapshotting.

<pre class="brush:bash;">#!/bin/sh

#Stop mysql to ensure snapshot consistancy
echo "Stopping mysql..."
/sbin/service mysqld stop
echo "Creating snapshot..."
export AWS_ACCESS_KEY="AKIDDDDDDDDDDDD"
export AWS_SECRET_KEY="GQYL9/JKCFNbZ/2/DDDDDDDDDDDDDDDD"
export EC2_HOME=/opt/aws/apitools/ec2
export JAVA_HOME=/usr/lib/jvm/jre
~/ec2-create-rolling-snapshot -d "Daily backup-vol-fac00d0d" vol-fac00d0d 7
echo "Waiting for snapshot to finish building..."
sleep 10
echo "Starting mysql..."
/sbin/service mysqld start
</pre>

I&#8217;ve had this setup and running for about 2 months now and it works great. I love a hands-off approach to backing up my server and the piece of mind knowing that I can easily grab and restore a snapshot from last night (or 3 days ago) with a few clicks.
