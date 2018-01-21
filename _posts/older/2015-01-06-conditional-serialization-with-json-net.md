---
title: Conditional Serialization with Json.NET
author: Brady
layout: post
permalink: /conditional-serialization-with-json-net/
dsq_thread_id: 2041 http://www.geekytidbits.com/?p=2041
---

In ASP.NET MVC, I typically use [View Models][1] along with the [Json.NET][2] library to get JSON back to the client.  When I want some members to be omitted from serialization I will simply add the [JsonIgnore] attribute to the target property.  This works great for static omission but sometimes I come across the need to perform _conditional _(i.e. at runtime) omission.  To do this, you can use the largely undocumented **[bool *ShouldSerialize{MemberName}()] \***approach.

Simply add a bool return method named ShouldSerialize{MemberName} to the model class.  The {MemberName} portion of the name should match the member name that will be conditionally omitted.  Json.NET will check for the existence of this method and conditionally serialize the corresponding member value.  I also like to use an additional property (with [JsonIgnore]) that I set externally which is used by the ShouldSerialize methods.  In the example below, this property is called _SerializeSensitiveInfo._

```csharp
public class UserViewModel {

  public string FirstName {get;set;}
  public string LastName {get;set;}
  public string Username {get;set;} //conditional serialization!
  public string SecurityQuestion {get;set;} //conditional serialization!

  public bool ShouldSerializeUsername(){
    //only serialize Username if SerializeSensitiveInfo == true
    return (this.SerializeSensitiveInfo);
  }

  public bool ShouldSerializeSecurityQuestion(){
    //only serialize SecurityQuestion if SerializeSensitiveInfo == true
    return (this.SerializeSensitiveInfo);
  }

  [JsonIgnore]
  public bool SerializeSensitiveInfo {get;set;} //this property allows control of serialization at runtime
}
```

[1]: http://lostechies.com/jimmybogard/2012/04/10/asp-net-web-api-mvc-viewmodels-and-formatters/
[2]: http://james.newtonking.com/json
