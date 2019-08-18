---
title: Complex Types in Entity Framework (Code First)
permalink: /complex-types-entity-framework/
---

Last week I gave a [tech talk on Entity Framework][1]. One of the questions that was asked at the end of the talk was how to handle &#8220;complex types&#8221;.   That is, how to get Entity Framework to map data into a container &#8220;child object&#8221; correctly.  A couple of reasons you might want to do this are: to organize your model classes in a cleaner way and also to isolate data for serialization.  For example, if you have a database table called Person that includes address related fields, you might want to create an Address class and have EF map just the address fields in this type.  This gives you flexibility so that, for example, you could serialize the address info to JSON without having to &#8216;ignore&#8217; a bunch of other fields you don&#8217;t want serialized.

I had to dig around a bit to figure out how to get it to work but it is definitely possible.  You just need to:

- Define the complex type class
- Decorate the type with  `[ComplexType]`
- Add a member of this type to the container type (i.e. add Address property to Person class)
- Make sure the type is always instantiated (either at declaration or in constructor).  This seems a bit odd but if you don&#8217;t do this EF will throw an exception at runtime.

The article [Associations in EF Code First CTP5: Part 1 – Complex Types][2] was definitely helpful with understanding this.

Here is a gist demonstrating what it looks like.

_ef-complextypes.cs_

```csharp
public class Person {
  public string FirstName {get;set;}
  public string LastName  {get;set;}
  public Address = new Address();   // << It's important to instantiate Address.
}

[ComplexType]  // <<  This attribute is important.
public class Address {
  public string Address1 {get;set;}
  public string Address2 {get;set;}
  public string City {get;set;}
}

/*Example usage:
   Person p = new Person();
   p.Address.Address1 = "1848 Willow Drive";
   p.Address.Address2 = "Unit 105";
   p.Address.Address1 = "Houston";
*/

/*  Table structure
   dbo.Person
      FirstName varchar(50),
      LastName varchar(50),
      Address1 varchar(50),
      Address2 varchar(50),
      City varchar(50)
*/
```

[1]: /entity-framework-tech-talk/
[2]: http://weblogs.asp.net/manavi/entity-association-mapping-with-code-first-part-1-one-to-one-associations
