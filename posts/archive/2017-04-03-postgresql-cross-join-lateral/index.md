---
title: The LATERAL join
permalink: /lateral-join/
---

The LATERAL join is an interesting and powerful join type that is a bit intimidating at first but when you take a closer look it is very useful in certain scenarios.

So, what is a LATERAL join anyway? From the [PostgreSQL documentation](https://www.postgresql.org/docs/9.3/static/sql-select.html#SQL-FROM):

> The LATERAL key word can precede a sub-SELECT FROM item. This allows the sub-SELECT to refer to columns of FROM items that appear before it in the FROM list. (Without LATERAL, each sub-SELECT is evaluated independently and so cannot cross-reference any other FROM item.)

In a gist, it allows you to perform a sub-query in the `FROM` clause and _reference_ column values from other records in the query. It is similar to a [correlated subquery](https://en.wikipedia.org/wiki/Correlated_subquery) in that it can reference values from another query but has the added advantages that it can return multiple values and be used in the `FROM` clause.

## Examples

**1. Top-N per group**

For each customer, we will return the 2 most recent orders. Without a `LATERAL` join this type of query would be non-trivial.

```sql
SELECT c.id, o.order_id, o.date, o.amount
FROM customers c
CROSS JOIN LATERAL (
    SELECT id as order_id, date, amount
    FROM orders
    WHERE customer_id = c.id
    ORDER BY date DESC
    LIMIT 2
) o
ORDER BY c.id;
```

NOTE: I use `CROSS JOIN LATERAL` above which is eqivalent to `LEFT JOIN LATERAL (...) a ON true` (as shown in LATERAL examples elsewhere) but I find it more readable. Effectively, it behaves like a `LEFT JOIN`.

**2. Call User-Defined Function for each row**

If you have a User-Defined function that needs to be run for each row of a query, you can use the `LATERAL` join to call it and return multiple values.

```sql
SELECT t.id, s. p.pl_amount, p.pl_percentage
FROM trades t
CROSS JOIN LATERAL get_trade_pl(t.id) p;
```

**3. Reuse calculated values**

This is a non-obvious use of `LATERAL` but one I use often. Since you can reference columns from other records in the query, you can use `LATERAL` to calculate values and then _reuse_ them in the main `SELECT` statement. Otherwise, you would have to recalculate values for each usage of them in the `SELECT` statement.

In the following example, start_timestamp and end_timestamp are being parsed to a date and the output of those calculations are then being used multiple times from the `SELECT` statement.

```sql
SELECT l.id, c.start_date,  c.end_date, (c.end_date - c.start_date) as days_diff
FROM log l
CROSS JOIN LATERAL (
    SELECT to_date(l.start_timestamp, 'MM/dd/YYYY'),
            to_date(l.end_timestamp, 'MM/dd/YYYY')
) as c(start_date, end_date);
```
