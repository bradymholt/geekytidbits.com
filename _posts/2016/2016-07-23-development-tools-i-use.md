---
title: Development Tools I Use in 2016
author: Brady
layout: post
permalink: /development-tools-i-use/
---

It's been 5 years since I wrote the post [My Development Toolbelt](http://www.geekytidbits.com/my-development-toolbelt/), inspired to do so by the [Hanselman](http://www.hanselman.com/tools).  I thought it was time to write another post on the development tools I use today, in 2016.  So, here we go.

## Coding
When working with actual source code, and the construction of it, these are my go to tools.

- [VS Code](https://code.visualstudio.com) (a.k.a. "Code") - I love this code editor.  After switching off of Visual Studio as my go to IDE, I tried Sublime Text, Atom, WebStorm, Vim, and RubyMine.  Some were better than others but I eventually settled on Code as my primary editor/debugger.  It rocks.
- [Git](https://git-scm.com/) - Yes, I'm a Git source control guy.  Along with everyone else.
- [GitHub](http://www.github.com) - Yes, I use GitHub to store Git repos and collaborate, along with everyone else.
- [Beyond Compare](http://www.scootersoftware.com/) - I'm still using this gem for file diffs and 3-way merges.  I was thrilled to learn they released an OS X version that works great.
- [mitmproxy](https://mitmproxy.org/) - A simple, CLI based HTTP proxy.  I used to be a [Fiddler](http://www.telerik.com/fiddler) guy when I used Windows primarily but unfortunately the Fiddler version for OS X is straight up bad. 
- [RegExr](http://www.regexr.com/) - RegEx made easy.
- [CSV To Markdown Table](https://donatstudios.com/CsvToMarkdownTable) - This website comes in handy when I have CSV output (say, from a db query) that I need to display in Markdown (say in a GitHub issue).
- [JSON Formatter and Validator](https://jsonformatter.curiousconcept.com/) - Makes JSON pretty.
- [GenerateData.com](http://www.generatedata.com/) - Generates sample/fake datasets to use in prototypes or for testing.

## DevOps / Cloud

To get code built, tested, and promoted to different environments, the following tools are invaluable for me.

- [TeamCity](https://www.jetbrains.com/teamcity/) - Continuous Integration and build management server. TeamCity is _still_ amazing.
- [Jenkins](https://jenkins.io/) - I've started using Jenkins at work and although I prefer TeamCity for CI, Jenkins is pretty good (and free!).
- [AWS](http://aws.amazon.com) - I use AWS primarily for S3 and EC2 machines.
- [Digital Ocean](https://m.do.co/c/974ef9a471c1) - Although I do use AWS EC2 for machines, I have been using DO more and more for machines that run my personal projects.  Although DO doesn't have as many features as AWS/EC2, it is catching up quickly.
- [Ansible](https://www.ansible.com/) - From the website: "Deploy apps.  Manage Systems.  Crush Complexity".  Yeah, that pretty much explains it.  I use Ansible to provision _and_ deploy apps.  It makes things automated and scriptable.
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) - I use VirtualBox to create isolated dev environments locally.  Although, I've been veering more towards [Docker](https://www.docker.com/) for this type of thing lately.

## Database
- [Navicat](https://www.navicat.com) - I use Navicat for PostgreSQL and SQLite management.
- [DB Browser for SQLite](https://github.com/sqlitebrowser/sqlitebrowser) - Great tool for super quick access to a SQLite database.  It has very minimal features but is handy for trival things.

## System
These are the tools and software I use for my base development machine setup.

- [OS X / El Capitan](http://www.apple.com/osx/) - I switched over to OSX a few years ago as my primary desktop OS for development.
- [LastPass](https://lastpass.com/) - I was a longtime hold-out from using a password manager but since I dived in, I've never looked back.  In LastPass, I store website passwords, system credentials, software license keys, RSA Key Pairs, and other misc _secret_ stuff I need to reference from time to time.  It's nice having everything centralized and secure.  I tried 1Password for awhile but the Android (my mobile platform of choice) client for LastPass is _much_ better in LastPass.
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) - I use VirtualBox to run Windows 10, [vagrant](https://www.vagrantup.com/) boxes and some Linix distros I play around with.
- [Retina Display Manager](https://github.com/avibrazil/RDM) - When I am out with my laptop somewhere and don't have my external monitors, I just crank my resolution up to something super high so I have more screen real estate.
- [BetterSnapTool](https://itunes.apple.com/us/app/bettersnaptool/id417375580?mt=12) - I use this to resize windows in OS X, particularly to snap windows to the left/right on my monitors.  It allows you to accomplish what you can do with Windows+<Right> or Windows+<Left> in Windows 10.
- [Zsh](http://www.zsh.org/) - I prefer Zsh over Bash.  It has a lot of convienent, productive features. 
- [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) - Oh My Zsh manages Zsh config and makes adding in themes and plugins trival.

## Misc Tools
- [LICEcap](http://www.cockos.com/licecap/) - Record screen video as an animated GIF.  This is super handy when I want to record my screen and post an animated GIF in a GitHub PR / Issue for others to easily see.  I prefer the simplicity of this tool rather than using something heavier like Jing or CloudApp.
- [Page Ruler](https://chrome.google.com/webstore/detail/page-ruler/jlpkojjdgbllmedoapgfodplfhcbnbpn?hl=en) (Chrome Extension) - From the website: "Draw a ruler to get pixel dimensions and positioning, and measure elements on any web page."  Yep, that's what it does.
- [Awesome Screenshot](https://chrome.google.com/webstore/detail/awesome-screenshot-screen/nlipoenfbbikpbjkfpfillcgkoblgpmj?hl=en)  (Chrome Extension) - I love this tool and can't live without it.  This makes taking screenshots (and optionally annotating them) dead simple.
- [bash scripts](https://github.com/bradyholt/dotfiles/tree/master/bin) - I have a collection of bash scripts for handy things like abstracting Git commands and `ws` for starting a lightweight webserver from the current directory.
- [Photoshop Elements](http://www.photoshop.com/products/photoshopelements) - I use this for image editing when I need to do something non-trival.

## Reference
- [StackOverflow](http://stackoverflow.com/) - I'm unashamed to say I use SO (along with everyone else!) all the time and it would probably take me significantly longer to get stuff done without it.
- [Twitter](https://twitter.com) - Twitter is a great resource for staying up to date with tidbits in software development.  I avoided Twitter for years because I considered it distracting and purely social but it turns out I learn a ton of stuff just by following smart people on there. You can find me [@bradyholt](https://twitter.com/bradymholt).
- [Hacker News](https://news.ycombinator.com/).  I read this daily, along with everyone else.  You can learn a ton a stuff on here.
- [Reddit](https://www.reddit.com/r/programming/) - The /r/programming subreddit is a great resource to keep up with interesting articles and news.
- [Feedly](http://feedly.com/) - When I come across a blog or a site that has great content, I will add it to my Feedly list and read through new articles from time to time.  Also, I have a "Podcast" category in here which is a great way to follow the podcasts I like to listen to.

Wow, a lot has changed from 5 years ago!