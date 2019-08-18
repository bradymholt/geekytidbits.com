---
title: Generating Date Ranges in SQLite
permalink: /generate-date-range-sqlite/
---

SQLite supports [Recursive Common Table Expressions](https://www.sqlite.org/lang_with.html#x1140) which is very handy sometimes. Although you have to keep an eye on performance, they can help you accomplish something that would otherwise be non-trival. Something like generating a range of dates or months, as I recently had to do.

In the SQLite [SQL As Understood By SQLite](http://www.sqlite.org/lang_with.html#rcex1) document, there is a gem of an example that can be modified slightly to generate a range of dates eloquently.

Here is what came up with. Enjoy!

```sql
/* Generate a range of days between two dates */

WITH RECURSIVE
  cnt(x) AS (
     SELECT 0
     UNION ALL
     SELECT x+1 FROM cnt
      LIMIT (SELECT ((julianday('2016-04-01') - julianday('2016-03-15'))) + 1)
  )
SELECT date(julianday('2016-03-15'), '+' || x || ' days') as date FROM cnt;

/*
> date
> ---------
> 2016-03-15
> 2016-03-16
> ...
> 2016-04-01
*/

/* Generate a range of months between two months */

WITH RECURSIVE
  cnt(x) AS (
     SELECT 0
     UNION ALL
     SELECT x+1 FROM cnt
      LIMIT (SELECT ROUND(((julianday('2016-04-01') - julianday('2015-04-01'))/30) + 1))
  )
SELECT date(julianday('2015-04-01'), '+' || x || ' month') as month FROM cnt;

/*
> month
> ---------
> 2015-04-01
> 2015-05-01
> ...
> 2016-04-01
*/
```

It's too bad SQLite doesn't have something like [generate_series(start, stop)](http://www.postgresql.org/docs/9.1/static/functions-srf.html) that PostgreSQL has but the above gets the job done.
