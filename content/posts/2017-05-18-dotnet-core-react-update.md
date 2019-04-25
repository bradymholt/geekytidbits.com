---
title: Updates to my ASP.NET Core / React SPA Template
author: Brady
permalink: /asp-dotnet-core-react-template-update/
dsq_thread_id: /dotnet-core-react-update
---

A few months back, I threw together an [ASP.NET Core / React SPA template](https://github.com/bradymholt/aspnet-core-react-template) (and blogged about it [here](/asp-dotnet-core-react-template/)) in the process of learning both ASP.NET Core and React.  The initial plan was to just come up with something simple enough to learn some things and then move along.  Although the final result was a simple "Hello World" page, there was a ton of stuff going on behind the scenes.  Things like a PostgreSQL database, Docker, test templates, use of Entity Framework Core, usage of JWT, CSS modules, Webpack Hot Module Replacement, and a full suite of Ansible roles for provisioning and deployment to a server.  It was fun and I learned a lot along the way.

But, with all that I put into the template, I didn't really use React very much at all and some of the libraries I was using both on the .NET Core side and on the front-end side had gotten behind a version or two since I initially created the template.

I thought it would be fun to update the template dependencies (ASP.NET Core 1.1, OpenIddict 1.0, Webpack 2 and TypeScript 2.2, etc.) as well as build out the front-end a bit more so I could learn more about React.

I recorded a video demonstrating the template initially so I decided to record another video showing the updates (below).  Enjoy!

<iframe width="805" height="453" src="https://www.youtube.com/embed/xh5plRGg3Nc" frameborder="0" allowfullscreen></iframe>

## Source

[https://github.com/bradymholt/aspnet-core-react-template](https://github.com/bradymholt/aspnet-core-react-template)