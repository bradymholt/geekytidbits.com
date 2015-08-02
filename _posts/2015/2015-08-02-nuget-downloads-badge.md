---
title: NuGet Downloads Badges
author: Brady
layout: post
permalink: /nuget-downloads-badges
---
![NuGet Downloads Badge](/media/nuget-downloads-badge.png){: .pull-left }
I've been giving a little love to my OSS project [Cron Expression Descriptor](https://github.com/bradyholt/cron-expression-descriptor) lately by making some updates, pushing a new release and rolling out a newly designed [demo site](cronexpressiondescriptor.azurewebsites.net).  

![Cron Expression](/media/cron-expression.png){: .pull-right }
Cron Expression Descriptor is a .NET library that converts cron expressions into human readable strings.  It started as a solution to a problem I was facing trying to display cron expressions on a UI to users that most definitely did not and did not want to understand how to interpret them.

I was pleasantly surprised to see it take off and be adopted by the community.  It has almost reached 17,000 downloads and has been transalted into 11 languages with the help of GitHub Pull Requests submitted but the community.  It's been fun to work on this project and I am proud of it.

Wanting to add a download count badge to the GitHub page, I decided to write a simple ASP.NET IHttpHandler to hit the [NuGet Package feed](https://www.nuget.org/), grab the downloads count and then request an SVG badge from [Shields](http://shields.io/).  I initially tried hitting the NuGet package feed via a XMLHttpRequest request in the browser but the NuGet Package feed is not [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) friendly so I had to resort to doing it on a server as a pass-through.

Here is the IHttpHandler I ended up with to generate the NuGet Downloads Count badge:

{% gist bradyholt/08b9d9ce29b95cb93989 %}

It takes an ID query parameter as the NuGet package name and response with an SVG image badge.  Easy enough.

**Funny thing**, after I went through the <strike>trouble</strike> fun of doing this, I realized the Sheilds already does this if you use the URL format: https://img.shields.io/nuget/dt/PACKAGE_ID.svg.  So, for Cron Expression Descriptor it is [https://img.shields.io/nuget/dt/CronExpressionDescriptor.svg](https://img.shields.io/nuget/dt/CronExpressionDescriptor.svg) which results in this badge: ![NuGet Downloads Badge](https://img.shields.io/nuget/dt/CronExpressionDescriptor.svg){: .no-margin}.  It was interesting looking at their [JavaScript approach](https://github.com/badges/shields/blob/dafb6ec286926e4aff8c90f1da8b24e7f9410f18/server.js#L2880) and comparing it to my own approach. 

Oh well, I reinvented the wheel but it was fun and a learned a few things along the way!
