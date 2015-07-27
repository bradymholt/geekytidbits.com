---
title: Mount SD card in VirtualBox from Mac OS X Host
author: Brady
layout: post
permalink: /mount-sd-card-virtualbox-from-mac-osx/
dsq_thread_id: 1965 http://www.geekytidbits.com/?p=1965
---
Somehow I forgot the password to one of my Raspberry Pi boxes and needed to reset it.  The only way I know how to do this is to mount the root partition from the context of another machine and then edit the /etc/shadow file.  Since I own a MacBook Air and it can&#8217;t read ext3 natively (not that I know of at least) I thought I would just just spin up a virtual machine in VirtualBox, mount the SD card from the Raspberry Pi, make the change and be done.  It wasn&#8217;t as easy as I thought because, for some reason, getting VirtualBox to pass the SD card reader to a virtual machine as a virtual device is not quite easy.  Below are the steps I had to take to get it working.

First, insert the SD card into the reader, open a terminal window and type **mount**.

<img class="alignnone size-full wp-image-1967" src="/media/Screen-Shot-2014-07-20-at-3.10.34-PM-copy.png" alt="Screen Shot 2014-07-20 at 3.10.34 PM copy" width="745" height="171" />

Take note of the SD card device that shows up.  In my case, it was **/dev/disk1s1 **(NO NAME matches the title that showed up in Finder when I inserted the card so this is a hint as to which one is the one I am looking for) listed at the bottom of the mount command.  You don&#8217;t want to get this wrong so make sure it&#8217;s right!  For a sanity check you could always run mount before inserting the card and then after, to see the difference.

Next, open up **Disk Utility**, click on the the mounted partition from the card (NO NAME in my case), and then click the **Unmount** button at the top.  Do not click the eject button, just the **Unmount **button.

<img class="alignnone size-full wp-image-1966" src="/media/Screen-Shot-2014-07-20-at-3.08.37-PM1.png" alt="Screen Shot 2014-07-20 at 3.08.37 PM" width="742" height="640" />

Now, you need to create a VirtualBox vmdk file that points to the SD card so that you can mount it as a device in a virtual machine.  You need to run **sudo VBoxManage internalcommands createrawvmdk -filename ./sd-card.vmdk -rawdisk /dev/disk1**.  Note, when I ran the mount command above, my device name was /dev/disk1**s1 **but in this command I did not include the trailing s1 portion.  The reason for this is that the s1 portion of the device name denotes a partition but I want to create a pointer to the entire device (mine has 2 partitions).  So, just take the first portion of your device name and use it for the -rawdisk parameter.

<img class="alignnone size-full wp-image-1969" src="/media/Screen-Shot-2014-07-20-at-3.25.23-PM.png" alt="Screen Shot 2014-07-20 at 3.25.23 PM" width="744" height="157" />

Now that you have a vmdk file pointing to your raw SD card device, you need to set permisisons on the vmdk file and /dev/disk1 device.  Run **sudo chmod 777 /dev/disk1 **and **sudo chmod 777 ./sd-card.vmdk**.  This will ensure you are able to access and mount the vmdk file in VirtualBox.

<img class="alignnone size-full wp-image-1970" src="/media/Screen-Shot-2014-07-20-at-3.26.04-PM.png" alt="Screen Shot 2014-07-20 at 3.26.04 PM" width="744" height="241" />

The last step, is to add a SATA device in the virtual machine Storage configuration.  Click &#8220;Add Hard Drive&#8221; on the SATA controller.

<img class="alignnone size-full wp-image-1968" src="/media/Screen-Shot-2014-07-20-at-3.14.08-PM1.png" alt="Screen Shot 2014-07-20 at 3.14.08 PM" width="580" height="465" />

You will be given the option to &#8220;Choose existing disk&#8221;.  Choose this option and then select the vmdk file you created earlier.

<img class="alignnone size-full wp-image-1974" src="/media/Screen-Shot-2014-07-20-at-3.47.50-PM.png" alt="Screen Shot 2014-07-20 at 3.47.50 PM" width="472" height="133" />

Now, all you need to do is start your virtual machine with VirtualBox and your SD card should be accessible from your virtual machine.  If you get an error about the device being busy when trying to start the machine, open the **Disk Utility** and ensure all partitions of the SD card are still **Unmounted.  **For some reason I had to do this because OS X remounted my card somewhere along the way.

If you&#8217;re lucky like me, SD partitions will automatically be mounted.  In my case, I was running Linux Mint and both partitions of my SD card were mounted automatically!
