---
title: ASP.NET Core / React SPA Template
permalink: /asp-dotnet-core-react-template/
---

**Update** - I have updated this template and [wrote about it here](/asp-dotnet-core-react-template-update/).


A few weeks ago, I really wanted to build something new.  As I tweeted, I really wanted to build something as an excuse to play with some new tools.  There are so many languages, frameworks, tools out there today for building software!

![Twitter Post](dotnet-core-react-twitter.png)

On the one hand, it is a bit overwhelming to keep track of all of this stuff and attempt to stay aware of it all.  On the other hand, it's tons of fun to play with different things.

Anyway, I bounced around some ideas, played with a few things and recalled my mental "I want to play with this" backlog and settled on building a SPA: [ASP.NET Core](https://docs.asp.net/en/latest/intro.html) on the server side for JSON/REST API and React as a web client.  As I started setting up things, the application in particular quickly took a backseat to the technology stack setup itself.  You know, getting the foundation laid with a skeleton/template project.  That's ok, it was fun and I learned a bunch of new things along the way.  I ended up building a template project to build stuff with going forward.  Here's the repository: [https://github.com/bradymholt/aspnet-core-react-template](https://github.com/bradymholt/aspnet-core-react-template).

A few observations I had after going through the setup process:

* Web development has changed a lot in the last 5 years
* Web development has gotten a lot more complex in the last 5 years
* There is a ton of stuff to learn (and re-learn) to get a web application up and running

On that last point, just look at this survey of all the tools, technologies, concepts, etc. that went into my template project.  Admittedly, I didn't have to employ all of these but I do think this is a pretty realistic modern day web stack setup.

## Server

<ul class="condensed">
<li>.NET Core</li>
<li>ASP.NET Core</li>
<li>Entity Framework Core</li>
<li>Entity Framework Migrations</li>
<li>OpenIddict (for JWT auth)</li>
<li>REST</li>
<li>PostgresSQL</li>
<li>Docker for development PostgresSQL database</li>
</ul>

## Web / Client
<ul class="condensed">
<li>Node.js / npm</li>
<li>Webpack</li>
<li>HMR (Webpack Hot module Replacement)</li>
<li>Stylus/CSS</li>
<li>CSS Modules</li>
<li>TypeScript</li>
<li>React</li>
<li>Flux</li>
<li>React Router</li>
</ul>

## Testing
<ul class="condensed">
<li>xUnit for .NET Core</li>
<li>Enzyme/Mocha/Chai for React</li>
</ul>

## DevOps
<ul class="condensed">
<li>Ansible</li>
<li>Docker</li>
<li>Let's Encrypt (for SSL certs)</li>
<li>PostgresSQL</li>
<li>Nginx</li>
<li>Supervisor (supervisord)</li>
<li>Digital Ocean</li>
</ul>

Wow, that's a lot of stuff!  The end result though, is a pretty solid template to build apps with.  Just about everything is baked in including asset bundling, database migrations, testings, DevOps scripts for provisioning and deployment.  Also, the ASP.NET Core SpaServices support for Webpack HMR feels very productive: just fire up the server with `npm start` and everythng just works.

## Demo

If a picture is worth a thousand words, a video is worth a million, right?  Rather than walking through everything with a bunch of words and screenshots, I think a video might be best suited for showing the pieces to this template.

<iframe width="805" height="453" src="https://www.youtube.com/embed/jyuLAizmg3U" frameborder="0" allowfullscreen></iframe>

## Source

[https://github.com/bradymholt/aspnet-core-react-template](https://github.com/bradymholt/aspnet-core-react-template)
