---
title: Remote Unattended MSI Installation with PsExec
permalink: /unattended-msi-installation-psexec/
---

I recently had the need to remotely install a freshly built MSI to a remote Windows Server machine using the powerful command-line tool <a href="http://technet.microsoft.com/en-us/sysinternals/bb897553" target="_blank">PsExec</a>.  At first I thought this would be easy but I ran into some issues that had me banging my head for hours.  I was able to install the MSI from the command line when logged into the target machine directly with no issue but trying to do it remotely with psexec was resulting in very strange behavior.  I finally found that I needed to use the** -e** and **-s** parameters of PsExec or else I would get msiexec errors like <a href="http://support.microsoft.com/kb/229683" target="_blank">1612</a> or <a href="http://support.microsoft.com/kb/229683" target="_blank">1638</a>.  If you don&#8217;t use those parameters, PsExec will execute the command without the full user account context and msiexec does not like that.

My approach is to copy the MSI to the target server (net use, copy), uninstall and then install (psexec, msiexec)  Here are the commands I am using which work like a charm.

```shell
net use \\SERVER1\c$\Windows\Temp AdminPassword /user:Admin
copy /Y C:\build\MyApp.msi \\SERVER1\c$\Windows\Temp
psexec.exe \\SERVER1 -u Admin -p AdminPassword -e -s msiexec /x {61EF76AE-6CC9-4EFC-B788-6845C0BCEF00} /quiet
psexec.exe \\SERVER1 -e -s -u Admin -p AdminPassword msiexec /i C:\Windows\Temp\MyApp.msi TARGETDIR=C:\MyApp /quiet
net use \\SERVER1\c$\Windows\Temp /d
```
