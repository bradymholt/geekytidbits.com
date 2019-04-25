---
title: Desktop Wallpaper Slideshow
author: Brady
permalink: /desktop-wallpaper-slideshow/
---

A coworker [@ynab](https://twitter.com/ynab) recently posted on Slack about how they loved the [National Park New Tab Chrome Extenstion](https://chrome.google.com/webstore/detail/national-park-new-tab/kbhpocomjebacaaofccpbkaglnhnghee). I gave it a try and yes, I love it too. I also have a Chromecast and am often calling my wife in the room to see the amazing photo that just popped on as the latest Chromecast background. Being a left-brain person, pretty pictures usually don't get me juiced up but hey, I like what I like.

So, I thought it might be nice to create a script that could automatically change my Desktop Wallpaper on an interval and pull from various sources. You know, a Desktop Wallpaper Slideshow of sorts. I thought it would be fun and might even get my creative juices flowing during the day when I see that amazing photo pop up.

## The Script

Here is what I came up with. It's a node script that uses [weighted](https://www.npmjs.com/package/weighted) to randomly pick 1 of 4 photo sources and set my desktop background using the [wallpaper](https://www.npmjs.com/package/wallpaper) module. The 4 sources are:

1. **Bing Photo of The Day (Archive)**
2. **Unsplash** - Seriously nice, high-res photos. Unsplash requires registration to get an API token but it's easy to do.
3. **Chromecast Background Archive** - Uses a Chromecast background image archive [on GitHub](https://github.com/dconnolly/chromecast-backgrounds) thanks to [@dconnolly](https://github.com/dconnolly).
4. **Picasa Web Album** - Uses Google/Picasa Data API to pull photos from a public album

```js
#!/usr/bin/env node

"use strict";

const got = require("got");
const tempfile = require("tempfile");
const wallpaper = require("wallpaper");
const path = require("path");
const fs = require("fs");
const request = require("request");
const weighted = require("weighted");

function setWallpaper(url) {
  console.log("Setting wallpaper to: " + url);
  const file = tempfile(path.extname(url));

  got
    .stream(url)
    .pipe(fs.createWriteStream(file))
    .on("finish", () => {
      wallpaper.set(file);
    });
}

function setBing() {
  console.log("Using Source: Bing Photo of the Day");

  let lastBingPhotoCount = 100;
  request(
    {
      url: `http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=${lastBingPhotoCount}&mkt=en-US`,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var randomPhoto =
          body.images[Math.floor(Math.random() * body.images.length)];
        setWallpaper("http://www.bing.com" + randomPhoto.url);
      }
    }
  );
}

function setUnsplash() {
  console.log("Using Source: Unsplash");

  var api_key = process.env.UNSPLASH_API_KEY;
  request(
    {
      url: "https://api.unsplash.com/photos/random?client_id=" + api_key,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setWallpaper(body.urls.full);
      }
    }
  );
}

function setChromecast() {
  console.log("Using Source: Chromecast Backgrounds");

  request(
    {
      url:
        "https://raw.githubusercontent.com/mattburns/chromecast-backgrounds/master/backgrounds.json",
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var randomPhoto = body[Math.floor(Math.random() * body.length)];
        setWallpaper(randomPhoto.url);
      }
    }
  );
}

function setGooglePhoto() {
  console.log("Using Source: Picasa Web Album");

  var userId = "115528839112598673902";
  var albumId = "5710317752556741025";
  request(
    {
      url:
        "https://picasaweb.google.com/data/feed/base/user/" +
        userId +
        "/albumid/" +
        albumId +
        "?alt=json&kind=photo&max-results=100&hl=en_US&imgmax=1600",
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var randomPhoto =
          body.feed.entry[Math.floor(Math.random() * body.feed.entry.length)];
        setWallpaper(randomPhoto.content.src);
      }
    }
  );
}

let wallpaperHandlers = [setBing, setUnsplash, setChromecast, setGooglePhoto],
  weights = [0.25, 0.25, 0.25, 0.25];

let currentHandler = weighted.select(wallpaperHandlers, weights);
currentHandler();
```

## Crontab

To change the wallpaper every 5 minutes I added the following crontab entry (`crontab -e`).

```shell
*/5 * * * * . ~/.zshrc; /usr/local/bin/node ~/bin/wallpaper-changer.js
```
