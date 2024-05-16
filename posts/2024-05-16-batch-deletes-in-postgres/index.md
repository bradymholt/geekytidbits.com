---
title: Batch Deletes in Postgres
---

If you need to delete many, many rows in a Postgres table, issuing a single `DELETE` statement can be problematic for a few reasons:
- It can take a very long time to complete
- It can lock rows for the duration of the delete leading to blocked queries
- It can cause the the transaction log to become huge because the delete transaction is so large

To work around these issues, you can delete rows in batches.  There are various ways to do this but I prefer the following approach, using a `DELETE ... WHERE ... IN (SELECT ... LIMIT)` query with a [\watch command in psql](https://www.postgresql.org/docs/current/app-psql.htm#APP-PSQL-META-COMMAND-WATCH).

First, construct a delete query using a `WHERE .. IN` statement and a `LIMIT` to ensure only a batch of records are deleted.  Here's an example that deletes 1,000 rows from a table named `my_table` where the `created_at` column is older than 30 days:

```sql
DELETE FROM my_table
WHERE id IN (
  SELECT id
  FROM my_table
  WHERE created_at < now() - interval '30 days'
  -- Delete only 1000 rows at a time
  LIMIT 1000
);
```

Execute this query within `psql` and ensure it completes without error.

Now, run `\watch 1` within `psql`.  This will re-run the last query every second and display the number of rows deleted.

After a few seconds, you should see output like this:

```
DELETE 1000
DELETE 1000
DELETE 1000
```

This indicates that 1,000 rows are being deleted every second.

When all rows have been deleted, you will see output like this:

```
DELETE 0
DELETE 0
DELETE 0
```

Since all rows have been deleted at this point, you can stop the watch command with `CTRL+C` in `psql`.
