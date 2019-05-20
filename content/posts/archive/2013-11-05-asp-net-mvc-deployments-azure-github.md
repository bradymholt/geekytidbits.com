---
title: ASP.NET MVC Deployments to Azure via GitHub
author: Brady
permalink: /asp-net-mvc-deployments-azure-github/
dsq_thread_id: 1870 http://www.geekytidbits.com/?p=1870
---

Windows Azure keeps getting better and better.  It&#8217;s been available for over 3 years and most of that time I have glossed over it in favor of Amazon Web Services.  The big discouraging factors for me were cost, limited services and the horrible Silverlight management interface it used to have.  A lot has changed in Azure over the last few years and I continue to be impressed.

They finally dumped the Silverlight management interface and went to a modern (and awesome, actually) HTML5 interface.  It is very functional and has some impressive UX features.  I like it a lot.  Also, Azure has fully embraced **Git**.  To be honest, this surprises me because Microsoft has traditionally been so closed and promoting of their own tool chain (i.e. TFS for source control).  But, this seems to be in line with a broader shift I&#8217;ve seen in the Microsoft Developer Division in recent years.  Kudos to Microsoft because I think this is the right direction.

Anyway, I recently found that you could** tie an Azure website to a GitHub repository for deployments**.  This is way cool because I love me some GitHub and this integration makes deployments so easy.

Here&#8217;s an example of  how you do it:

### Create ASP.NET MVC Solution

Normally you&#8217;ll already have a solution you&#8217;re working with you want to use but for demonstration purposes I will create new ASP.NET MVC 4 Solution called _foo_ and save it locally.

[<img class="wp-image-1876 alignnone" alt="aspmvc4" src="/media/aspmvc4.png" width="613" height="160" />][1]

### Create Git Repository and Push to GitHub

You can (obviously) do this with the Git command line  or one of the [Git GUIs ][2]but you basically just want to init a new local Git repo and push it to a new remote GitHub repo.  I usually start out by going directly to GitHub and creating a new repo and then following the instructions to connect it with a local repo.

[<img class="alignnone  wp-image-1896" alt="azuregithub1" src="/media/azuregithub1.png" width="554" height="383" />][3]

After you create the GitHub repo, there will be a screen that shows how to init a local repo and connect it to your new GitHub repo and it looks similar to this:

```shell
cd C:\dev\foo
git init
git commit -m "first commit"
git remote add origin git@github.com:username/foo.git
git push -u origin master</pre>
```

### Setup new Azure Website

If you know how to use the Azure Management interface then you know this is easy.  Just click &#8220;Web Sites&#8221; on the left bar, then click &#8220;New&#8221; at the bottom left.  Click &#8220;Quick Create&#8221;, give it a name and then you are good to go.  It will initialize and be ready in a matter of seconds.

[<img class="size-full wp-image-1880 alignnone" alt="azurenew" src="/media/azurenew.png" width="504" height="360" />][4][<img class="size-full wp-image-1881 alignnone" style="margin-top: 20px;" alt="azurenewname" src="/media/azurenewname.png" width="653" height="119" />][5]

### Link Azure Website to GitHub

You&#8217;ll want to pull up the new web site you just created and then go to the &#8220;Dashboard&#8221; page.  On the right side under &#8220;quick glance&#8221; you should see an option called &#8220;Setup deployment from source control&#8221;.  Click this, select GitHub as the source and then select your repo.  Follow the screens and your ASP.NET MVC website should be automatically deployed to Azure within seconds. Also, **each time you update the GitHub repo it will trigger a new deployment on Azure!**

[<img class="alignnone size-full wp-image-1887" style="display: block;" alt="azuredashboard" src="/media/azuredashboard.png" width="453" height="174" />][6]

[<img class="size-full wp-image-1888 alignnone" style="display: block;" alt="azuredeployment" src="/media/azuredeployment.png" width="262" height="235" />][7][<img class="alignnone" style="display: block;" alt="azuregithub" src="/media/azuregithub.png" width="491" height="318" />][8][<img class="alignnone size-full wp-image-1889" style="display: block;" alt="azuredeploymentsuccess" src="/media/azuredeploymentsuccess.png" width="613" height="203" />][9]

### A Note About Dependencies

When Azure pulls your source from GitHub and compiles it, it will have to resolve any assembly references.  There are two ways to handle this:

1. **Check your packages folder (from the solution directory) into GitHub &#8211;** This is straight forward and the least issue prone way to handle references.  Just ensure you commit the packages folder which contain all your assembly .dll references.  If all your external dependencies were added from NuGet you should be good to go.  If you have any assembly references that are not in NuGet you can place them in the packages folder directly and change the reference to point to this location.  This way, when Azure compiles your site, all the assembly .dll files will be available in the packages folder and you&#8217;ll be set.
2. **Enable NuGet Package Restore** &#8211; To avoid checking in the packages folder (which could be quite large and go against everything that has been pounded in your head about source control best practices), you can <a href="http://blog.maartenballiauw.be/post/2012/06/07/Use-NuGet-Package-Restore-to-avoid-pushing-assemblies-to-Windows-Azure-Websites.aspx" target="_blank">Enable NuGetPackage Restore</a> which will tell Azure to download package references from NuGet.  You need to make sure and commit the **packages.config **file from your project directory so Azure will know which packages to install.

[1]: /media/aspmvc4.png
[2]: http://git-scm.com/downloads/guis
[3]: /media/azuregithub1.png
[4]: /media/azurenew.png
[5]: /media/azurenewname.png
[6]: /media/azuredashboard.png
[7]: /media/azuredeployment.png
[8]: /media/azuregithub.png
[9]: /media/azuredeploymentsuccess.png
