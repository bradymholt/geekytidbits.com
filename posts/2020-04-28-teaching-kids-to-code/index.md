---
title: Teaching Kids to Code
---

![COVID-19 Chart](/teaching-kids-to-code/teasure-castle-win.png)

A few months ago, I decided to build an app with my 9 year old daughter and her friend Noah.  They seemed interested and I was excited at the prospect of inspiring them to learn more about programming.

We setup a time and about an hour before I figured I better come up with a plan.  When I starting thinking about it, I had no idea where to start!

Questions on my mind:
1. What language should I use?
1. What type of app should be build?  Game?  Terminal app?  Website?
1. How do I teach them?  Do I start with basics and then build up?  Or, should we just build something and fill in the gaps later?
1. No, really, do I teach these 9 year olds what an array is or just start typing and tell them what I'm doing?
1. What if I go too fast?  Will I know?  Will they tell me?  Or, will they just get lost and feel like they aren't understanding and give up.

I was surprised how hard it seemed to simply teach something to them.  It was particularly challenging because they were starting from scratch.  When I've given talks at meetups and conferences, my audience has been professional developers.  Bridging the gap between their experience and what I'm teaching them is much
easier than bridging the gap between being a professional developer and a 9 year old that knows nothing about computer programming.

I still don't know the answer to most of those questions, admittedly.  But, **I do have a newfound respect for teachers**.  Especially teachers teaching elementary topics.

I decided that I wanted to do something to keep them engaged.  I knew I would lose them if I started talking about variables and data structures right away.  So,
I just asked them what they wanted to build.  "A game".  Of course, right?

So, we talked about the details of the game.  What would be the objective?  How will you win?  How does the game play work and what are the rules?  Their wheels were spinning and I had to rein them in a bit because this little game app was getting complicated fast.

We eventually came up with a simple plan: The name of the game is **Tresure Castle**.  You are asked a series of questions and are given keys as you answer questions correctly.  Once you get enough keys, you can unlock the castle and you win the game.

I opened up VSCode, created an `index.js` file and start coding in JavaScript.  I told them what I was doing along the way but didn't get too detailed.  I figured they would ask if they really wanted to know.  I stopped along the way and ask some questions.

> Noah - see this variable that tells me how many keys I have and this other variable that defines how many keys you need to win?  How do you think I can find out how many more keys they need. [Subtract them?] Yes!  Now, we can subtract them and store the result in _another_ variable.  Then, we can use that.

> Kayla - See how we're looping through the questions we ask the user?  What do you think we should do once they get enough keys?  Should we keep looping?  [No?] Right, we need to stop and tell them they've won!  Here's how you do that...

Honestly, I felt like I didn't know what I was doing but it worked out fine.  We just tried to have fun and I tried to adjust as we went.  When they got lost, I slowed down.  When I felt things were clicking I sped up a bit.  I tried to make it fun and engaging to keep their interest.  All along the way, I kept focusing on **my main goal: to enspire them**.  I really hoped they would clearly make the connection that we are telling the computer what to do and it does it.  And, we could tell it to do anything!  That's amazing to me and I hoped they would see that too.

Time will tell if they do :)

Here's the code repository for our humble little game: [https://github.com/bradymholt/treasure-castle](https://github.com/bradymholt/treasure-castle).
