---
title: Date / Time Cheatsheet for PostgreSQL
---

When working with dates and times in PostgreSQL I often forget the specifics so this post is an effort to make a cheatsheet that will help me (and hopefully others) remember the basics of working with date and time in Postgres.

## Types

There are 4 types that contain date and/or time data.

- `timestamp` - both date and time (with optional time zone)
- `date` - date (with no time of day)
- `time` - time of day (with optional time zone)
- `interval` - time interval

## Literal Input

To create a constant of a date / time type, use the name of the type followed by the literal input string, enclosed in single quotes.

Examples:

```
SELECT timestamp '2022-09-08 16:19:51.397118';
SELECT date '2020-03-13';
SELECT time '16:19:51';
SELECT interval '3 months';
SELECT interval '3 months 2 days 1 minutes';
```

See [this article](https://www.postgresql.org/docs/current/datetime-appendix.html) for details about parsing rules.


## Functions

There are many Date / Time related [functions available](https://www.postgresql.org/docs/current/functions-datetime.html), but the following ones are commonly used:

### `now()`

Returns a timestamp with timezone

```
SELECT now();
              now
-------------------------------
 2022-09-08 13:23:58.934867-06

```

### `current_date`

Returns the current date.  Note: This function must not be called with function brackets ().

```
SELECT current_date;
 current_date
--------------
 2022-09-08
```

### `current_time`

Returns the current time.  Note: This function must not be called with function brackets ().

```
SELECT current_time;
    current_time
--------------------
 13:26:57.143569-06
 ```

 ### `extract()`

 Retrieves subfields such as year or hour from date/time values.  Common field names are: `year`, `month`, `day`, `hour`, `minute`, `second`.  The field name parameter   The full list of fields names can be found in the [official documentation](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-EXTRACT).

 ```
SELECT extract(year from now()); --> 2022
SELECT extract(hour from now()); --> 16
SELECT extract(minute from now()); --> 4
 ```

  ### `age()`

Calculates the difference, or age, between 2 timestamps.  It returns an interval type.

 ```
SELECT age(timestamp '2020-07-01', timestamp '2020-01-01'); --> 6 mons
SELECT age(timestamp '2020-07-01', timestamp '2020-01-01'); --> -6 mons
SELECT age(now(), now() - interval '3 months'); --> 3 mons
SELECT age(now(), now() - interval '3 months 1 minutes'); --> 3 mons 00:01:00
 ```

## Operators

#### `date + integer -> date` - Add days to date
```
SELECT DATE '2022-01-01' + 5
    date
------------
 2022-01-06
 ```

 #### `date + interval -> timstamp` - Add an interval to a date
 ```
 SELECT DATE '2022-01-01' + interval '1 month';
      timestamp
---------------------
 2022-02-01 00:00:00
 ```

 #### `timestamp + interval -> timestamp` - Add an interval to a timestamp
 ```
 SELECT now() + interval '15 minutes';
          timestamp
-----------------------------
 2022-09-08 16:46:48.1535-06
 ```

  #### `interval + interval -> interval` - Add interval
 ```
 SELECT interval '1 day' + interval '15 minutes';
    interval
----------------
 1 day 00:15:00
 ```

 For a complete list of operators supported with Date / Time types, see "Date/Time Operators" in the [official documentation](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-CURRENT).

## Official Documentation
- [Date/Time Types](https://www.postgresql.org/docs/current/datatype-datetime.html)
- [Date/Time Functions and Operators](https://www.postgresql.org/docs/current/functions-datetime.html)
- [Constants of Date / Time types](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-CONSTANTS-GENERIC)
