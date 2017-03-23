---
title: CROSS JOIN LATERAL in PostgreSQL
author: Brady
layout: post
permalink: /postgresql-cross-join-lateral
---

PostgresSQL 9.3 introduced a new join type called a LATERAL join.

In SQL SERVER, we have CROSS APPLY.


From https://www.postgresql.org/docs/9.3/static/sql-select.html#SQL-FROM:

<blockquote>
The LATERAL key word can precede a sub-SELECT FROM item. This allows the sub-SELECT to refer to columns of FROM items that appear before it in the FROM list. (Without LATERAL, each sub-SELECT is evaluated independently and so cannot cross-reference any other FROM item.)
</blockquote>

<blockquote>
...
</blockquote>

<blockquote>
When a FROM item contains LATERAL cross-references, evaluation proceeds as follows: for each row of the FROM item providing the cross-referenced column(s), or set of rows of multiple FROM items providing the columns, the LATERAL item is evaluated using that row or row set's values of the columns. The resulting row(s) are joined as usual with the rows they were computed from. This is repeated for each row or set of rows from the column source table(s).
</blockquote>

### Advantages over correlated sub-query

(From http://stackoverflow.com/a/28557803/626911)
There are things that a LATERAL join can do, but a (correlated) subquery cannot (easily). A correlated subquery can only return a single value, not multiple columns and not multiple rows - with the exception of bare function calls (which multiply result rows if they return multiple rows). But even certain set-returning functions are only allowed in the FROM clause. Like the new unnest() with multiple parameters

### What can we do with it?

...

### Super useful scenario

<pre>
SELECT f.value1 + p.pre_calc
FROM foo f
    CROSS JOIN LATERAL (
        SELECT (f.value2+ f.value3) as pre_calc
    ) as p(pre_calc)
</pre>
