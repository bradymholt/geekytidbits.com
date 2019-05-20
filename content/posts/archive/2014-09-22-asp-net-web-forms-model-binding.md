---
title: ASP.NET Web Forms Model Binding
author: Brady
permalink: /asp-net-web-forms-model-binding/
dsq_thread_id: 2023 http://www.geekytidbits.com/?p=2023
---

I prefer to work with ASP.NET **MVC** but currently work with a hybrid code base that includes plenty of **Web Forms** pages laying around.  One of the nice new features ASP.NET 4.5 brought to the Web Forms world is called Model Binding.  This makes binding data to a form very clean and plays nicely with Entity Framework, Code First.  It took some reading and experimenting to get up to speed with it so I created a Gist (below) that demonstrates a simple example of using Model Binding to populate a GridView.  Note that sorting / paging are built-in automatically and I am passing a TextBox field in for filtering the results.

_Demo.aspx_

```html
 <asp:TextBox runat="server" ID="txtSearch"></asp:TextBox>
 <!-- This GridView has automatic paging/sorting built-in -->
 <asp:GridView runat="server" ID="gvDemo"
            ItemType="Person" SelectMethod="gvDemo_GetData"
            AutoGenerateColumns="false"
            AllowPaging="true" PageSize="25"
            AllowSorting="true">
    <Columns>
        <asp:BoundField DataField="FirstName" HeaderText="First Name" SortExpression="FirstName" />
        <asp:BoundField DataField="LastName" HeaderText="Last Name" SortExpression="LastName" />
    </Columns>
</asp:GridView>
```

_Demo.aspx.cs_

```csharp
 public partial class DemoPage : System.Web.UI.Page
{
  public IQueryable<Person> gvDemo_GetData([Control("txtSearch")] string search)
  {
    //NOTE: do not dispose (i.e. using statement) PersonContext b/c the View will enumerate the IQueryable
    var context = new PersonContext();
    IQueryable<Person> query = context.People.OrderBy(p => p.LastName);
    if (!string.IsNullOrEmpty(search))
    {
      query = query.Where(p => p.LastName.Contains(search));
    }
    return query;
  }
}
```

_Person.cs_

```csharp
public class Person {
  public string FirstName {get;set;}
  public string LastName { get;set;}
}
```

_PersonContext.cs_

```csharp
public class PersonContext:DbContext{
  public DbSet<Person> People
}
```
