---
title: GitHub Universe 2017
author: Brady
layout: post
permalink: /github-universe/
---

This past week, I had the opportunity to attend [GitHub Universe 2017](githubuniverse.com).  [YNAB](youneedabudget.com) graciously allowed me to take off from work and attend.  I was really excited about going because it had been awhile since I'd been to a development conference and I had heard good things about Universe.

## Trends

One of the nice things about going to a conference is being able to get an implicit pulse on the latest dev trends from real people, not just frontpage Hacker News posts.  Without a doubt, these topics were being talked about consistently:

- AI / Machine Learning
- Docker
- Kubernetes
- DevOps tooling
- IoT

In particular, AI and Machine Learning is hot!

## Sessions

There were many sessions covering a wide variety of topics.  Some were more technical and others addressed more soft tech skills.  A few of the sessions I found interesting were:

- **Charity Majors, Co-Founder of Honeycomb.io** - She is a former Facebook ops engineer who talked about the state of DevOps and analytics tools for tracking down the source of issues (think Rollbar, NewRelic, etc.).  She had a really interesting perspective and a few of her quotes that stuck with me were:
  - “Tools are thin and intuition is deep but we need to reverse this” - meaning, in the context of debugging, we rely upon tools some, and our intuition and experience even more.  She thinks we need to reverse this, and tools need to be relied upon more for diagnosing issues.  She specifically mentioned a tool they used at Facebook called Scuba which she said was an amazing debugging tool and all the engineers at Facebook love it (and miss it when they leave)
  - "If it's not a creative disciple, a robot should be doing it" - meaning, if you’re doing a mundane task in the process of software development that doesn’t require human creative thought, you’re wasting your time and should automate it.
  - “Failure should be common, small and open” - Don't be afraid of failure; your team should consider it normal and a tool for learning.
- **Felipe Hoffa, Engineer at Google** - In his session, he showed how he exported a huge chunk of GitHub open source code into Google BigQuery and was able to run all sorts of interesting queries on it.  This was fascinating, both because of what kinds of things could be learned (i.e. leading or trailing commas in SQL more common, tabs vs. spaces, etc.) but also because of how insanely fast BigQuery was able to process queries across huge datasets.
Flora Dai, Engineer at Pandora - She walked through how they used Kafka and Solr to do realtime analytics on the Pandora platform.  This was a pretty indepth walkthrough and I enjoyed hearing the reasoning behind the tooling and architecture the decided upon.
- **David Stolarski, New York Times** - David demonstrated how he built a custom CMS for advertisers on top of GitHub.  Changes were persisted back to GitHub directly through the API and the server itself was very simple.  I’ve never thought about building an app in this way and thought it was interesting.
- **Rob Zuber, CTO at CircleCI**  - He talked about his team’s movement toward microservices and explained how they had to walk a fine line between freedom and disciple when moving this direction.  He talked specifically about how important it was to communicate between teams and decide upon central patterns and tools to prevent duplication and wasted time.
- **Edward Thomson, Microsoft** - His talk was on the history of how Microsoft started warming up to open source.  This was pretty interesting because Edward was integral to this shift and had some really interesting insight into how this happened.  He said MSFT was so closed to open soure that they completely killed off a tool that they acquired because there the legal team was too concerned with the open source licenses that it used.  At the end of the day, Git was their initial entry into embracing open source.  The breakthrough happened when Edward went to someone on the legal team to talk about GitHub and was prepared to beg but it turns out the lawyer was a bit of a techy and was using GitHub at night with pet projects.  This was a turning point.

## People

I really enjoyed getting to meet all sorts of friendly people who are spread all over, working on interesting challenges.  I liked picking their brains a bit about the tools they were using and how they were solving their problems.  I felt like I was getting out of my bubble a bit and having the opportunity to look at things from a fresh perspective.  I met people from GitHub (of course), Microsoft, Weebly, Amazon Web Services, IBM, Credit Karma, Shopify, Heroku, TravisCI, CirleCI and more.

In particular, I ran into Michael Imms and Rob Lourens who work on VSCode at Microsoft.  I shook their hands and thanked them for the great work.  They were very open to feedback and appreciated me talking about how I use VSCode, particularly for debugging TypeScript.  While I was talking with them, Zeke Sikelianos from the Electron team walked up they were doing some real-time collaboration which was fun to witness firsthand.  Michael was telling Zeke there was a bug they were running into that was preventing them from bumping the Electron version.  Cool to observe!

## YNAB Love

I knew people loved YNAB but I was surprised with how many people saw my shirt and came up to say something like “You work at YNAB? … I love YNAB!”.  So, I changed my clothing plan and kept wearing my YNAB t-shirt every day of of the conference!  I think I mentioned this in #product_team last week but when I was checking in, a GitHubber told me they were just passing our link around and talking about us the week before.  It make me feel proud to work at YNAB and be a small part of taking stress out of people’s lives.  It’s pretty cool to have random people approach you and say they love the company and product you work for.
