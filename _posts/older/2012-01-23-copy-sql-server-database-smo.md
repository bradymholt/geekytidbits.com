---
title: Copy SQL Server Database with SQL Server Management Objects (SMO)
author: Brady
layout: post
permalink: /copy-sql-server-database-smo/
dsq_thread_id: 837 http://www.geekytidbits.com/?p=837
---
I recently came across the need the copy a SQL Server database structure and data to a new database.  I could use the <a href="http://msdn.microsoft.com/en-us/library/ms190436.aspx" target="_blank">Backup/Restore</a> method but I needed to be able to do this on an automated basis with ease.  I also needed the flexibility to change object names and generally have more control when creating the database copy.

Searching around, I found <a href="http://msdn.microsoft.com/en-us/library/ms162169.aspx" target="_blank">SQL Server Management Objects (SMO)</a> which are .NET assemblies that can be used to interact with SQL Server directly.  Actually, SQL Server Management Studio (SSMS) uses SMO under the hood for many operations such as the &#8220;Generate Scripts&#8221; screen.  SMO assemblies are installed in the folder C:\Program Files (x86)\Microsoft SQL Server\100\SDK\Assemblies\ when you select the &#8220;Client Tools SDK&#8221; during SQL Server install.  If you don&#8217;t have the assemblies installed and need help take a look at <a href="http://msdn.microsoft.com/en-us/library/ms162189.aspx" target="_blank">Installing SMO</a>.

Getting the SMO objects to do what I wanted was a bit tricky because the MSDN documentation isn&#8217;t so great and the the options can be confusing.  Some of the options are turned on by default (in a not so obvious way) and some options override other options.  Getting Full Text Search Index Catalogs to be scripted properly was not straight forward.  Also, when scripting the data, SMO won&#8217;t script it in the correct order to satisfy dependent primary keys (i.e. INSERT INTO State before INSERT INTO Address) unless you use something called a DependencyWalker.  Anyway, after some tweaking around I finally got SMO working like I wanted.

The first thing you need to do is add references to the following SMO assemblies:

  * C:\Program Files (x86)\Microsoft SQL Server\100\SDK\Assemblies\Microsoft.SqlServer.ConnectionInfo.dll
  * C:\Program Files (x86)\Microsoft SQL Server\100\SDK\Assemblies\Microsoft.SqlServer.Management.Sdk.Sfc.dll
  * C:\Program Files (x86)\Microsoft SQL Server\100\SDK\Assemblies\Microsoft.SqlServer.Smo.dll
  * C:\Program Files (x86)\Microsoft SQL Server\100\SDK\Assemblies\Microsoft.SqlServer.SmoExtended.dll
  * C:\Program Files (x86)\Microsoft SQL Server\100\SDK\Assemblies\Microsoft.SqlServer.SqlEnum.dll

<div>
  Here is the C# program I used to script out the database structure and data to .sql files, create the destination database, and run the scripts to build up the database copy.
</div>

<pre class="brush: c-sharp">using System;
using Microsoft.SqlServer.Management.Smo;
using Microsoft.SqlServer.Management.Common;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        string sourceServerName = "SOURCE_SERVER_NAME";
        string sourceDatabaseName = "SourceDatabase";
        string sourceUser = "sa";
        string sourcePassword = "SuperSecretPassword";
        string destinationServerName = "DESTINATION_SERVER_NAME";
        string destinationDatabaseName = "NewDestinationDatabase";
        string destinationUser = "sa";
        string destinationPassword = "SuperSecretPassword";

        Server sourceServer = new Server(new ServerConnection(sourceServerName, sourceUser, sourcePassword));
        Server destinationServer = new Server(new ServerConnection(destinationServerName, destinationUser, destinationPassword));
        Database sourceDb = sourceServer.Databases[sourceDatabaseName];
        Database destinationDb = new Database(destinationServer, destinationDatabaseName);

        sourceServer.ConnectionContext.Connect();
        destinationServer.ConnectionContext.Connect();

        try
        {
            //generate scripts
            string structureScript = ScriptStructure(sourceDb, string.Concat(destinationDb, "_Structure.sql"));
            string dataScript = ScriptData(sourceDb, string.Concat(destinationDb, "_Data.sql"));

            destinationDb.Create();

            //execute scripts in new database
            destinationDb.ExecuteNonQuery(structureScript);
            destinationDb.ExecuteNonQuery(dataScript);
        }
        finally
        {
            sourceServer.ConnectionContext.Disconnect();
            destinationServer.ConnectionContext.Disconnect();
        }
    }

    private static string ScriptStructure(Database sourceDb, string destinationFileName)
    {
        Transfer transfer = new Transfer(sourceDb);
        transfer.CopyAllObjects = false;
        transfer.CopyAllFullTextCatalogs = true;
        transfer.CopyAllFullTextStopLists = true;
        transfer.CopyAllSynonyms = true;
        transfer.CopyAllRules = true;
        transfer.CopyAllDefaults = true;
        transfer.CopyAllTables = true;
        transfer.CopyAllStoredProcedures = true;
        transfer.CopyAllViews = true;
        transfer.CopyAllUserDefinedFunctions = true;
        transfer.CopyAllUsers = true;
        transfer.CopyAllDatabaseTriggers = true;
        transfer.CopyAllUserDefinedTableTypes = true;
        transfer.CopyData = true;

        transfer.Options = new ScriptingOptions();
        transfer.Options.WithDependencies = false;
        transfer.Options = new ScriptingOptions();
        transfer.Options.ContinueScriptingOnError = true;
        transfer.Options.FullTextCatalogs = true;
        transfer.Options.FullTextStopLists = true;
        transfer.Options.FullTextIndexes = true;
        transfer.Options.DriAll = true;
        transfer.Options.ExtendedProperties = true;
        transfer.Options.Indexes = true;
        transfer.Options.NonClusteredIndexes = true;
        transfer.Options.Triggers = true;
        transfer.Options.ToFileOnly = true;
        transfer.Options.FileName = destinationFileName;

        transfer.ScriptTransfer();

        string script = File.ReadAllText(destinationFileName);
        return script;
    }

    private static string ScriptData(Database sourceDb, string destinationFileName)
    {
        ScriptingOptions scp = new ScriptingOptions();
        scp.ScriptSchema = false;
        scp.ScriptData = true;
        scp.AppendToFile = true;
        scp.FileName = destinationFileName;
        scp.ToFileOnly = true;

        Scripter scripter = new Scripter(sourceDb.Parent);
        Table[] tbls = new Table[sourceDb.Tables.Count];
        result.SourceDatabase.Tables.CopyTo(tbls, 0);
        DependencyTree tree = scripter.DiscoverDependencies(tbls, true);
        DependencyWalker walker = new DependencyWalker();
        DependencyCollection collection = walker.WalkDependencies(tree);

        foreach (DependencyCollectionNode dep in collection)
            {
                string name = dep.Urn.GetAttribute("Name");
                if (sourceDb.Tables.Contains(name))
                {
                    Table tbl = result.SourceDatabase.Tables[name];
                    tbl.EnumScript(scp);
                }
            }

        string script = File.ReadAllText(destinationFileName);
        return script;
    }
}</pre>
