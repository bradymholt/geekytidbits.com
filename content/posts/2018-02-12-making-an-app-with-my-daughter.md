---
layout: post
title: "Making an app with my daughter"
permalink: /making-an-app-with-my-daughter/
---

I have been wanting to spur [STEM](https://en.wikipedia.org/wiki/Science,_technology,_engineering,_and_mathematics) interest in my 6, soon to be 7, year-old daughter recently and haven't been quite sure of the best avenue to do so until yesterday.  Earlier in the day yesterday, I was annotating a screenshot I had taken in [Monosnap](https://monosnap.com/welcome) while she looked on.  She asked some curious questions like "What's that?", "Can you make that line pink?", "Can you add a picture?".  Ohhh, I like how she's thinking!  So, I said, "Do you want to make an app with me later today?".  Of course she said yes.  She's 6 and still likes spending good quality time with her Daddy.  So, we picked a time after naps to work on it.

Before that time, I did a little thinking and planning.  I knew I wanted to make a simple paint app with her but honestly I had never made a painting app.  How am I going to write an app with her if I have no idea what I'm doing?  Google was my friend.  It didn't take long for me to decide on using HTML `<canvas>` with some JavaScript to make a quick-and-dirty painting app.  There was some simple getting started tutorials on these types of uses for `<canvas>` so I prototyped a really simple working example to prepare.


Once the time came, we got busy.  I showed her what I had so far.  It was really simple; a 50x50 box you could draw a green line in while moving the mouse.  I asked her, "Ok, what do you want to change?".  The color of course.  "Make it pink".  I opened the code and explained "These are the instructions that make the app work..you don't need to understand them but I want you to know this is how it works."  She was more mesmerized than I expected.  I changed the hex color to pink and refreshed.  She was really excited about that!  She then wanted to add a background image so she could actually paint it.  "What image?".  A princess crown of couse.  Google Image search to the rescue.  A few lines of JavaScript and we have a background image.  This process of back and forth went on for about 45 minutes until we had something we were both happy with.  She then wanted to color the princess crown, print it out and give it as Valentine's Day gifts.  She's so sweet.  She started coloring and messed up a little.  "Daddy, how do I fix that?".  Uh oh, we need Undo.  "Let's make an Undo feature".  Google to the recuse again because I'm not sure how to do that with `<canvas>`.  Once Undo was implemented she was off to the races.

## Demo
Here's the working app:
![painting-app](../media/painting-app.gif){:height="451" width="691"}

And, of course, I had to publish it GitHub for her: [https://github.com/bradymholt/the-painting-app](https://github.com/bradymholt/the-painting-app).  We also made a shortened URL to the GitHub Page driven app url: [https://tiny.cc/kaylagrace](https://tiny.cc/kaylagrace).

## It was fun

It was a lot of fun building this together with her and she had a good time too.  I am really looking forward to doing more activities like this with her.  When we posted the app on GitHub she said, "Daddy, are we going to be famous?".  I said, "Maybe, baby girl, maybe".  :)