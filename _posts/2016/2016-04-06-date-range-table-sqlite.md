---
title: Generating Date Ranges in SQLite
author: Brady
layout: post
permalink: /generate-date-range-sqlite/
---

SQLite supports [Recursive Common Table Expressions](https://www.sqlite.org/lang_with.html#x1140) which is very handy sometimes.  Although you have to keep an eye on performance, they can help you accomplish something that would otherwise be non-trival.  Something like generating a range of dates or months, as I recently had to do.

In the SQLite [SQL As Understood By SQLite](http://www.sqlite.org/lang_with.html#rcex1) document, there is a gem of an example that can be modified slightly to generate a range of dates eloquently.

Here is what came up with.  Enjoy! 

<script src="https://gist.github.com/bradyholt/cb43793ab1cc4d6f9a7c0c3d1a386736.js"></script>

It's too bad SQLite doesn't have somethinkg like [generate_series(start, stop)](http://www.postgresql.org/docs/9.1/static/functions-srf.html) that PostgreSQL has but the above gets the job done.  