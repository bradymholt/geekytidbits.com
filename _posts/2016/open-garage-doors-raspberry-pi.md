---
title: Opening Garage Doors with Raspberry Pi
author: Brady
layout: post
permalink: /open-garage-doors-raspberry-pi
---

Geeking out on Twitter
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I&#39;m totally geeking out over here with using JavaScript to apply 3V to my RaspberryPi GPIO pins: <a href="https://t.co/CfYiDLYFCB">https://t.co/CfYiDLYFCB</a></p>&mdash; Brady Holt (@bradymholt) <a href="https://twitter.com/bradymholt/status/809021240329564160">December 14, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Parts List

- [Raspberry Pi 3 Starter Kit](https://www.amazon.com/LoveRPi-Raspberry-Plug-Play-Starter/dp/B01IYBZEV6) (includes power adapter and 8GB SD Card)
- [2 Channel DC 5V Relay Module](https://www.amazon.com/gp/product/B00E0NTPP4)
- [Female to Female Jumper Wires](https://www.amazon.com/gp/product/B017NEGTXC)
- [Project Box](https://www.amazon.com/dp/B0002BBQUU)

## Hardware Connections

1. Connect GPIO 12 to R1
3. Connect wire from R1 to garage door wires

## Setup ArchLinux ARM

1. Follow the [Mount SD card in VirtualBox from Mac OS X Host](http://www.geekytidbits.com/mount-sd-card-virtualbox-from-mac-osx/) guide to get access to SD Card from VirtualBox running on OS X host.
1. Prepare SD Card with [these instructions](https://archlinuxarm.org/platforms/armv8/broadcom/raspberry-pi-3)
2. Before running `umount boot root` from above, run `sync`.
3. After running  `umount boot root` from above, shutdown VirtualBox and then Eject the SD Card from OS X.
2. Insert SD Card into Pi and plug it in

## Setup Software

Although the software provisioning is fairly straightforward in this project, there are still lots of little steps for things like configuring a user account, setting up Wifi, configuring Node, etc.  I've created an Ansible playbook which automates this entire process and makes it super easy and fast to get up and running.

1. Install Ansible
2. git clone https://github.com/bradyholt/hammerhead-provisioning
3. Follow instructions
4. Modify provision.yml and replace `main_user`, `gh_pubkey_user`, and `wifi_ssid` variables with your own values.
5. Run `ansible-vault edit secrets.yml` and replace `main_user_password` and `wifi_ssid_key` with your own values (`wifi_ssid_key` value can be determined by using this website: https://www.wireshark.org/tools/wpa-psk.html)

## Test

1. Run `curl -X PUT -D - -H "Content-Type: application/json" -d '{ "relay":{"state":"closed"}}' http://localhost:3000/relays/1`
2. Watch the garage door open!!

## Next steps

The sky is the limit.