---
title: "SELECT DISTINCT ON in PostgreSQL"
permalink: /postgres-distinct-on/
---

PostgreSQL has a really interesting and powerful construct called `SELECT DISTINCT ON`.  No, this is not a typical `DISTINCT`.  This is different.  It is perfect when you have groups of data that are similar and want to pull a single record out of each group, based on a specific ordering.

Let's take a an example of some log data.  You have a log table that stores the `url` of a request and the `request_duration`, which is how long it took to process the request for that URL.  It also contains a `timestamp` column.  If you wanted to answer the question "what is the most recent duration for each unique URL?" you might end up with a query that looks something like this:

```sql
SELECT l.url, l.request_duration
FROM log l
INNER JOIN (
  SELECT url, MAX(timestamp) as max_timestamp
  FROM log
  GROUP BY url
) last_by_url ON l.url = last_by_url.url AND l.timestamp = last_by_url.max_timestamp;
```

That `INNER JOIN` with a subquery is used to determine the last timestamp for each URL.  Then, the outer query is pulling from the log table and using the results of that subquery to limit the results to only the last requests by URL.  There are several ways this could be done as well including using a `WHERE IN` clause (assuming there is a single identifier that could be used), a `LATERAL` join or a `WINDOW` function.  These approaches work but all of them require some type of 2 step query where the first step is identifying the target row and the second step is actually pulling that target row.  This isn't terriby complex SQL but it can become a bit cumbersome.

Let's think about a regular `SELECT DISTINCT` clause for a moment.  When you use a `SELECT DISTINCT` clause, you are discarding duplicate rows and only retaining a single one.  But, the one that is kept is identical to the rest.  What if you could tell `DISTINCT` to only consider _some_ fields for distinction and then which row you want to pull from this group of mostly similar but slightly varying rows?  This is what `SELECT DISTINCT ON` does.

**With `DISTINCT ON`, you tell PostgreSQL to return a single row for each distinct group defined by the `ON` clause.  _Which_ row in that group is returned is specified with the `ORDER BY` clause.**

Back to our log example.  To acomplish what we did above with `SELECT DISTINCT ON`, it looks like this:

```sql
SELECT DISTINCT ON (url) url, request_duration
FROM logs
ORDER BY url, timestamp DESC
```

That's it!  We're telling PostgreSQL to "put the logs into groups unique by url (`ON (url)`), sort each of these groups by most recent (`ORDER BY url, timestamp DESC`) and then return fields for the first record in each of these groups (`url, request_duration`).
