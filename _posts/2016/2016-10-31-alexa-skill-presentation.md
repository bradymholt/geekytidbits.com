---
title: Alexa Skill Presentation
author: Brady
layout: post
permalink: /alexa-skill-presentation/
---


About a year ago I started attending the [Node.js Houston](https://www.meetup.com/NodejsHouston/) ([@nodejshouston](https://twitter.com/nodejshouston)) Meetup to meet some other JavaScript developers here in Houston and to, of course, learn more about Node.js and JavaScript.  It's a great meetup with a good amount of participation and solid presentations.  Awhile back Alan, one of the organizers of the group asked if there was a topic I would like to present and we settled on me giving a presenation about Amazon Alexa which is something I've been playing around with quite a bit in the last few months.  It was fun to prepare and present the material and I learned more about Alexa along the way.

The topic was "Controlling the Amazon Echo with JavaScript" and my goal was introduce Alexa, the SDK for Node.js, create a simple skill, deploy it to Lamda and test it with the Echo, all during the presentation.  I really wanted those in attendance to think "Wow, this looks pretty easy to work with...I think I'll give it a try myself".

Here is the [presentation](https://docs.google.com/presentation/d/1ICOJPCjiYj8cF1lPOZHCuHUz8TwKD915yghO2yA0PAw/edit?usp=sharing):

<div style="margin: 20px 0 20px 0;">
    <iframe src="https://docs.google.com/presentation/d/1ICOJPCjiYj8cF1lPOZHCuHUz8TwKD915yghO2yA0PAw/embed?start=false&loop=false&delayms=3000" frameborder="0" width="750" height="450" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</div>
The skill I used during the presentation was called "Guitar Ace" and is a skill that plays guitar chords and helps you tune your guitar.  The repository for the skill is located here: [https://github.com/bradyholt/alexa-guitar-ace](https://github.com/bradyholt/alexa-guitar-ace) and the bulk of the code is shown below:

<script src="https://gist.github.com/bradyholt/ce9d54a9462c431cb2efbbedf281576f.js"></script>


