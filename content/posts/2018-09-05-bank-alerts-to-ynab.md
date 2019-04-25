---
title: "Bank Alerts to YNAB"
permalink: /bank-alerts-to-ynab/
---

I have been really busy for the past few months at [YNAB](http://www.youneedabudget.com) working on the new [Public API](https://www.youneedabudget.com/introducing-ynabs-api/).  It's been a lot of fun, hard work, and learning along the way.  I have really enjoyed seeing what the community has done with the API so far as well.

Along with helping to build the new API, I have played with building a few things for it too.  I created a [Debt Paydown Calculator](https://github.com/bradymholt/debt-paydown-calculator) and some [utilities](https://github.com/bradymholt/ynab-utils) to do things like import my pending transactions in YNAB and update transaction memos on Amazon purchases to include the list of items for that purchase (love that one!).  Besides being fun, building these things has also helped me actually _use_ the API and see friction along the way that needs to be improved.  I have made many improvements to the API, clients, and documentation as a direct result of working on these little projects.

The most recent project for the API I've worked on is a proof-of-concept project called [Bank Alerts to YNAB](https://github.com/bradymholt/bank-alerts-to-ynab) which "routes spending alert emails from your bank to YNAB so your transactions appear in YNAB seconds after they occur".  So, if your bank is supported, you can swipe your Visa at Costco and have the transaction automatically imported into YNAB by the time you can say "I love YNAB and I cannot lie".

I set out with some goals in mind when I started this project: **free** and **easy** and was able, I think, to acheive both of those.  I used [Glitch](https://glitch.com) to host the webhook server and [CloudMalin](https://cloudmailin.com) to route emails to the webhook.  This was a project project and I hope others find it useful.

You can learn more about this project on the [GitHub repo page](https://github.com/bradymholt/bank-alerts-to-ynab) and also checkout my 2 minutes setup video:

<a href="https://www.youtube.com/watch?v=PDiMCY-NngQ" target="_blank"><img class="alignnone wp-image-2190 size-full" src="https://camo.githubusercontent.com/135a8b22aff4b81b906978f17f54f6dfb385c299/68747470733a2f2f63646e2e676c697463682e636f6d2f31316230666639612d633337352d346563622d393364322d633463303962313064353839253246646f776e6c6f61642e706e673f31353335373439353533313334" /></a>


