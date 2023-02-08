---
title: Taking ASP.NET Core Blazer for Spin
---

I had a problem.

![403 Error](/net-core-blazer/403-error.png)

My open source library, [Cron Expression Descriptor](https://github.com/bradymholt/cron-expression-descriptor), has a [demo site](https://bradymholt.github.io/cron-expression-descriptor/) so that users can find and learn about the library and also use it actually explain cron expressions.  The demo site is an ASP.NET Core website and ~is~ was hosted on Azure.  When I first published the demo site, Azure was a good option for hosting an ASP.NET Core website for free.  Things worked fine for years.

Then users started [opening issues](https://github.com/bradymholt/cron-expression-descriptor/issues/130) saying the demo site had stopped working.  It was usually a 403 error.  I dug in to the Azure console and found that several IP addresses were hitting the demo site _hard_.  One of the neat things about the demo site is that it could be used as an API.  I even documented this with a `curl` example on the page.  But, I never envisioned users using the demo site for production type workflows.  It appeared there were several users doing this and Azure was throttling the site because it exceeded the free tier usage.  I finally figured out how to block some of the IP addresses that were abusing the app and the problem was resolved.

Then, it stopped working again.  Different IP addresses.  More requests.  Ugh.  I didn't have time for this.

So, I thought this would be a great opportunity to learn and play with [ASP.NET Core Blazer](https://docs.microsoft.com/en-us/aspnet/core/blazor/?view=aspnetcore-3.1).  I'd been hearing about this framework for awhile.  There was a lot of excitement about it.  The ability to run .NET Core code in a browser via WebAssembly does indeed seem useful (and cool!).

I followed the [Build your first Blazor app](https://dotnet.microsoft.com/learn/aspnet/blazor-tutorial/intro) tutorial to get started.  Getting up and running after running `dotnet new demo -o BlazorApp` was a breeze.  There was a enough in this demo template to understand how to adapt the Cron Expression Descriptor demo site over.  It was actually easy!

So, I created this PR: [https://github.com/bradymholt/cron-expression-descriptor/pull/135](https://github.com/bradymholt/cron-expression-descriptor/pull/135) to convert the demo site over to Blazer.  Then, I deployed it using [GitHub Pages](https://pages.github.com/).

Now the Cron Expression Descriptor demo site is hosted on the free GitHub pages and runs completely inside a browser using JavaScript and WebAssembly.  No server, no throttling!  Awesome!

Here's the new demo site URL: [https://bradymholt.github.io/cron-expression-descriptor/](https://bradymholt.github.io/cron-expression-descriptor/).
