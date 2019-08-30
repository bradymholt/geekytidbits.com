---
title: AutoMapper With DataTables
permalink: /automapper-with-datatables/
---

When working with data in .NET, I almost always prefer to work with <a href="http://stackoverflow.com/questions/250001/poco-definition" target="_blank">POCO</a> domain objects rather than some type of heavy abstraction layer.  Advantages are many including custom validation, encapsulated business logic and full control and flexibility of what is going on with the entity.  And, using LINQ queries against simple objects is dead easy.

Sometimes I come across an existing system that is using DataTables and DataSets exclusively for handling data and I don't really have time to convert the data access layer over to using  domain objects.  Fortunately I came across a way to use the nice AutoMapper mapping library to convert a DataTable into a POCO entity very easily.  You just need to:

* Add a reference to <a href="https://github.com/AutoMapper/AutoMapper" target="_blank">AutoMapper</a>.  You can manually download and reference the .dll or simply install via NuGet by issuing **Install-Package AutoMapper** from the Package Manager Console (Tools->Library Package Manager).
* Create a class that has property names that match the column names in your source DataTable.

  ```csharp
  public class Person {
    public string First_Name { get; set; }
    public string Last_Name { get; set; }
    public string User_Name { get; set; }
  }
  ```

* Use the the following syntax to fire up a `List<Person>`.

  ```csharp
  List<Person> people = AutoMapper.Mapper.DynamicMap<IDataReader, List<Person>>(
  sourceDataTable.CreateDataReader());
  ```

There you have it.  Now you can go encapsulate some domain specific logic / rules into your domain object (i.e. read-only properties that have domain logic, etc.), run LINQ queries to filter the list, and anything else your heart desires.  It really gives you a lot more power than sticking with a DataTable.
