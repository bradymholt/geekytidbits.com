---
title: 'Tech Talk: Elasticsearch'
author: Brady
layout: post
permalink: /tech-talk-elasticsearch/
dsq_thread_id: 2075 http://www.geekytidbits.com/?p=2075
---
At work, we do tech-talks every few weeks and this week I was asked to do a tech-talk on Elasticsearch.  I have been learning and using Elasticsearch to implement a 60 million document search solution over the last few months.  It has worked really well and has been a joy to use.  It&#8217;s been fun to work in a different domain for awhile and get a handle on the world of search.

Elasticsearch is an impressive search server packed full of features.  I initially evaluated a few of the search solutions out there, most notably Apache Solr, and decided upon Elasticsearch because of its ease of use and rock solid distributed architecture.  I love the REST JSON API, schema-less indexing and full document source retrieval ability.

As I&#8217;ve implemented Elasticsearch to support a new feature we are rolling out, I&#8217;ve already thought about other areas of our application that could take advantage of a search index; to take load off of our RDBMS and provide a performance boost to our stack.  Also, I see Elasticsearch as a fantastic way to handle Business Intelligence and Big Data concerns with tools like [Kibana][1] sitting on top of it.

Here is my slide deck from the tech-talk this week:

<iframe src="https://docs.google.com/presentation/d/1X4B7jMmoGTdHjhNfA_g3Ib5qHE37W1xra8uME39YSxk/embed?start=false&loop=false&delayms=3000" frameborder="0" width="750" height="450" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

 [1]: http://www.elasticsearch.org/overview/kibana/
