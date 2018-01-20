---
title: ASP.NET Web Forms Model Binding
author: Brady
layout: post
permalink: /asp-net-web-forms-model-binding/
dsq_thread_id: 2023 http://www.geekytidbits.com/?p=2023
---

I prefer to work with ASP.NET **MVC** but currently work with a hybrid code base that includes plenty of **Web Forms** pages laying around.  One of the nice new features ASP.NET 4.5 brought to the Web Forms world is called Model Binding.  This makes binding data to a form very clean and plays nicely with Entity Framework, Code First.  It took some reading and experimenting to get up to speed with it so I created a Gist (below) that demonstrates a simple example of using Model Binding to populate a GridView.  Note that sorting / paging are built-in automatically and I am passing a TextBox field in for filtering the results.

{% gist bradymholt/a8b0604846f96e9fca95 %}
