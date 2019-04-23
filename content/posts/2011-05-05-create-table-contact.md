---
title: CREATE TABLE Contact
author: Brady
layout: post
permalink: /create-table-contact/
dsq_thread_id: 234 http://www.geekytidbits.com/?p=234
---

From time to time I need to create a table to hold contact information. It seems like almost every (ok maybe not _every_) database has a table that contains information about contacts and/or users.  In an effort to reduce the time it takes write the DDL for this common table, here&#8217;s a simple CREATE statement (SQL Server syntax) to do the work.  Modify and execute to your heart&#8217;s content.

```sql
CREATE TABLE dbo.Contact (
  Contact_ID int NOT NULL IDENTITY (1, 1),
  First_Name varchar(50) NOT NULL,
  Middle_Name varchar(50) NULL,
  Last_Name varchar(50) NOT NULL,
  Name_Prefix varchar(8) NULL,
  Name_Suffix varchar(10) NULL,
  Address_1 varchar(50) NULL,
  Address_2 varchar(50) NULL,
  City varchar(50) NULL,
  State varchar(50) NULL,
  ZIP_Code varchar(10) NULL,
  Phone_Number varchar(15) NULL,
  Fax_Number varchar(15) NULL,
  Email_Address varchar(100) NULL,
  Social_Security_Number varchar(11) NULL,
  Date_Of_Birth date NULL,
  User_Name varchar(20) NULL,
  User_Password_Hash varchar(50) NULL,
  User_Password_Salt varchar(10) NULL,
  Created_Date datetime NOT NULL,
  Modified_Date datetime NOT NULL
)
GO
ALTER TABLE dbo.Contact ADD CONSTRAINT
  PK_Contact PRIMARY KEY CLUSTERED  (Contact_ID)
GO
ALTER TABLE dbo.Contact ADD CONSTRAINT
  DF_Contact_Created_Date DEFAULT GETUTCDATE() FOR Created_Date
GO
ALTER TABLE dbo.Contact ADD CONSTRAINT
  DF_Contact_Modified_Date DEFAULT GETUTCDATE() FOR Modified_Date
GO
```
