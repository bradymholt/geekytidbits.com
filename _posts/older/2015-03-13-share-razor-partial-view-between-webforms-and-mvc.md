---
title: Share Razor Partial View between WebForms and MVC
author: Brady
layout: post
permalink: /share-razor-partial-view-between-webforms-and-mvc/
dsq_thread_id: 2154 http://www.geekytidbits.com/?p=2154
---

ASP.NET MVC is a breath of fresh air for anyone with a background in ASP.NET WebForms. It&#8217;s cleaner, supports the Razor view engine, is much(!) easier to test, doesn&#8217;t have the nasty viewstate baggage and generally just feels better. It&#8217;s pretty great that you can use it in older webapps as well by [Integrating ASP.NET MVC into an existing ASP.NET Webforms application][1]. That&#8217;s pretty cool but when you do this, you&#8217;ll inevitably have view content that you need to share between WebForms and MVC pages. A perfect example of this is a navigation bar or page footer in MasterPages / MVC Layouts. It&#8217;s tempting to assume these two ASP.NET paradigms don&#8217;t play together and to just have a Razor version and a separate WebForms (ASPX) version that are synced up manually.

However, they _can_ play together and you can share view content between them if you use a Razor partial view and some bridge code to shim out a wrapper around the WebForms/ASPX HttpContext. The technique was posted on Stack Overflow [here][2] and I have been using it successfully in some projects. I consider it a pretty big deal that you can do this as it makes migrating to ASP.NET MVC much more feasible in a legacy web application. I&#8217;ve gisted an example to show how&#8217;s it&#8217;s done:

{% gist bradymholt/d323c01c119a4ef68dfb %}

[1]: http://www.codebureau.com/asp-net/integrating-asp-net-mvc-into-an-existing-asp-net-webforms-application/
[2]: http://stackoverflow.com/questions/702746/how-to-include-a-partial-view-inside-a-webform/1074061#1074061
