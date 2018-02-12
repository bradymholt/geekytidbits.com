---
layout: post
title: "TIL: psql with VS Code"
permalink: /til:-psql-with-vscode/
---

I was catching up on my Feedly yesterday and ran across [Postgres Hidden Gems](http://www.craigkerstiens.com/2018/01/31/postgres-hidden-gems/) by Craig Kerstein.  There are some really neat things in that list!
One thing that caught my eye was this one:

> @l_avrot – The fact that we can use vim editor in psql

Really?  I didn't know that.  Tell me more.  So I Googled a bit and of course another post from Craig titled [How I Work With Postgres – Psql, My PostgreSQL Admin](http://www.craigkerstiens.com/2013/02/13/How-I-Work-With-Postgres/) popped up.  Here, he explains how to use `\e` in psql to "allow you to view and edit your last run query in your editor of choice".  That sounds really useful, especially when working with longer, more involved queries.

My "editor of choice" is [VS Code](https://code.visualstudio.com/) and when I attempted to use `\e` with my `EDITOR` var set to "code" it did not work.  The current query was not passed to VS Code and when saving the file from VS Code, nothing got sent back to psql.

More Googling and fiddling and I found that I needed to add the `-w` parameter when launching VS Code so that it would "Wait for the files to be closed before returning.", per the `--help` output.  Also, I learned that you can use `PSQL_EDITOR` to set the editor specific to psql, which I prefer because I like keeping `EDITOR` set to vim for varios shell things.  Editing SQL, however, I would much prefer to do in VS Code rather than vim, thank you very much.  So, now I have the following environment variable defined in my .zshrc:

```
export PSQL_EDITOR="code -w"
```

Now when I enter `\e` from psql, VS Code launches with the contents of my current or last executed query and saving the file results in psql executing the query.  Awesome!