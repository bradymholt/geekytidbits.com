---
title: Syndication Fetcher
---

In the past few days I have been working on a tool to fetch new entries from RSS and Atom feeds and send them to myself via an email. I tried a few npm packages for fetching and parsing the feeds but never came across one that worked the way I wanted it to. So, I decided to write and publish my own.

The library package is named `syndication-fetcher`. The repository is located here: [https://github.com/bradymholt/syndication-fetcher](https://github.com/bradymholt/syndication-fetcher) and it can be installed with `npm install syndication-fetcher`.

### Usage example

```javascript
import { fetchFeed } from "syndication-fetcher";
const feed = await fetchFeed("https://www.geekytidbits.com/rss.xml");

/* `feed` object looks like this:
{
  title: string;
  description: string;
  link: string;
  items: [
    {
      id: string;
      title: string;
      description: string;
      link: string;
      pubDate: Date | null;
      content: string;
    }
  ]
}
*/
```
