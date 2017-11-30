---
title: Desktop Wallpaper Slideshow
author: Brady
layout: post
permalink: /desktop-wallpaper-slideshow/
---
A coworker [@ynab](https://twitter.com/ynab) recently posted on Slack about how they loved the [National Park New Tab Chrome Extenstion](https://chrome.google.com/webstore/detail/national-park-new-tab/kbhpocomjebacaaofccpbkaglnhnghee).  I gave it a try and yes, I love it too.  I also have a Chromecast and am often calling my wife in the room to see the amazing photo that just popped on as the latest Chromecast background.   Being a left-brain person, pretty pictures usually don't get me juiced up but hey, I like what I like.

So, I thought it might be nice to create a script that could automatically change my Desktop Wallpaper on an interval and pull from various sources.  You know, a Desktop Wallpaper Slideshow of sorts.  I thought it would be fun and might even get my creative juices flowing during the day when I see that amazing photo pop up.

## The Script

Here is what I came up with.  It's a node script that uses [weighted](https://www.npmjs.com/package/weighted) to randomly pick 1 of 4 photo sources and set my desktop background using the [wallpaper](https://www.npmjs.com/package/wallpaper) module.  The 4 sources are:

1. **Bing Photo of The Day (Archive)**
2. **Unsplash** - Seriously nice, high-res photos.  Unsplash requires registration to get an API token but it's easy to do.
3. **Chromecast Background Archive** - Uses a Chromecast background image archive [on GitHub](https://github.com/dconnolly/chromecast-backgrounds) thanks to [@dconnolly](https://github.com/dconnolly).
4. **Picasa Web Album** - Uses Google/Picasa Data API to pull photos from a public album

<script src="https://gist.github.com/bradymholt/28c1e9bd27cbee668764b69bc6bc9f80.js"></script>

## Crontab

To change the wallpaper every 5 minutes I added the following crontab entry (`crontab -e`).

~~~
*/5 * * * * . ~/.zshrc; /usr/local/bin/node ~/bin/wallpaper-changer.js
~~~
