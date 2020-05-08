---
title: Postgres composite types for tables
---

A nice feature in PostgreSQL is that when you create a table, "a composite type is also automatically created, with the same name as the table, to represent the table's row type" (quoted from the [documentation](https://www.postgresql.org/docs/11/rowtypes.html)).  A composite type represents the structure of a row or record.  This means you can work with a single record of a table much like an object in an OOP language.

So, if you create an `example` table:

```sql
CREATE TABLE example (
  id int,
  name text
);
```

You also get a composite type (also known as a "user defined type" in other database systems) named `example`.
Then, in PL/pgSQL, you can then do things like:

Create a function that returns an `example` record:

```sql
CREATE OR REPLACE FUNCTION construct_example (p_name text)
RETURNS example
AS $$
DECLARE
  v_example example;
BEGIN
  v_example.id = 1;
  v_example.name = p_name;
  RETURN v_example;
END;
$$
LANGUAGE plpgsql;
```

Use an `example` record as a single record source for an `INSERT INTO` statement:

```sql
INSERT INTO example VALUES ((SELECT construct_example('ABC')).*);
```

Use `ROW` to construct a record on the fly:
```
SELECT ROW(1::int, 'ABC'::text)::example;
```

Use JSON to hydrate a record:

```sql
v_json_object = '{"id": 1, "name": "ABC"}'::json;
v_example = json_populate_record(NULL::example, v_json_object);
```

It's actually quite handy to be able to work with a single record that is of the same type as a table.

### IS NULL and IS NOT NULL

One curious thing about composite types is how the `IS NULL` and `IS NOT NULL` constructs work on them.

`IS NULL` is `TRUE` if a variable of the composite type is `NULL` or if **all** the fields of the record are `NULL`.

So, both of these evaluate to `TRUE`:
```
SELECT ROW(NULL::int, NULL::text)::example IS NULL;
SELECT NULL::example IS NULL;
```

`IS NOT NULL`, on the other hand, is only `TRUE` if **all** the fields in the record are not NULL.

```
SELECT ROW(1::int, NULL::text)::example IS NOT NULL;
-- false!
SELECT ROW(1::int, 'ABC'::text)::example IS NOT NULL;
-- true
```

Because of this, a composite type variable can have both `IS NOT NULL` and `IS NULL` constructs equal to `FALSE` at the same time!


