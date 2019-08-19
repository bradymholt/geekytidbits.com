---
title: jQuery googleslides
permalink: /jquery-googleslides-project/
body_end: >
  <link href="googleslides/jquery.googleslides.css" rel="stylesheet" />
  <style>
    .google-slides img { margin: 0px;}
  </style>
  <script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>
  <script src="googleslides/jquery.googleslides.js" type="text/javascript"></script>
  <script>
    $(document).ready(function(){
      $('.google-slides').each(function(index) {
        var options = {
          userid: $(this).attr('data-userid'),
          albumid: $(this).attr('data-albumid'),
          imgmax: $(this).attr('data-imgmax'),
          caption: false,
          maxresults: 100
        };
        $(this).googleslides(options);
      });
    });
  </script>
---

I'm a big fan of Picasa.  I love the <a href="http://picasa.google.com/" target="_blank">client app</a> because it is powerful yet easy to use (and free!).  And, I love the integration with the web in Picasa Web Albums because I can use the <a href="http://code.google.com/apis/picasaweb/overview.html" target="_blank">Picasa Web Albums Data API</a> to control my albums online.

I previously wrote a syncing tool called <a href="/picasawebsync/" target="_blank">PicasaWebSync</a> which I run daily to sync my local photos to my online albums automatically.  Using the nice <a href="http://itunes.apple.com/us/app/web-albums-a-picasa-photo/id344997890?mt=8" target="_blank">Web Albums</a> app on my iPhone, I can easily pull up photos that were synced automatically.  I don&#8217;t have to pull out the USB cord and sync with iTunes, pay for iCloud storage, or buy an iPhone that has a larger capacity.

Anyway, since I have all my albums uploaded and synced automatically I wanted a way to display slideshows on my various websites so I could show some photos off!  I looked around for a nice jQuery plugin to do this, and although there were one or two candidates, I wasn&#8217;t fully happy with them.  And, I thought it would be fun to write my own.

### Demo

**jQuery googleslides** &#8211; A jQuery plugin to display your Google Photos, including Picasa and Google+ albums.

<div class="google-slides" style="width:400px; margin: 0px !important;" data-userid="115528839112598673902" data-albumid="5710317752556741025" data-imgmax="400"></div>

### More Info

Go to the project page for more info: <a href="http://bradymholt.github.com/jquery-googleslides" target="_blank">http://bradymholt.github.com/jquery-googleslides</a>.
