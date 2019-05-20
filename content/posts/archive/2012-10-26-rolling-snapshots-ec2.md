---
title: Rolling snapshots for EC2
author: Brady
permalink: /rolling-snapshots-ec2/
dsq_thread_id: 1240 http://www.geekytidbits.com/?p=1240
---

One of the best things about EBS backed EC2 instances is the ability to create <a href="http://docs.amazonwebservices.com/AWSEC2/latest/UserGuide/ebs-creating-snapshot.html" target="_blank">snapshots</a>.  To say this makes backing up your instances &#8220;easy&#8221; would be an understatement.  You can create these snapshots manually through the AWS Management Console and also using the <a href="http://docs.amazonwebservices.com/AWSEC2/latest/CommandLineReference/ApiReference-cmd-CreateSnapshot.html" target="_blank">ec2-create-snapshot</a> API command line tool.  The cost of these snapshots is just $0.125 per GB of data stored and incremental snapshots only store changed data so it&#8217;s really cheap to make lots of snapshots.

I wanted to be able to setup a daily cron job to automatically snapshot my EC2 instance so I wouldn&#8217;t have to worry about backups.  If I ever had a failure or data loss I could simply grab the automatically created snapshot from the previous day and restore it.  Running ec2-create-snapshop with cron is easy enough but there is a 500 count limit to snapshots and I really don&#8217;t want to keep hundreds of snapshots.  I really wanted to just keep a handful of &#8216;latest&#8221; snapshots.

Searching around I came cross a script that handled &#8220;rolling&#8221; snapshots which basically means it will create a snapshot and delete older ones to keep a specified number of latest snapshots.  This is exactly what I wanted.  The script I found was a bit outdated and needed some updates but I was able to make the needed changes fairly easily.  Here&#8217;s how you use it:

**Usage**:

```shell
ec2-create-rolling-snapshot [OPTIONS] -d DESCRIPTION VOLUME MAX_SNAPSHOTS
```

**Example** (keeps 7 most recent snapshots):

```shell
ec2-create-rolling-snapshot -d "Daily backup-vol-fzz00z0z" vol-fzz00z0z 7
```

This script depends on, and assumes the <a href="http://aws.amazon.com/developertools/351" target="_blank">Amazon EC2 API Tools</a> are installed.  If you are running Amazon Linux these should already be installed.  You&#8217;ll need to ensure the following environment variables are set and available at runtime.  If you are running from cron, remember, you&#8217;ll need to set these manually in your crontab or a wrapper script as environment variables set in your shell are not available at cron runtime.

* AWS_ACCESS_KEY
* AWS_SECRET_KEY
* EC2_HOME
* JAVA_HOME

Here&#8217;s the script:

```shell
#!/bin/sh

# Rolling snapshots for ec2
# Original version: 2010-05-28 by cwilper
# Updated: 2012-10-25 by brady@geekytidbits.com

# (Invoke with -h for more info)

showHelp() {
  echo "SYNOPSIS"
  echo "   ec2-create-rolling-snapshot [OPTIONS] -d DESCRIPTION VOLUME MAX_SNAPSHOTS"
  echo "DESCRIPTION"
  echo "   Create a snapshot of a volume and delete the oldest snapshot"
  echo "   in the series, if necessary."
  echo ""
  echo "   The VOLUME parameter is the name of an existing volume."
  echo ""
  echo "   The DESCRIPTION parameter specifies the description to use for the"
  echo "   new snapshot. All snapshots in a series will have the same description."
  echo ""
  echo "   The MAX_SNAPSHOTS parameter specifies the maximum number of snapshots"
  echo "   in the series. If creation of the new snapshot exceeds this threshold,"
  echo "   the oldest snapshot in the series will be deleted."
  echo ""
  echo "OPTIONS"
  echo "   Any option below may be passed a value of '-' to indicate that values"
  echo "   for that option should be read from stdin."
  echo ""
  echo "   -O, --aws-access-key KEY"
  echo "        AWS Access Key ID. Defaults to the value of the AWS_ACCESS_KEY"
  echo "        environment variable (if set)."
  echo ""
  echo "   -W, --aws-secret-key KEY"
  echo "        AWS Secret Access Key. Defaults to the value of the AWS_SECRET_KEY"
  echo "        environment variable (if set)."
  echo ""
  echo "   -T, --security-token TOKEN"
  echo "        AWS delegation token. Defaults to the value of the AWS_DELEGATION_TOKEN"
  echo "        environment variable (if set)."
  echo ""
  echo "   -U, --url URL"
  echo "        Specify URL as the web service URL to use. Defaults to the value of"
  echo "        'https://ec2.amazonaws.com' or to that of the EC2_URL environment"
  echo "        variable (if set). Overrides the default."
  echo ""
  echo "   --region REGION"
  echo "        Specify REGION as the web service region to use."
  echo "        This option will override the URL specified by the "-U URL" option"
  echo "        and EC2_URL environment variable."
  echo ""
  echo "   --dry-run"
  echo "        Don't create or delete any snapshots; just show what would be done."
  echo ""
  echo "   -?, --help"
  echo "        Display this help."
  echo ""
  echo "   --connection-timeout TIMEOUT"
  echo "        Specify a connection timeout TIMEOUT (in seconds)."
  echo ""
  echo "   --request-timeout TIMEOUT"
  echo "        Specify a request timeout TIMEOUT (in seconds)."
  echo ""
}

while [ "$1" != "" ]
do
  case $1 in
    -h)
      showHelp;
      exit 0;;
    --help)
      showHelp;
      exit 0;;
    -\?)
      showHelp;
      exit 0;;
    --dry-run)
      dryrun=true;;
    -d)
      description=$2;
      volume=$3
      max_snapshots=$4;
      break;;
    --description)
      description=$2;
      volume=$3
      max_snapshots=$4;
      break;;
    *)
      gen_opts="$gen_opts $1";;
  esac
  shift;
done

if [ -z "$description" ]; then
  echo "Required parameter 'DESCRIPTION' missing (-h for usage)"
  exit 1
fi

if [ -z "$volume" ]; then
  echo "Required parameter 'VOLUME' missing (-h for usage)"
  exit 1
fi

if [ -z "$max_snapshots" ]; then
  echo "Required parameter 'MAX_SNAPSHOTS' missing (-h for usage)"
  exit 1
else
  if [ $max_snapshots -lt 1 ]; then
    exit 1
  fi
fi

if [ -z "$EC2_HOME" ]; then
  echo "ERROR: The EC2_HOME environment variable is not defined."
  exit 1
fi

#if [ -z "$AWS_ACCESS_KEY" ]; then
#  echo "ERROR: The AWS_ACCESS_KEY environment variable is not defined."
#  exit 1
#fi

#if [ -z "$AWS_SECRET_KEY" ]; then
#  echo "ERROR: The AWS_SECRET_KEY environment variable is not defined."
#  exit 1
#fi

tempfile=/tmp/ec2-create-rolling-snapshot-$$.tmp

ec2cmd="$EC2_HOME/bin/ec2-create-snapshot$gen_opts -d \"$description\" $volume"
snapshot_id=
if [ -z "$dryrun" ]; then
  eval $ec2cmd > $tempfile
  result=`cat $tempfile`
  snapshot_id=`cat $tempfile|grep SNAPSHOT|awk '{print $2}'`
  snapshot_state=`cat $tempfile|grep SNAPSHOT|awk '{print $4}'`
  rm $tempfile
  if [ -z "$snapshot_id" ]; then
    echo "ERROR: Snapshot creation failed"
    echo "$result"
    exit 1
  fi
  if [ "$snapshot_state" != "pending" ] && [ "$snapshot_state" != "completed" ]; then
    echo "ERROR: Snapshot state is not pending or completed"
    echo "$result"
    exit 1
  fi
  echo "Created $snapshot_id from $volume"
else
  echo "Created snap-TBD from $volume (not really; this is a dry run)"
fi

ec2cmd="$EC2_HOME/bin/ec2-describe-snapshots$gen_opts"
eval $ec2cmd > $tempfile
if [ $dryrun ]; then
    echo "SNAPSHOT snap-TBD $volume pending 9999-99-99T99:99:99+9999 1 $description" >> $tempfile
fi
result=`cat $tempfile`
series=`cat $tempfile|grep SNAPSHOT|grep "$description"|grep $volume|awk '{print $5,$2}'|sort|awk '{print $2}'`
rm $tempfile
if [ -z "$series" ]; then
  echo "ERROR: Failed to get snapshot series"
  echo "$result"
  exit 1
fi

count=`echo "$series"|wc -l|awk '{print $1}'`
echo "Series now contains $count snapshots, max is $max_snapshots"
oldest=`echo "$series"|head -n 1|awk '{print $1}'`
if [ $count -gt $max_snapshots ]; then
  if [ -z "$dryrun" ]; then
    echo "Deleting $oldest"
    ec2cmd="$EC2_HOME/bin/ec2-delete-snapshot$gen_opts $oldest"
    eval $ec2cmd > $tempfile
    result=`cat $tempfile`
    check1=`cat $tempfile|awk '{print $1}'`
    check2=`cat $tempfile|awk '{print $2}'`
    rm $tempfile
    if [ "$check1" != "SNAPSHOT" ] || [ "$check2" != $oldest ]; then
      echo "ERROR: Unexpected output from ec2-delete-snapshot command"
      echo "$result"
      exit 1
    fi
  else
    echo "Deleting $oldest (not really; this is a dry run)"
  fi
fi

exit 0
```

For my own use, I wrapped this script in another script called from cron so I can set the needed environment variables and stop/start MySQL to ensure data integrity at time of snapshotting.

```shell
#!/bin/sh

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
```

I&#8217;ve had this setup and running for about 2 months now and it works great. I love a hands-off approach to backing up my server and the piece of mind knowing that I can easily grab and restore a snapshot from last night (or 3 days ago) with a few clicks.
