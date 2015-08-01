---
title: Projects
author: Brady
layout: page
weight: 2
permalink: /projects/
---
In my limited spare time I like to work on open source software projects.  Not only do I find it fun and a great way to keep learning new things, I have benefited greatly from other OSS projects and am glad to give back a little.  Here are the active projects I own and maintain.

### [jQuery googleslides](http://bradyholt.github.io/jquery-googleslides/){:target="_blank"}
<div class="google-slides pull-right" style="width:262px; height:176px;" data-userid="115528839112598673902" data-albumid="5710317752556741025" data-imgmax="260"></div>

A jQuery plugin to display your Google Photos, including Picasa and Google+ albums in a slideshow format.  It supports photo captions, scaling, randomization, and other useful options.  There is an easy to use WordPress plugin available as well.

*First Release: February 2012*

[Project Page](http://bradyholt.github.io/jquery-googleslides/) [Blog Post](/jquery-googleslides-project/){:target="_blank"}

### [Bento Budget](http://www.bentobudget.com){:target="_blank"}
![Alt text](/media/logo-small.png){: .pull-right }

A web-based envelope budgeting application.  This app is built in Rails 3, Bootstrap, MySQL and has a backend REST service built in C# / [Nancy](http://nancyfx.org/){:target="_blank"}.

*First Release: December 2013*

[Website](http://www.bentobudget.com/) [Blog Post](/bento-budget/){:target="_blank"}

### [Cron Expression Descriptor](http://bradyholt.github.io/cron-expression-descriptor/){:target="_blank"}
<div class="pull-right" style="height: 50px; width: 300px;">
  <pre>*/5 * * * * -&gt; "Every 5 minutes"</pre>
</div>

A C# library that converts cron expressions into localized human readable strings.  It is available as a NuGet package.

[![Build Status](https://img.shields.io/travis/bradyholt/cron-expression-descriptor.svg?branch=master){:class="no-margin"}](https://travis-ci.org/bradyholt/cron-expression-descriptor)
[![NuGet Version](https://img.shields.io/nuget/v/CronExpressionDescriptor.svg){:class="no-margin"}](https://www.nuget.org/packages/CronExpressionDescriptor/)
[![NuGet Downloads count](https://img.shields.io/nuget/dt/CronExpressionDescriptor.svg){:class="no-margin"}](https://www.nuget.org/packages/CronExpressionDescriptor/)

*First Release: December 2011*

[Project Page](http://bradyholt.github.io/cron-expression-descriptor/) [NuGet Package](https://www.nuget.org/packages/CronExpressionDescriptor/){:target="_blank"}

### [PicasaWebSync](http://bradyholt.github.io/picasawebsync/){:target="_blank"}
<div class="pull-right" style="height: 50px; width: 375px;">
  <pre>
  picasawebsync.exe "C:\bholt\pics"
    -u:me@gmail.com -p:S@cret</pre>
</div>

A command line tool to synchronize local photos and videos to online Picasa Web Albums.

*First Release: April 2011*

[Project Page](http://bradyholt.github.io/picasawebsync/) [Blog Post](/picasawebsync-project){:target="_blank"}

### [vistaicm-server](https://github.com/bradyholt/vistaicm-server){:target="_blank"}
![vistaicm-server](https://raw.github.com/bradyholt/vistaicm-server/gh-pages/screenshot.png){: .pull-right }

A Node.js app that works with the VISTA-ICM module to control VISTA (10/15/20/21/50/128/250) alarm panels. It provides a clean web interface and event handling through a hook architecture.<br /> <em>First Release: August 2013</em>

[Project Page](https://github.com/bradyholt/vistaicm-server/) [Blog Post](/vistaicm-server){:target="_blank"}



<link href="/lib/googleslides/jquery.googleslides.css" rel="stylesheet" type="text/css" />
 <script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>
 <script src="/lib/googleslides/jquery.googleslides.js" type="text/javascript"></script>
 <script>
  $(document).ready(function(){
    $('.google-slides').each(function(index) {
      var options = {
         userid: $(this).attr('data-userid'),
         albumid: $(this).attr('data-albumid'),
         imgmax: $(this).attr('data-imgmax'),
         maxresults: 100
      };

      $(this).googleslides(options);
    });
  });
 </script>
