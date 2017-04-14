---
title: I Hate Triggers
author: Brady
layout: post
permalink: /i-hate-triggers/
dsq_thread_id: 564 http://www.geekytidbits.com/?p=564
---
I understand the initial appeal of database triggers from a developer&#8217;s perspective.  Among other things, they enable you to tack business logic to existing database structures without having to change applications that sit on top of them.

For example, let&#8217;s say you have an e-commerce database that has several applications sitting on top of it.  When these applications were developed, a business assumption was made to charge a flat shipping fee of $10.00 for every order of $100.00 or more.  This $10.00 value is stored in a configuration table within the database.  Times changed and now, we have different flat shipping rates, depending upon which state the customer lives.  It might be tempting to simply write an Insert trigger on the Order table to change the $10.00 shipping charge to an amount determined by a State\_Flat\_Shipping_Rate table.  After all, this would be fairly quick to implement and you wouldn&#8217;t have to dig through old code of several existing applications.  But, as with many things in life,* the simple path is not always the best path*.

I can&#8217;t tell you how many times I have come across an issue that was caused by a trigger.  I&#8217;ve gotten to the point where, when I see a trigger culprit, I raise my fist in the air and say &#8220;damn you, trigger!&#8221;.

Here&#8217;s why I *generally* hate them:

  * They can introduce &#8220;**data bugs**&#8221; that are extremely hard to trace.
  * They can (and usually do) **slow down CRUD operations**.
  * Since they work in a transparent manner, it is **hard to performance trace** them with tools such as SQL Profiler.
  * They **hide business logic**.  Things that seem to happen in an application magically could be attributed to an unknown trigger.  Not having visibility into the all the business logic for a particular domain creates &#8220;blind spots&#8221; for developers and therefore increases the chances of defects.

The only scenarios I like to see triggers used are:

  * For database audit purposes &#8211; if you need fine grain tracking of what is going on in a table, like who touched it or filling a corresponding history table.
  * For use with <a href="http://www.simple-talk.com/content/print.aspx?article=1270" target="_blank">database refactoring</a>, but only on a temporary basis.

If you really must use a trigger and can&#8217;t find a way to do what you need by another mechanism, a good question to ask yourself is &#8220;If this trigger is temporarily disabled or dropped entirely, will it affect my application in any material way?&#8221;  **If the answer is yes, don&#8217;t use one!**
