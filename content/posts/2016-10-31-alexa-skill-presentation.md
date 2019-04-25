---
title: Alexa Skill Presentation
author: Brady
permalink: /alexa-skill-presentation/
---

About a year ago I started attending the [Node.js Houston](https://www.meetup.com/NodejsHouston/) ([@nodejshouston](https://twitter.com/nodejshouston)) Meetup to meet some other JavaScript developers here in Houston and to, of course, learn more about Node.js and JavaScript. It's a great meetup with a good amount of participation and solid presentations. Awhile back Alan, one of the organizers of the group asked if there was a topic I would like to present and we settled on me giving a presenation about Amazon Alexa which is something I've been playing around with quite a bit in the last few months. It was fun to prepare and present the material and I learned more about Alexa along the way.

The topic was "Controlling the Amazon Echo with JavaScript" and my goal was introduce Alexa, the SDK for Node.js, create a simple skill, deploy it to Lamda and test it with the Echo, all during the presentation. I really wanted those in attendance to think "Wow, this looks pretty easy to work with...I think I'll give it a try myself".

Here is the [presentation](https://docs.google.com/presentation/d/1ICOJPCjiYj8cF1lPOZHCuHUz8TwKD915yghO2yA0PAw/edit?usp=sharing):

<iframe src="https://docs.google.com/presentation/d/1ICOJPCjiYj8cF1lPOZHCuHUz8TwKD915yghO2yA0PAw/embed?start=false&loop=false&delayms=3000" frameborder="0" width="750" height="450" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

The skill I used during the presentation was called "Guitar Ace" and is a skill that plays guitar chords and helps you tune your guitar.  The repository for the skill is located here: [https://github.com/bradymholt/alexa-guitar-ace](https://github.com/bradymholt/alexa-guitar-ace) and the bulk of the code is shown below:

```js
var Alexa = require("alexa-sdk");
var Resources = require("./resources");
var guitarResources = new Resources(
  "https://s3.amazonaws.com/alexa-guitar-ace"
);

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  LaunchRequest: function() {
    this.emit(
      ":ask",
      "Welcome to Guitar Ace. What do you want me to do?",
      "Say something like play G Major or help me tune my guitar."
    );
  },
  Tune: function() {
    this.emit(
      ":tell",
      `Happy Tuning <audio src="${guitarResources.getTuneAudioUri()}" />`
    );
  },
  PlayChord: function() {
    let slots = this.event.request.intent.slots;
    let root = slots["Root"].value || this.attributes["currentRoot"];
    let type = slots["Type"].value;

    if (!root && !type) {
      this.emit(
        ":ask",
        "Ok, what chord should I play?",
        "Just say the name of the chord."
      );
    } else if (root && guitarResources.hasRoot(root) && !type) {
      // User said root chord but not the type so ask them for the type

      // Save current root in session so we will have access to it next time
      this.attributes["currentRoot"] = root;

      this.emit(
        ":ask",
        `Sure, I can play the ${root} chord.  What type?`,
        `Say something like ${root} major or ${root} seven.`
      );
    } else {
      this.attributes["currentRoot"] = null;

      let chord = guitarResources.getChord(root, type);
      if (!chord) {
        this.emit(
          ":ask",
          "I do not know that chord.  Please say another chord",
          "Say something like C 7."
        );
      } else {
        this.emit(
          ":tellWithCard",
          `<audio src="${chord.audioUri}"/>`,
          chord.name,
          chord.name,
          { largeImageUrl: chord.imageUri, smallImageUrl: chord.imageUri }
        );
      }
    }
  },
  "AMAZON.HelpIntent": function() {
    this.emit(":tell", "Say something like play G Major or tune my guitar.");
  }
};
```
