---
title: Updating My ASP.NET Core Template to .NET Core 3.1
---

Back in 2016, I decided to build an ASP.NET Core template app so I could play with the framework and get a feel for working with .NET Core.  It turned out to be a fun process but took a long time!  Admittedly, I took it further than I initially planned to, by adding email functionality, scaffolding tests, building in database migrations, provisioning / deployment with Ansible, and [much more](https://github.com/bradymholt/aspnet-core-react-template#overview-of-stack).  I learned a lot.

It became helpful to some others, to my joy.  I got some contributions, questions, and some link backs to my repository as a reference.  That type of interest and involvement in the open-source community is really what makes it fun and gives me encouragement to keep contributing.

Back in September, [Victor Cardins asked](https://github.com/bradymholt/aspnet-core-react-template/issues/43) if I planned to upgrade the template to .NET 3.0.  It had been awhile since I worked with this project and the idea seemed to be too much to tackle with all the other things I was juggling at the time.  But I had some spare time last week, and a burst of interest, so I decided to take the plunge.  It took longer than I thought it would (of course) but I [finally finished it](https://github.com/bradymholt/aspnet-core-react-template/pull/46).  This upgrade was certainly rougher than than the upgrade from [2.0. to 2.1](https://github.com/bradymholt/aspnet-core-react-template/pull/36) as quite a few foundational APIs have changed.  By far the biggest change was the [deprecation of Microsoft.AspNetCore.SpaServices](https://github.com/aspnet/AspNetCore/issues/12890) because I had to restructure how Webpack was integrated for on-demand bundling and HMR.

## Repository Link

https://github.com/bradymholt/aspnet-core-react-template


