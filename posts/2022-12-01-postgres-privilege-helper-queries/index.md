---
title: Postgres Privilege Helper Queries
---

Recently, I have been trying to get a better understanding of how privileges work in Postgres and one thing I wanted was an easy way to inspect the current privileges for users, databases, schemas, and tables within a schema.

When using psql, you can run `\du` (list roles) `\l` (list databases), `\dn+` (list schemas), `\dp mytable` (list privileges for table) to see "Access privileges" but the format is cryptic and hard to understand without referencing the [privileges documentation](https://www.postgresql.org/docs/current/ddl-priv.html).  An example is this:

```
=> \dp mytable

 Schema |  Name   | Type  |   Access privileges   | ...
--------+---------+-------+-----------------------+
 public | mytable | table | miriam=arwdDxt/miriam | ...
        |         |       | =r/miriam             |
        |         |       | admin=arw/miriam      |
```

Explanation of "Access privileges" column value:
- **miriam=arwdDxt/miriam** -  miriam has INSERT (a), SELECT (r), UPDATE (w), DELETE (d), TRUNCATE (D), REFERENCES (x), TRIGGER (t) privileges on `mytable` that were granted by miriam ("/miriam").
- **=r/miriam** PUBLIC (special "role" name used to grant privilege to all roles) has SELECT (r) privilege that was granted by miriam ("/miriam").
- **admin=arw/miriam** - admin has INSERT (a), SELECT (r), UPDATE (w) privileges on `mytable` that were granted by miriam ("/miriam").

That's a bit hard to read and understand in my opinion!

So, I searched around and found how to use some of the internal Postgres tables and crafted some queries that make this information much easier to understand, at a glance.

## Roles / Users

The following query will list all roles and their attributes which grant various privileges.

```sql
SELECT
  rolname AS user,
  REPLACE(TRIM(
    CASE WHEN rolcanlogin = TRUE THEN 'LOGIN ' ELSE '' END ||
    CASE WHEN rolsuper = TRUE THEN 'SUPERUSER ' ELSE '' END ||
    CASE WHEN rolinherit = TRUE THEN 'INHERIT ' ELSE '' END ||
    CASE WHEN rolcreaterole = TRUE THEN 'CREATEROLE ' ELSE '' END ||
    CASE WHEN rolcreatedb = TRUE THEN 'CREATEDB ' ELSE '' END ||
    CASE WHEN rolreplication = TRUE THEN 'REPLICATION ' ELSE '' END), ' ', ', ')
  AS privileges
FROM
  pg_roles;
```

Example Output:
```
   user    |                      privileges
-----------+-------------------------------------------------------------
postgres   | LOGIN, SUPERUSER, INHERIT, CREATEROLE, CREATEDB, REPLICATION
miriam     | LOGIN, CREATEROLE, CREATEDB, REPLICATION
writer     | INHERIT
reader     | INHERIT
```

Documentation about the role attributes and privileges can be found here: https://www.postgresql.org/docs/current/role-attributes.html.

## Databases

To list all the databases and role (user) permissions for each, you can run the following query.

```sql
SELECT
  d.datname AS database,
  pg_get_userbyid(d.datdba) AS owner_user,
  CASE WHEN COUNT(a.privilege_type) > 0 THEN COALESCE(r.rolname, '[public]') ELSE '' END AS user,
  COALESCE(string_agg(a.privilege_type, ', '), '') AS privileges
FROM
  pg_database d
  LEFT JOIN LATERAL (
    SELECT
      *
    FROM
      aclexplode(datacl) AS x) a ON TRUE
  LEFT JOIN pg_roles r ON a.grantee = r.oid
WHERE
  d.datistemplate = FALSE
GROUP BY
  d.datname,
  d.datdba,
  r.rolname
ORDER BY
  d.datname;
```

Example Output:
```
     database     | owner_user  |      user      |     privileges
------------------+-------------+----------------+--------------------
 postgres         | postgres    |                |
 primary_db       | miriam      | writer         | CONNECT
 primary_db       | miriam      | reader         | CONNECT

 ```

 Documentation about database privileges can be found here: https://www.postgresql.org/docs/current/ddl-priv.html#PRIVILEGE-ABBREVS-TABLE.

 ## Schemas

 To list all schemas in the current database and privileges for each, you can run the following query.

 ```sql
 SELECT
  nspname AS schema,
  COALESCE(r.rolname, '[public]') AS user,
  string_agg(a.privilege_type, ', ') AS privileges
FROM
  pg_namespace
  JOIN LATERAL (
    SELECT
      *
    FROM
      aclexplode(nspacl) AS x) a ON TRUE
  LEFT JOIN pg_roles r ON a.grantee = r.oid
GROUP BY
  nspname,
  r.rolname
ORDER BY
  nspname,
  r.rolname;
 ```

 Example Output:
 ```
        schema       |      user      |  privileges
--------------------+----------------+---------------
 information_schema | postgres       | USAGE, CREATE
 information_schema | [public]       | USAGE
 pg_catalog         | postgres       | CREATE, USAGE
 pg_catalog         | [public]       | USAGE
 public             | [public]       | USAGE
 public             | miriam         | USAGE
 ```

Documentation about schemas and privileges can be found here: https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-PRIV.

## Tables

To list all tables in the current database and privileges for each, you can run the following query.

```sql
SELECT
  table_name AS table,
  table_schema AS schema,
  grantee AS user,
  string_agg(privilege_type, ', ') AS privileges
FROM
  information_schema.role_table_grants
GROUP BY
  table_name,
  table_schema,
  grantee
ORDER BY
  table_name,
  table_schema,
  grantee;
```

Example Output:
```
   table   | schema |    user    |                          privileges
-----------+--------+-------------+---------------------------------------------------------------
 mytable   | public | miriam     | SELECT, INSERT, TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE
 mytable   | public | reader     | SELECT
 mytable   | public | writer     | SELECT, INSERT, DELETE, UPDATE
 users     | public | miriam     | SELECT, INSERT, TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE
 users     | public | reader     | SELECT
 users     | public | writer     | SELECT, INSERT, DELETE, UPDATE
```

Documentation about table privileges can be found here: https://www.postgresql.org/docs/current/ddl-priv.html#PRIVILEGE-ABBREVS-TABLE.

## Defaults

Default access privileges (defined with `ALTER DEFAULT PRIVILEGES`) can be shown with the following query:

```sql
SELECT
  pg_get_userbyid(a.defaclrole) AS owner_user,
  nspname AS schema,
  CASE a.defaclobjtype
  WHEN 'r' THEN
    'table'
  WHEN 'S' THEN
    'sequence'
  WHEN 'f' THEN
    'function'
  WHEN 'T' THEN
    'type'
  WHEN 'n' THEN
    'schema'
  END AS type,
  r.rolname AS user,
  string_agg(acle.privilege_type, ', ') AS privileges
FROM
  pg_default_acl a
  JOIN pg_namespace b ON a.defaclnamespace = b.oid
  JOIN LATERAL (
    SELECT
      *
    FROM
      aclexplode(a.defaclacl) AS x) acle ON TRUE
  LEFT JOIN pg_roles r ON acle.grantee = r.oid
GROUP BY
  r.rolname,
  nspname,
  a.defaclobjtype,
  a.defaclrole
ORDER BY
  r.rolname,
  nspname,
  a.defaclobjtype;
```

Example Output:
```
 owner_user  | schema |   type   |   user   | privileges
-------------+--------+----------+----------+------------
 miriam      | public | table    | reader   | SELECT
 miriam      | public | sequence | writer   | SELECT, INSERT, UPDATE, DELETE
```

Documentation for default privileges can be found here: https://www.postgresql.org/docs/current/sql-alterdefaultprivileges.html

## .psqlrc

I have these queries configured as variables in [my .psqlrc file](https://github.com/bradymholt/dotfiles/blob/12270317daecd693ecd520876d291d1f55667a54/.psql/helpers.psql#L63-L69) for easy access.  For example, I can simply type `:p_databases <enter>` to run the above query for showing database privileges.
