---
title: Complexity Creep
author: Brady
layout: post
permalink: /complexity-creep/
---
> "Controlling complexity is the essence of computer programming." — Brian Kernighan

![Complex Code](/media/i-do-not-understand-code.jpg){: .pull-right }
The longer I have been developing software, the more I am convinced this quote by Kernighan is true.  And when I am thinking about complexity in software, I like to think about the idea of "fighting" it rather than just controlling it.  Why?  I think it takes real initiative to keep things simple.  The tendency for things to start out simple and to progressively get more *unnecessarily* complicated seems to be inevitable  (unless you work against it).  To be sure, some things are inherently complex to solve and demand more than a simplistic solution.  The tendency toward **unnecessary complexity**, however, is what I like to call "complexity creep".

## It's a Bad Thing
Why is complexity creep such a bad thing?  Why is simplicity worth fighting for?  When complexity increases, software becomes:

 * **Harder to Maintain** - complex code is hard to maintain.  To make changes or add new functionality you must understand what the code is doing.  If the design is complex it is going to take much more time to a developer to understand the design and make the necessary changes.
 * **More Fragile** - complex things tend to be more fragile meaning one small change  breaks something else.
 * **More Buggy** - Complex code is harder to understand and is more prone to have bugs.  Unit tests help here but there is always opportunity for edge cases to not be under test.
* **More Expensive** - Particularly in the case where complexity creep exists in the *process* around developing software such as workflow, rules, and procedures, you can end up in a negative ROI situation where the benefit you receive is overshadowed by the cost that is incurred.
 * **Harder to Debug** - For anyone (including yourself!) trying to debug an application that is overly complex, it can take much longer to determine the root cause of a problem and fix it.  If the problem is in production on a mission critical application, this is a big and stressful problem.

     > "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it." — Brian Kernighan

All of these things mean delivering and supporting your software **is going to take longer and cost more money**.

Think about it.  Let's take a simple example.  Let's say you need to write a C# program that logs the number of milliseconds it takes to send a request to a web application and get the entire response back.  Easy right?  Something like this...

    static void Main() {
       WebClient client = new WebClient();

       DateTime startTime = DateTime.Now;
       string reply = client.DownloadString("http://www.YourAwesomeDomain.com");
       DateTime endTime = DateTime.Now;

       int millisecondElapsed = (int)((endTime - startTime).TotalMilliseconds);
       System.IO.File.WriteAllText(@"log.txt", string.Format("{0}: {1}",
          DateTime.Now.ToString(), millisecondElapsed.ToString()));
    }

Now, let's say this application goes through several revisions, keeping up with some changing requirements.  And, along the way you pick up some nifty new design patterns and try to keep it testable and flexible.  Now, it looks something like this:

    const int WORK_QUEUE_BATCH_SIZE = 3;

    static void Main() {
        IRequestProvider provider = GetRequestProvider();
        IWorkQueue queue = GetWorkQueue();
        ILogger logger = BuildLoggerFromConfig();

        WorkItem item = new WorkItem();
        item.Protocol = "http";
        item.Verb = "GET";
        item.Url = "http://www.YourAwesomeDomain.com";
        queue.AddWorkItem(item);

        QueueWorker worker = new QueueWorker(provider, queue, logger);

        bool moreWork = true;
        while (moreWork) {
            IWorkQueueStatus status = worker.DoWork(WORK_QUEUE_BATCH_SIZE);
            moreWork = status.CurrentQueueSize();
        }
    }

    ...

    IWorkQueueStatus DoWork(int batchSize) {
        for (int i = 1; i <= batchSize; i++) {
            WorkItem nextItem = m_queue.GetNextWorkItem();
            while (nextItem != null) {
                WorkItem currentItem = nextItem;

                m_logger.Debug(string.Format("About to PerformRequest on ID: {0}", currentItem.ID));
                currentItem.PerformRequest(provider);
                m_logger.Debug(string.Format("Done with PerformRequest on ID: {0}", currentItem.ID));

                nextItem = m_queue.GetNextWorkItem();
            }
        }
    }

This thing can now handle more request types, logs more about what it is doing and supports operating in batches.  But, at the end of the day this thing is supposed to log the number of milliseconds it takes to request a web page.  Is this complexity necessary?  I would strongly argue it is not.  This is a hypothetical example but I have seen something simple turn into something overly complex time and time again.

Let's take another (humorous) example that I think does a good job illustrating the point that something that starts simple can get crazy complex.  The [Fizz Buzz Test](http://c2.com/cgi/wiki?FizzBuzzTest) is algorithm prompt used to ensure prospective programmers can write basic code:

> For numbers 1 through 100: if the number is divisible by 3 print Fizz; if the number is divisible by 5 print Buzz; if the number is divisible by 3 and 5 (15) print FizzBuzz; else, print the number

Some clever developer took this prompt to an extreme and came up with [Fizz Buzz Enterprise Edition](https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition).  It has 3,913 lines of code to implement an algorithm that should take more like 15 lines of code.  It's funny but demonstrates complexity creep.  To be clear, complexity has nothing to do with how much code is used to implement a solution.  **An overly complex solution could be extremely verbose or it could be surprisingly terse.**

## How it Happens
Why do things naturally drift towards complexity?  I think there are lots of reasons but the ones I have experienced first hand are:

* Premature optimization
* Anticipating future needs that never arise
* Not refactoring - Sometimes a changing requirement warrants a redesign of a component that could end up being less complex in the end compared to "tacking on" something to the existing design.
* Trying to be "clever"
* Misunderstanding of the fundamental problem you are trying to solve - If you don't fully understand the problem you are trying to solve or the algorithm you are implementing, you might write out code that resembles your mixed-up understanding of the problem.
* Laziness - Many times I think it is harder to design a simple solution than a complex one.  It's a paradox to be sure.
* Unawareness - When you are not aware of how your problem may have already been solved by someone else or that a tool exists that could be the perfect tool for you job, you may end up adding complexity to your application when it is not necessary to do so.

    >"Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple. But it’s worth it in the end because once you get there, you can move mountains.” - Steve Jobs

It's important to note that complexity creep can happen in many different areas of the software development process; not just when you are slinging out some new code or making a modification to a an existing component.  It can happen during planning, such as when you are deciding the approach to take in solving a problem (or whether the problem actually needs to be solved).  It can creep into the development process of your team, such as the steps developers must go through to get code developed and released.  Some of it can be veiled in good intentions like "security", "quality control", "risk mitigation" or "best practice"; these are all good things but processes around them can become unnecessarily complex.  It can show up anywhere!

## Fight It
I hope you agree with me that complexity creep is a real thing and that it is a problem.  Here are some strategies I've find that really work to fight the creep.

* **Value Simplicity** - If you are aware of the pitfalls of complexity creep and begin to value simplicity, you will put effort into fighting complexity creep.
* **Have Courage** - To fight complexity creep, there will be times you have to roll up your sleeves  and do some heavy lifting.  It could be hard to make that refactor.  It could take time to think through a solution that is more straight-forward.  You might step on some toes (like the guy who wrote the original version of the component) and have to justify the time spent to your manager.  You might have to ask "why" in a meeting where it seems like doing so would not be welcome.  This all takes courage.
* **Think Outside the Box** - Talk your change over with someone else; spend some time researching how others have solved a similar problem; don't assume anything; don't just start running with your first idea about how to solve a problem but instead think about it from different angles first.
* **Do Code Reviews** - Have somebody else look at your code. If they can't understand it you should make it simpler.
* **Remove Unused Code** - As the amount of code in a system goes up, it becomes hard to maintain it.  When you do system wide refactors you may be touching (and spending time on) code that is not even being used.  I know it is tempting to leave it there or just comment it out because "it might be needed" but I have found that just *removing* it pays huge dividends.  Obviously, you want to be careful and methodical here.
* **Read and Research** - Keep up with what others are doing to solve problems similar to yours and tools out there that could be leveraged for a fraction of the cost (and complexity!) you would incur if you had to do it yourself.
* Remember and practice the the wisdom behind these principles:
  - KISS - **K**eep **I**t **S**imple **S**tupid
  - YAGNI - **Y**ou **A**in't **G**onna **N**eed **I**t
  - DRY - **D**on't **R**epeat **Y**ourself

### Don't Be A Jerk
It is worth noting, you may have some opposition in your effort to avoid complexity creep.  Your team might disagree with your approach and you might ruffle some feathers.  However, I've learned that if you communicate with your team about why you are doing what you are doing they will usually be supportive (and if they are always fighting you on this then maybe you are not on the right team).  It's important to remind each other that you are on the same team and and the end game is shipping quality software in a timely manner.  Sometimes your team will disagree and the consensus will not be in your favor.  Pick your battles and don't be a jerk.

### Examples of Killing Complexity

#### The one-off report that was going to take 6 weeks

I was once on a team that received a "high priority" request to create a few custom reports for a **single** client.  These reports couldn't be generated within the existing reporting structure so the product owner and a developer starting going down the path of making major and fundamental changes to our reporting system to support these new one off custom reports for the **single** client.  And these changes were going to make our reporting system significantly more complex.  It was a large task and was going to take an absurd amount of time.  During one of our stand-ups, I had an idea of how to avoid the complexity creep.  Why not create a separate stand-alone reporting application that could generate the reports for the client and be done with it?  It ended up taking 3 days to do this and the client was happy.  Funny thing, that client  went bankrupt 6 months later.

#### The application where only 15% of the code was in use
A few years back I was tasked with taking over a mission critical application that was old (10+ years) and "a mess".  It didn't take long for me to realize that there was tons of code that wasn't being used anymore and if I was going to reign this application in, I needed to identify and remove this code.  I found that any time I needed to make a change, I had to wade through a huge amount of code, much of which was never even used.  The goal was to reduce the size and complexity of the system.  The problem was that no single person knew what was used and what was not.  So, I implemented analytics to track usage of features so I could determine what was used and what was not used.  Then, I started **removing code**.  Not commenting it out, removing it.  Source control had the history so I could get it back if I really needed it.  There were a handful of times I removed a feature/page that was used twice a year that I had to restore but the end result was a *much* leaner application that was so much easier to maintain.

You know, when I was looking for a good "complexity" quote for this post I found a [very large number of quotes on complexity](http://www.goodreads.com/quotes/tag/simplicity).  That's why I have so many quotes in this post, because I liked a lot of them!  I was actually surprised by all the quotes out there, especially how many of them were from famous people like da Vinci and Einstein.  Anyway, I drew my own conclusion that it is not a coincidence; a lot of successful people have found that fighting complexity is a key to success.  I'll leave you with a few more good ones.

> “Simplicity is the ultimate sophistication.” — Leonardo da Vinci

> "Everything should be as simple as possible, but not simpler." - Albert Einstein

> "Complexity is your enemy. Any fool can make something complicated. It is hard to make something simple." - Richard Branson

> "Any intelligent fool can make things bigger and more complex... It takes a touch of genius --- and a lot of courage to move in the opposite direction." - Albert Einstein
