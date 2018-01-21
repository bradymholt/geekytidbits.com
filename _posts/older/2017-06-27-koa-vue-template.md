---
title: Koa / Vue.js SPA Template
author: Brady
layout: post
permalink: /koa-vue-template/
---

A few months back, I tackled building an [ASP.NET Core / React SPA template](/asp-dotnet-core-react-template-update/).  Then, wanting to play with Vue.js, I created [another template](https://github.com/bradymholt/aspnet-core-vuejs-template) with the same ASP.NET Core backend but switched out the frontend with Vue.js.  Those templates were fun to build and I learned quite a few things along the way.

I really enjoyed working with Vue.js and have recently been wanting to play around with [Koa 2](http://koajs.com/), especially since it works with async/await out of the box.  So, I decided to use the Vue.js frontend I had swapped out previously and to swap out the ASP.NET Core backend with Koa.

Ok, let's summarize my crazy templating activity lately because it's gotten a little complicated:

|          | Template 1                                              | Template 2                                              | Template 3                                      |
|----------|---------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------|
| **Backend**  | ASP.NET Core                                            | ASP.NET Core                                            | Koa 2/Node                                        |
| **Frontend** | React                                                   | Vue.js                                                  | Vue.js                                          |
|          | [Link](https://github.com/bradymholt/aspnet-core-react-template) | [Link](https://github.com/bradymholt/aspnet-core-vuejs-template) | [Link](https://github.com/bradymholt/koa-vuejs-template) |

Using the same basic _functionality_ for the templates and swapping out the frameworks/languages used has turned out to be effective for learning because I have been able to focus on the ins-and-outs of the technology I am working with instead of getting caught up on the functionality of the app.  Also, it's been fun comparing the implementation differences bettwen them.  For example, setting up JWT authentication with Koa 2/Node was a cake walk compared with getting it to work in ASP.NET Core!

Now, about the Koa / Vue template.  It took about a week to knock out and I _really_ enjoyed working with both Koa and Vue.js.  As part of scaffolding the Koa app, I came across [TypeORM](https://github.com/typeorm/typeorm) which is in alpha currently but is a really nice TypeScript based ORM that works well with PostgreSQL.  Also, by the same talented developer ([Umed Khudoiberdiev](https://github.com/pleerock)), I used [routing-controllers](https://github.com/pleerock/routing-controllers) which takes advantage of TypeScript decorators to build really clean Koa controllers.  Using this library  _feels_ like setting up ASP.NET Core controllers, which I consider a good thing.

Here is what the app _looks_ like:

![Koa Vue Template](/media/spa-template.gif){: .block }

Here is a survey of all the tools, technologies, concepts, etc. that went into this template project.  Admittedly, I didn't _have_ to use all of these but it was fun to do so and I learned a lot.

## Server

<ul class="condensed">
<li>Koa 2</li>
<li>PostgresSQL</li>
<li>TypeScript</li>
<li>TypeORM (data-mapper ORM)</li>
<li>routing-controllers (decorated, class-based controllers in Koa)</li>
<li>Docker used for development PostgresSQL database and MailHog server</li>
</ul>

## Client

<ul class="condensed">
<li>Vue.js</li>
<li>Single-file components (.vue)</li>
<li>TypeScript</li>
<li>Webpack for asset bundling and HMR (Hot Module Replacement)</li>
<li>Bootstrap CSS</li>
<li>Fetch API for REST requests</li>
</ul>

## Testing

<ul class="condensed">
<li>Mocha</li>
<li>Chai</li>
<li>TypeScript</li>
<li>MailHog for development email delivery</li>
</ul>

## DevOps

<ul class="condensed">
<li>Ansible playbook for provisioning (Nginx reverse proxy, SSL via Let's Encrypt, PostgresSQL backups to S3)</li>
<li>Ansible playbook for deployment</li>
</ul>

## Source

Here is the GitHub repo with the template source: [https://github.com/bradymholt/koa-vuejs-template](https://github.com/bradymholt/koa-vuejs-template)
