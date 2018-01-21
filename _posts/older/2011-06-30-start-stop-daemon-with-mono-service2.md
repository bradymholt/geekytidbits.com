---
title: start-stop-daemon with mono-service2
author: Brady
layout: post
permalink: /start-stop-daemon-with-mono-service2/
dsq_thread_id: 519 http://www.geekytidbits.com/?p=519
---

I wrote a .NET service (i.e. System.ServiceProcess.ServiceBase) and was running it in Arch Linux with the help of mono-service2. I wanted it to behave like another other Linux daemon with start / stop / restart ability so I could start the service at boot easily.

Here is the bash script I finally came up with which I placed in the /etc/rc.d folder and added a DAEMON reference to in the /etc/rc.conf file. If you are using another distribution of Linux, most likely you&#8217;ll want to use the chkconfig command to register the service.

```shell
#!/bin/sh

daemon_name=MyMonoService

. /etc/rc.conf
. /etc/rc.d/functions

PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
DAEMON=/usr/bin/mono/mono-service2
NAME=MyMonoService
DESC=MyMonoService

MONOSERVER=$(which mono-service2)
MONOSERVER_PID=$(cat /tmp/MyMonoService.lock)

case "$1" in
 start)
  stat_busy "Starting MyMonoService"
  if [ -z "${MONOSERVER_PID}" ]; then
   ${MONOSERVER} -l:/tmp/MyMonoService.lock /opt/MyMonoService/MyMonoService.exe
   stat_done
  else
   echo "MyMonoService is already running!"
   stat_fail
  fi
 ;;
 stop)
  stat_busy "Stopping MyMonoService"
  if [ -n "${MONOSERVER_PID}" ]; then
   kill ${MONOSERVER_PID}
   rm /tmp/MyMonoService.lock
   stat_done
  else
   echo "MyMonoService is not running"
   stat_fail
  fi
 ;;
 restart)
  $0 stop
  sleep 1
  $0 start
  stat_done
 ;;
 *)
  echo "usage: $0 {start|stop|restart}"
esac

exit 0
```
