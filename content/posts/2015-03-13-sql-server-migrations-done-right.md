---
title: SQL Server Migrations Done Right
author: Brady
permalink: /sql-server-migrations-done-right/
dsq_thread_id: 2186 http://www.geekytidbits.com/?p=2186
---
When working in the .NET / SQL Server world, I&#8217;ve always been envious of [Rails Active Record Migrations][1].  It seems there is no great way to handle migrations with SQL Server.  Sure, there are some tools out there but it seems all of them leave something to be desired.  Specifically:

  * [SQL Server Database Projects][2] in Visual Studio is a full featured database solution but unfortunately takes a [&#8220;State&#8221; approach][3] to keeping databases up to date.  For one-off sync scenarios it is a perfect solution but for incremental database changes it is less than ideal.  In my opinion (and in my experience) this is a problematic approach because many changes to databases are *transitional *rather than *stateful* in nature.
  * [Entity Framework Code First Migrations][4] is fairly solid migration framework but unfortunately only works for objects that have an Entity Framework DbContext defined for.  If you are working with an existing, large database where EF is not used throughout, you are out of luck.  Also, it does not work with Stored Procedures.
  * [RoundhousE][5] is another full featured solution that is well thought out but I find it a bit cumbersome to work with and think it is overly complex in nature.  It lacks Package Manager Console scripts and is a little tricky to integrate into a deployment process.

**Then I came across [DbUp][6].**  DbUp is great because it&#8217;s simple, uses the *transitional* approach and is easy to integrate into a deployment tool like [Octopus Deploy][7].  What it lacks in features it more than makes up for in doing 95% of the things I care about well.  However, there were a couple of things it lacked which I thought could really make it perfect: (1) Package Manager Console scripts and (2) Object Scripting.

## Package Manager Console scripts

I thought if there were a couple of simple Package Manager Console scripts, (1) one to create a new timestamped migration script, mark it as an Embedded Resource, and add it to the project and (2) a script to run the DbUp console application and migrate the database, the DbUp process would be much more streamlined.

## Object Scripting

When I presented DbUp to my team at work and pitched it as a viable option for our database migrations, the biggest piece of feedback I got was the need to have object definitions scripted at the time the migrations run.  With Active Record Migrations in Rails, when you run *db:migrate*, after the migrations are applied, *db:schema:dump *is automatically called which updates your *`db/schema.rb` * file.  This file has the object definitions for your database.  As you run migrations, your schema.rb file gets updated which enables versioning of your schema, clear diffs for pull request reviews and a collection of baseline scripts to build a new database from scratch.  I realized if DbUp could support scripting of changes objects alongside running migrations, it would really be a great solution.

## dbup-sqlserver-scripting

So, I wrote some Powershell scripts and leveraged SQL Server SMO to script out object definitions when DbUp migrations are run.  I cleaned it up and packaged it as a NuGet package for others to use.  I have been using this solution for a few months and have to say it is really ideal.  The workflow is:

  1. Run **New-Migration** from the Package Manager Console.  A new .sql script is added to your DbUp project in the \Migrations folder.
  2. Edit the new migration script and write the SQL to migrate your database.
  3. Run **Start-Migrations** from the Package Manager Console.  The output will show that your new migration(s) has been run.  Also, you will notice that any object(s) in your migration script(s) that were changed are also scripted and saved to the \Definitions folder at the root of your project.

That&#8217;s it!  With the above 3 steps you were able to migrate a database and update a local definition representing your database object state.  This is very similar (if not exactly the same) as Active Record Migrations.  When it comes time to run migrations on another environment, you only need to run the DbUp console application, just as the DbUp documentation describes; it&#8217;s just a console application after all.

## Demo

This demo video shows just how easy it is:

<a href="https://www.youtube.com/watch?v=2uMsVl_Zk6Y" target="_blank"><img class="alignnone wp-image-2190 size-full" src="/media/demo-thumbnail-1.png" alt="dbup-sqlserver-scripting Demo" width="575" height="338" /></a>

&nbsp;

## More Information

The NuGet package is located here: <https://www.nuget.org/packages/dbup-sqlserver-scripting/> and can be installed by running **Install-Package dbup-sqlserver-scripting**.

The GitHub repo is located here: <https://github.com/bradymholt/dbup-sqlserver-scripting>** **and contains more details setup and usage information.

&nbsp;

 [1]: http://guides.rubyonrails.org/active_record_migrations.html
 [2]: http://www.codeproject.com/Articles/825831/SQL-Server-Database-Development-in-Visual-Studio
 [3]: http://paulstovell.com/blog/database-deployment
 [4]: https://msdn.microsoft.com/en-us/data/jj591621.aspx
 [5]: https://github.com/chucknorris/roundhouse
 [6]: http://dbup.github.io/
 [7]: https://octopusdeploy.com/
