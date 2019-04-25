---
title: Bento Budget
author: Brady
permalink: /bento-budget/
dsq_thread_id: 2008 http://www.geekytidbits.com/?p=2008
---
Way back in 2005 when my wife and I got married we went to pre-marital counseling and learned we had a bit of a problem in our relationship. Not surprisingly, it had to do with money. I was a so called &#8220;saver&#8221; and she was a so called &#8220;spender&#8221;.  We had different ideas about how spend money and we were counseled to start a budget. The idea of budgeting made my eyes roll, to be honest, because it seemed like such a drag. I figured we should just save as much and spend as little so we didn&#8217;t have to worry about keeping track of everything.

We started keeping the budget with **Excel**.  I had a bunch of worksheets with cross references, crazy complex functions and all.  It was super cool, complex and she hated it.  It didn&#8217;t last long because it was too cumbersome and didn&#8217;t pass the <a href="http://en.wikipedia.org/wiki/Wife_acceptance_factor" target="_blank">WAF</a>.

Then we started Using **Quicken**.  It was great because it integrated with our banks and make transaction entry a breeze.  With its insane amount of features it seemed that it could handle any budget scenario we threw at it.  Things went well for quite awhile but over time we started misusing it.  We wanted to start saving up for things and planning ahead rather than looking at historical reports so we created a concept call &#8220;buckets&#8221; and had a <a href="https://docs.google.com/document/d/1nJ1Bh33jDXUfl_rjs9cbHxHI7J7Or_REopwBRxa5hwM/edit?usp=sharing" target="_blank">two page documented process</a>.  It became a mess.

We realized we were trying to do <a href="http://en.wikipedia.org/wiki/Envelope_system" target="_blank">Envelope Method of budgeting</a> so we looked for a solution that would download our transactions like Quicken but allow us to use the envelope so we found and used a web based program called **<a href="http://www.mvelopes.com/" target="_blank">Mvelopes</a>**.  It was nice.  It was real nice.  It did all we wanted it to. However, it was expensive and sluggish (Flash based).

Being a software developer, I began to think about rolling my own solution.  I had about 3 false starts (C# WinForms, Silverlight, simple HTML app) over the course of a year and couldn&#8217;t settle on a solid direction.  However, I started getting into Rails development and learning more about Javascript frameworks like jQuery so I thought this would be a great opportunity to put these to use so I could really learn them well and make some solid traction with a budgeting app.

Fast-forward 2 years and I had a working Rails based application and was able to migrate off of Mvelopes and begin to use it.  I called it &#8220;Bud-E&#8221; (get it?  Buddy but an E for Envelope?  Yeah, it&#8217;s lame and I ended up changing the name later.)  It was rough around the edges for sure but it worked.  It download transactions from our banks, allowed us to enter transactions, manage envelopes and transfer money between them.  Over the next year, I worked on making it better and somewhere along the way I decided I could make this thing into a commercial, subscription based application.  I saw a market opportunity and thought I might be able to make some money.  I also knew this type of app would have a bigger audience with a SAAS model rather than being an open source project.

Fast forward another year and I finished the polishing and released my first commercial project called &#8220;Bento Budget&#8221;.  <a href="http://en.wikipedia.org/wiki/Bento" target="_blank">Bento</a> is a type of Japanese meal that is partitioned into multiple sections on a plate.  This term seemed to go along with the envelope, &#8220;bucket&#8221; idea where you have different partitions for your money.  It also helped that the bentobudget.com domain was available :).

Under the hood, it&#8217;s a <a href="http://rubyonrails.org/" target="_blank">Rails</a> 3 app that relies heavily on <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>, <a href="http://jquery.com/" target="_blank">jQuery</a>, jQuery UI.  On the server side, I have a C# REST application, utilizing the<a href="http://nancyfx.org/" target="_blank"> Nancy framework</a> that does the financial institution integrations.  For data, I use <a href="http://www.mysql.com/" target="_blank">MySQL</a> with the InnoDB engine.  There is an iOS and Android app, both built using <a href="http://phonegap.com/" target="_blank">PhoneGap</a>.

This project was a lot of fun and a *ton* of work.  I learned many useful things along the way.  I&#8217;ve already had a good bit of interest and usage and am excited to see what the future holds for Bento Budget. Go check it out at <a href="http://www.bentobudget.com" target="_blank">www.bentobudget.com</a>!

&nbsp;

[<img src="/media/bento-website.png" alt="Bento Budget" />][1]

 [1]: /media/bento-website.png
