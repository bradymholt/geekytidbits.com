---
title: Efficient Client-side Caching of Dynamic Resource Handlers in ASP.NET
author: Brady
layout: post
permalink: /efficient-caching-dynamic-resources-asp-net-304-not-modified/
dsq_thread_id: 1122 http://www.geekytidbits.com/?p=1122
---

### **Problem**

You have some type of dynamic resource, like an image, you are serving up with an IHttpHandler (.ashx page) in ASP.NET.  You want the client browser to cache the resource locally but also be able to know when it has been updated server-side so it can fetch the latest version.

### **Options**

You could add the following lines to tell the client to cache the resource for only 1 hour and then after that ask the server for the latest version:

#### Limited Duration Cache

```csharp
context.Response.Cache.SetCacheability(HttpCacheability.Public);
context.Response.Cache.SetExpires(DateTime.Now.AddHours(1));
```

But what if you want clients to fetch the latest after a change has been made rather than waiting an hour?  For instance, if you are serving a logo or thumbnail that must be up-to-date on the client.  In my particular case, I have a web application that has different &#8220;branding&#8221;, including a company logo, depending on the current Url.  When I am setting up a new brand or changing the logo on an existing brand I want clients to know they need to get the latest and greatest right away.  So, another option to accomplish this would be to tell the client to not cache the resource at all, and fetch the latest from the server every time it needs it:

#### No Cache

```csharp
context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
```

But, come on.  That&#8217;s not efficient and is just silly.

###  A Better Approach &#8211; 304 Not Modified

ASP.NET has some good tools for server-side caching (data cache, output cache, static variables, etc.) but when it comes to fine-tune controlling the HTTP  response headers the client uses to determine how to cache a resource client-side, things get *confusing* fast.

Anyway, a better way to approach this is to respond to the client&#8217;s initial request for the resource with the following HTTP headers:

```
Cache-Control:public, must-revalidate, max-age=0
Last-Modified:Sun, 10 Jun 2012 20:19:21 GMT
```

This tells the browser to cache the resource but ask the server each time it needs to use it if it has changed. When it asks the server if it has changed, it will take the date specified in the Last-Modified header and send it to the server. Basically, the client will say to the server &#8220;Hey, I have a resource you previously gave me, dated &#8220;Sun, 10 Jun 2012 20:19:21 GMT&#8221;; is there a newer version available? If so send it to me. If not, just tell me there is not a newer version and I will use my locally cached copy. Thanks, have a good day.&#8221; If the server knows the resource has changed since the Last-Modified date it will send the newer copy to the client, just as it did initially. If it has not changed, it will respond with a simple &#8220;304 Not Modified&#8221; HTTP response, and not include the resource data in the response. This 304 response is extremely small in size so it should return very quickly.

This approach has the advantage that it still lets the client leverage its cache for performance gains but leaves the server in control of whether or not the client should show a newer version.

#### A Working Example

Below is a full-blown ASP.NET working example that demonstrates how to write the correct headers and respond with a 304 Not Modified response. Note: ImageContainer shown below is an arbitrary type containing an image I defined elsewhere in my own solution. In your case, you might be storing your image in a different way but the only thing that matters is being able to determine a timestamp (UpdatedAtUTC property in my case) so you know if the image has changed. If, for example, you are using handling an image stored on the server filesystem you might use something like File.GetLastWriteTime(@&#8221;c:\\images\\myimage.png&#8221;) to get the timestamp.

```csharp
public class MyImageResourceHandler : IHttpHandler, IReadOnlySessionState
{
 public void ProcessRequest(HttpContext context)
 {
  //ImageContainer is an arbitrary type that contains image data
  ImageContainer myImage = (ImageContainer)context.Session["myImage"];
  DateTime? ifModifiedSinceTime = GetIfModifiedSinceUTCTime(context);
  DateTime imageLastModifiedTime = myImage.UpdatedAtUTC
  //strip milliseconds before comparison
  imageLastModifiedTime = imageLastModifiedTime.AddMilliseconds(-myImage.UpdatedAtUTC);
  bool clientNeedsLatest = ifModifiedSinceTime == null || (imageLastModifiedTime &gt; ifModifiedSinceTime);

  if (clientNeedsLatest)
  {
    //write latest image to response
    context.Response.BinaryWrite(myImage.ImageBinary);
    context.Response.ContentType = myImage.MimeType;
    context.Response.AddHeader("content-disposition", string.Concat("inline; filename=", myImage.FileNam

    //tell client to cache
    context.Response.Cache.SetCacheability(HttpCacheability.Private);
    context.Response.Cache.SetRevalidation(HttpCacheRevalidation.AllCaches);
    context.Response.Cache.SetLastModified(imageLastModifiedTime);

    //set age/expires so that client doesn't attempt to use cache
    context.Response.Cache.SetMaxAge(new TimeSpan(0, 0, 0)); //max-age=0
    context.Response.Cache.SetExpires(DateTime.Now.ToUniversalTime());
  }
  else {
    //tell the client the image has not changed!
     context.Response.ClearContent();
     context.Response.StatusCode = (int)System.Net.HttpStatusCode.NotModified;
     context.Response.SuppressContent = true;
  }
 }

 private DateTime? GetIfModifiedSinceUTCTime(HttpContext context)
 {
  DateTime? ifModifiedSinceTime = null;
  string ifModifiedSinceHeaderText = context.Request.Headers.Get("If-Modified-Since");

  if (!string.IsNullOrEmpty(ifModifiedSinceHeaderText))
  {
    ifModifiedSinceTime = DateTime.Parse(ifModifiedSinceHeaderText);
   //DateTime.Parse will return localized time but we want UTC
   ifModifiedSinceTime = ifModifiedSinceTime .Value.ToUniversalTime();
  }

  return ifModifiedSinceTime;
 }

 public bool IsReusable { get { return false; } }
}
```
