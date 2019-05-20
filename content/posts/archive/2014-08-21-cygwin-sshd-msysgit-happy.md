---
title: cygwin+sshd+msysGit=happy
author: Brady
permalink: /cygwin-sshd-msysgit-happy/
dsq_thread_id: 1979 http://www.geekytidbits.com/?p=1979
---
At work, I have use a MacBook Air and run Windows 7 in a VirtualBox VM.  I use (and love) the Mac Terminal heavily and have almost an entire monitor dedicated to it.  Since we use Git, I wanted to be able to use the Mac Terminal to interact with files on my Windows 7 VM since I do a good deal of development on the Windows box itself.  I installed [cygwin][1] with the sshd and Git packages, configured it and was able to successfully ssh in to the Windows box from my Mac OSX terminal.  (By the way, the reason I went with cygwin is because I was able to install sshd as a Windows Service; msysGit does not provide sshd).  After some tinkering with settings and ssh keys, everything was working fairly well.  However, over time I began to notice (more and more) Git on cygwin running slow when doing pull, merge, status, etc. on a particularly large repo.  It got really frustrating!  I tried the same commands in msysGit and things were much snappier, possibly because msysGit was running Git 1.9.4 and the latest version (available) of Git in cygwin was 1.7.x.  Anyway, I decided I would try to run msysGit from within cygwin to see if could get the best of both worlds.  It wasn&#8217;t the easiest thing to get working but I finally did get them playing nicely with each other and am very happy.  Here are the steps I took:

  * Install **[cygwin][1]** with the latest Git package. (My install path is C:\cygwin64)
  * Install the latest version of **[msysGit][2]**. (My install path is C:\Program Files (x86)\Git)
  * **Rename** C:\cygwin64\bin\git.exe to C:\cygwin64\bin\git_cygwin64.exe (to back it up)
  * **Copy** C:\Program Files (x86)\Git\bin\git.exe to C:\cygwin64\bin\
  * **Copy** the folder C:\Program Files (x86)\Git\libexec to C:\cygwin64\
  * From within cygwin environment, run git config &#8211;global color.ui **always**

The only issue I&#8217;m still having is when doing a `git log` command, the paging is not working.  If I run `git log | less` the paging works fine so I am just using this syntax for now.

 [1]: https://www.cygwin.com/
 [2]: http://msysgit.github.io/
