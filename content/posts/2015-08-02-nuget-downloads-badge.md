---
title: NuGet Downloads Badges
author: Brady
layout: post
permalink: /nuget-downloads-badges/
---

![NuGet Downloads Badge](/media/nuget-downloads-badge.png#pull-left)
I've been giving a little love to my OSS project [Cron Expression Descriptor](http://cronexpressiondescriptor.azurewebsites.net/) lately by making some updates, pushing a new release and rolling out a newly designed [demo site](http://cronexpressiondescriptor.azurewebsites.net).

![Cron Expression](/media/cron-expression.png#pull-right)
Cron Expression Descriptor is a .NET library that converts cron expressions into human readable strings. It started as a solution to a problem I was facing trying to display cron expressions on a UI to users that most definitely did not and did not want to understand how to interpret them.

I was pleasantly surprised to see it take off and be adopted by the community. It has almost reached 17,000 downloads and has been translated into 11 languages with the help of GitHub Pull Requests submitted by the community. It's been fun to work on this project and I am proud of it.

Wanting to add a download count badge to the GitHub page, I decided to write a simple ASP.NET IHttpHandler to hit the [NuGet Package feed](https://www.nuget.org/), grab the downloads count and then request an SVG badge from [Shields](http://shields.io/). I initially tried hitting the NuGet package feed via a XMLHttpRequest request in the browser but the NuGet Package feed is not [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) friendly so I had to resort to doing it on a server as a pass-through.

Here is the IHttpHandler I ended up with to generate the NuGet Downloads Count badge:

```csharp
using System;
using System.Net;
using System.Web;

namespace NuGetDownloadsBadge
{
    public class BadgeImageHandler : IHttpHandler
    {
        private const string CACHE_KEY_PREFIX = "downloadsCount-";
        private const int CACHE_DURATION_MINUTES = 5;
        private const string NUGET_FEED_URL_FORMAT = "https://www.nuget.org/api/v2/Packages()?$orderby=LastUpdated%20desc&$filter=Id%20eq%20%27{0}%27&$top=1&$select=DownloadCount";
        private const string SHIELDS_BADGE_URL_FORMAT = "http://img.shields.io/badge/nuget-{0}%20downloads-{1}.svg";
        private const string BADGE_DEFAULT_COLOR = "blue";

        public void ProcessRequest(HttpContext context)
        {
            // Grab query parameters and set set defaults
            string id = context.Request.QueryString["id"];
            string color = BADGE_DEFAULT_COLOR;
            if (!string.IsNullOrEmpty(context.Request.QueryString["color"])){
                color = context.Request.QueryString["color"];
            }

            // Check to see if the download counts is already cached
            int count = 0;
            object cachedCount = context.Cache[CACHE_KEY_PREFIX + id];
            if (cachedCount != null)
            {
                //We have a cached count so use it
                count = Convert.ToInt32(cachedCount);
            }
            else
            {
                //We need the downloads count; go get it from NuGet.
                WebClient nugetClient = new WebClient();
                nugetClient.Headers[HttpRequestHeader.Accept] = "application/atom+json,application/json";
                string requestUrl = string.Format(NUGET_FEED_URL_FORMAT, id);

                string oDataResponseRaw = nugetClient.DownloadString(requestUrl);
                dynamic oDataResponseParsed = Newtonsoft.Json.JsonConvert.DeserializeObject(oDataResponseRaw);
                count = oDataResponseParsed.d[0].DownloadCount;

                context.Cache.Add(CACHE_KEY_PREFIX + id, count,
                    null, DateTime.Now.AddMinutes(CACHE_DURATION_MINUTES),
                    System.Web.Caching.Cache.NoSlidingExpiration,
                    System.Web.Caching.CacheItemPriority.Normal,
                    null);
            }

            //Go grab badge image from Shields
            string badgeImageUrl = string.Format(SHIELDS_BADGE_URL_FORMAT, count.ToString("N0"), color);
            WebClient shieldsClient = new WebClient();

            byte[] image = shieldsClient.DownloadData(badgeImageUrl);

            // Respond with our shiny shield badge SVG image
            context.Response.ContentType = "image/svg+xml";
            context.Response.AppendHeader("Content-Length", image.Length.ToString());
            context.Response.AppendHeader("Access-Control-Allow-Origin", "*");
            context.Response.BinaryWrite(image);
            context.Response.End();
        }

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
    }
}
```

It takes an ID query parameter as the NuGet package name and response with an SVG image badge. Easy enough.

<strike>Funny thing, after I went through the <strike>trouble</strike> fun of doing this, I realized the Shields already does this if you use the URL format: https://img.shields.io/nuget/dt/PACKAGE_ID.svg. So, for Cron Expression Descriptor it is [https://img.shields.io/nuget/dt/CronExpressionDescriptor.svg](https://img.shields.io/nuget/dt/CronExpressionDescriptor.svg) which results in this badge: [no longer works]. It was interesting looking at their [JavaScript approach](https://github.com/badges/shields/blob/dafb6ec286926e4aff8c90f1da8b24e7f9410f18/server.js#L2880) and comparing it to my own approach.</strike>

**Update**: After building the module above, I learned Shields.io already had a NuGet downloads badge but it has since stopped working. The good folks at [BuildStats.info](https://buildstats.info/) have one that works great so I am using those now. For example:
![NuGet Downloads Badge](https://buildstats.info/nuget/CronExpressionDescriptor)

Oh well, I reinvented the wheel but it was fun and a learned a few things along the way!
