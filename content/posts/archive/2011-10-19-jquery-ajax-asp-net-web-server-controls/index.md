---
title: jQuery, Ajax and ASP.NET Web Server Controls
permalink: /jquery-ajax-asp-net-web-server-controls/
---

I have been a pretty heavy user of the ASP.NET AJAX UpdatePanel. It makes Ajax ridiculously easy. You just drop a ScriptManager and UpdatePanel on a page and you magically have Ajax. But, as I have been paying more and more attention to the resulting page markup and payload size of the XMLHttpRequest / XMLHttpResponse calls, I have been raising my eyebrow. Fire up <a href=&#8221;http://getfirebug.com/&#8221; target=&#8221;_blank&#8221;>FireBugor <a href="http://www.fiddler2.com/fiddler2/" target="_blank">Fiddler</a> and have a look. That&#8217;s a whole bunch of data traveling back and forth just to update a portion of the page. The overhead of the UpdatePanel is very large. I&#8217;ve always thought the UpdatePanel seemed a bit sluggish but deemed it acceptable in light of how easy it is to setup and use. As web applications are getting better and faster each day I have been looking around for another solution that has less overhead but it still easy to use.

Over the last year or so I have been embracing the <a href="http://jquery.com/" target="_blank">jQuery</a> JavaScript library. It generally takes the pain out of JavaScript and has great Ajax support. I have learned to really love it. One of the pain points I ran into with using jQuery with ASP.NET, though, was partial updates of Web Server controls (like a GridView or Repeater). Since server controls are required by ASP.NET to be inside of a form tag in an .aspx page or in a UserControl included on the page, this was problematic as partial updates using <a href=&#8221;http://api.jquery.com/load/&#8221; target=&#8221;_blank&#8221;>jQuery .load()</a> should only contain html fragments. If the fragment contains a form tag then a second form would be added to the parent page DOM and make ASP.NET freak out because there is more than one form on the page. It gets ugly fast.

One way around this would be to use <a href="http://api.jquery.com/jQuery.ajax/" target="_blank">jQuery.ajax()</a> and return xml/json data to the browser, parse it, and manipulate the DOM to update the data. This is painful though and completely defeats the purpose of having server controls at all. If I&#8217;m going to go through the pain of parsing xml/json and rebuilding the DOM elements I might as well skip the server control altogether.

### Solution

I finally came upon a great solution to this problem after searching around and putting 2 and 2 together. Simply drop your Web Server control on an .aspx page, strip all the HTML before and after it (including the form runat=&#8221;server&#8221; tag but leave the <%@ Page directive at the top), and override the System.Web.UI.Page.VerifyRenderingInServerForm method with an empty block. The allows ASP.NET to render the control as an HTML fragment and not throw an exception because it isn&#8217;t contained within a form.

#### Animals.aspx

```html
<%@ Page Language="C#"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Animals</title>
    <script
      type="text/javascript"
      src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"
    ></script>
    <script type="text/javascript">
      var AnimalDataHelper = {
        update: function() {
          $("#animals").html("Loading...");
          $("#animals").load("AnimalDataPartial.aspx");
        }
      };

      $(document).ready(function() {
        AnimalDataHelper.update();
        $("#refresh").click(function() {
          AnimalDataHelper.update();
        });
      });
    </script>
  </head>
  <body>
    <form id="form1" runat="server">
      <input type="button" id="refresh" value="Update" />
      <div id="animals"></div>
    </form>
  </body>
</html>
```

#### AnimalDataPartial.aspx

```html
<%@ Page Language="C#"%>
<script runat="server">
  protected void Page_Load(object sender, EventArgs e)
  {
    List<string> data = new List<string>() { "dog", "cat", "monkey" };
    animalsGrid.DataSource = data;
    animalsGrid.DataBind();
  }

  public override void VerifyRenderingInServerForm(Control control)
  {
    //DO NOT REMOVE THIS METHOD
    //allows web server controls to not be in form runat='server'
  }
</script>
<asp:GridView
  runat="server"
  ID="animalsGrid"
  AutoGenerateColumns="true"
></asp:GridView>
Last Updated: <%=DateTime.Now.ToLongTimeString() %>
```

### Wrapping Up

There you have it. The power of ASP.NET web server controls, jQuery, and Ajax combined. This solution is slightly more work than using an ASP.NET AJAX UpdatePanel but it is <em>much</em> snappier, uses <em>way</em> less data payload in the asynchronous request/response, and gives you more control of things. It&#8217;s a pretty nice combination I must say.
