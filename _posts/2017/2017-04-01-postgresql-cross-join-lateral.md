---
title: CROSS JOIN LATERAL in PostgreSQL
author: Brady
layout: post
permalink: /postgresql-cross-join-lateral
---

PostgresSQL 9.3 introduced a new join type called a LATERAL join.  This is an interesting and powerful join type that is a bit intimidating at first but when you take a closer look I think you'll find it to be quite handy and performant in certain scenarios.

So, what is a LATERAL join anyway?  From the [PostgreSQL documentation](https://www.postgresql.org/docs/9.3/static/sql-select.html#SQL-FROM):

> The LATERAL key word can precede a sub-SELECT FROM item. This allows the sub-SELECT to refer to columns of FROM items that appear before it in the FROM list. (Without LATERAL, each sub-SELECT is evaluated independently and so cannot cross-reference any other FROM item.)

In a gist, it allows you to perform a sub-query in the `FROM` clause and _reference_ column values from other records in the query.

Quick example: Select 2 most recent orders for each customer

```
SELECT id, o.order_id, o.date, o.amount
FROM customers c
    CROSS JOIN LATERAL (
        SELECT id as order_id, date, amount
        FROM orders
        WHERE customer_id = c.id
        ORDER BY date DESC
        LIMIT 2
    ) o;
```

Another use: reuse column aliases

```
SELECT l.id, c.start_date,  c.end_date, (c.end_date - c.start_date) as days_diff
FROM log l
    CROSS JOIN LATERAL (
        SELECT to_date(l.start_timestamp, 'MM/dd/YYYY'),
               to_date(l.end_timestamp, 'MM/dd/YYYY')
    ) as c(start_date, end_date);
```
