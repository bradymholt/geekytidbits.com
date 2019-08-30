---
title: WebResource.axd Throwing ArgumentOutOfRangeException
permalink: /webresource-axd-throwing-argumentoutofrangeexception/
---

### Background

I have an ASP.NET web application that uses <a href="http://support.microsoft.com/kb/910442" target="_blank">Web Resources</a> via the WebResource.axd handler to serve up some CSS for my site.  The reason I use this method is because I can place the CSS in a .NET assembly and reuse it across several web applications which comes in handy when several sites need the same styling.

### Problem

Everything was working fine until about a month ago.  Then, I started noticing that when I deployed my website to production the styles were all messed up.  But strangely, it would fix itself after a couple of minutes.  It worked like a charm every time locally but not in production.  Using Firebug I noticed that the calls to the WebResource.axd files were causing a 302 Redirect to GenericErrorPage.htm which obviously means something is going very wrong.  I checked the Application event log in Windows but didn&#8217;t see anything.

After some fiddling around and pulling my hair our for a few hours, I changed the web.config so that debug=&#8221;true&#8221; and noticed some w3wp.exe errors show up in the event log.

```
Process information:
Process ID: 4932
Process name: w3wp.exe
Account name: NT AUTHORITY\NETWORK SERVICE

Exception information:
Exception type: ArgumentOutOfRangeException
Exception message: Specified argument was out of the range of valid values.
Parameter name: utcDate
at System.Web.HttpCachePolicy.UtcSetLastModified(DateTime utcDate)
at System.Web.Handlers.AssemblyResourceLoader.System.Web.IHttpHandler.ProcessRequest(HttpContext context)
at System.Web.HttpApplication.CallHandlerExecutionStep.System.Web.HttpApplication.IExecutionStep.Execute()
at System.Web.HttpApplication.ExecuteStep(IExecutionStep step, Boolean& completedSynchronously)</pre>
```

_utcDate, UtcSetLastModified &#8211;_ _huh?_

### Solution

Noticing the event log entry seemed related to dates in some way _(utcDate, UtcSetLastModified, etc.)_ I took a look at the system clock on my build server (where the assemblies are built) and compared to my production machine.  Sure enough, my build server&#8217;s clock was fast by about 5 minutes.  After reading around I found that WebResource.axd uses caching and relies upon a querystring parameter (&#8220;t&#8221;) to determine if it needs to re-cache or serve from existing cache.  If the request time parameter is in the future (dictated by your assembly build time), it gets confused and throws an exception.

**Bottom line:** Syncing the clocks on my build server and production server fixed the issue.
