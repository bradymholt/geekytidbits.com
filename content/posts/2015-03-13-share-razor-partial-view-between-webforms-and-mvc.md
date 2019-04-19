---
title: Share Razor Partial View between WebForms and MVC
author: Brady
layout: post
permalink: /share-razor-partial-view-between-webforms-and-mvc/
dsq_thread_id: 2154 http://www.geekytidbits.com/?p=2154
---

ASP.NET MVC is a breath of fresh air for anyone with a background in ASP.NET WebForms. It&#8217;s cleaner, supports the Razor view engine, is much(!) easier to test, doesn&#8217;t have the nasty viewstate baggage and generally just feels better. It&#8217;s pretty great that you can use it in older webapps as well by [Integrating ASP.NET MVC into an existing ASP.NET Webforms application][1]. That&#8217;s pretty cool but when you do this, you&#8217;ll inevitably have view content that you need to share between WebForms and MVC pages. A perfect example of this is a navigation bar or page footer in MasterPages / MVC Layouts. It&#8217;s tempting to assume these two ASP.NET paradigms don&#8217;t play together and to just have a Razor version and a separate WebForms (ASPX) version that are synced up manually.

However, they _can_ play together and you can share view content between them if you use a Razor partial view and some bridge code to shim out a wrapper around the WebForms/ASPX HttpContext. The technique was posted on Stack Overflow [here][2] and I have been using it successfully in some projects. I consider it a pretty big deal that you can do this as it makes migrating to ASP.NET MVC much more feasible in a legacy web application. I&#8217;ve gisted an example to show how&#8217;s it&#8217;s done:

_00_Partial.cshtml_

```csharp
@model PartialViewModel
<h1>Hello World</h1>
<p>
    I was rendered from a <strong>@Model.Source</strong>!
</p>
```

_01_RazorPartialBridge.cs_

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

//Reference: http://stackoverflow.com/a/1074061/626911
public class RazorPartialBridge
{
    public class WebFormShimController : Controller { }
    public static void RenderPartial(string partialName, object model)
    {
        //get a wrapper for the legacy WebForm context
        var httpCtx = new HttpContextWrapper(System.Web.HttpContext.Current);

        //create a mock route that points to the empty controller
        var rt = new RouteData();
        rt.Values.Add("controller", "WebFormShimController");

        //create a controller context for the route and http context
        var ctx = new ControllerContext(
            new RequestContext(httpCtx, rt), new WebFormShimController());

        //find the partial view using the viewengine
        var view = ViewEngines.Engines.FindPartialView(ctx, partialName).View;

        //create a view context and assign the model
        var vctx = new ViewContext(ctx, view,
            new ViewDataDictionary { Model = model },
            new TempDataDictionary(), httpCtx.Response.Output);

        //render the partial view
        view.Render(vctx, System.Web.HttpContext.Current.Response.Output);
    }
}
```

_02_Demo.aspx_

```csharp
<%@ Page Title="Demo" Language="C#"
    AutoEventWireup="true" Inherits="Demo" Codebehind="Demo.aspx.cs" %>
<html>
<head></head>
<body>
    <% RazorPartialBridge.RenderPartial("_Partial", new PartialViewModel() { Source = "ASPX Page" }) %>
</body>
</html>
```

_03_Demo.cshtml_

```csharp
<html>
<head></head>
<body>
     @{ Html.RenderPartial("_Partial", new PartialViewModel() { Source = "Razor View" }); }
</body>
</html>
```

[1]: http://www.codebureau.com/asp-net/integrating-asp-net-mvc-into-an-existing-asp-net-webforms-application/
[2]: http://stackoverflow.com/questions/702746/how-to-include-a-partial-view-inside-a-webform/1074061#1074061
