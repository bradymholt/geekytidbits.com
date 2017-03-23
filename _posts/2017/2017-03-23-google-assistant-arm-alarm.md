---
title: Using Google Assistant to Arm my House Alarm
author: Brady
layout: post
permalink: /google-assistant-arm-alarm
---

I've had a [Google Home](https://madeby.google.com/home/) up and running at the house for about two month and finally decided to create a Google Assistant Action for it.  I already have [vistaicm-server](https://github.com/bradyholt/vistaicm-server) running and connected to my Honeywell Vista 20P alarm panel so I thought I would create an Action so I could arm and disarm my house alarm system with my voice.

The [Actions Overview](https://developers.google.com/actions/) points you to [API.AI](https://api.ai/) because using it makes Action development very easy.  I started building the Action out in the API.AI interface but I ran into 2 issues:
- Once deployed for "Preview", the Action is only available for 30 minutes.  That wasn't going to work.  I ended up figuring out how to get around this (and [posted the solution on StackOverflow](http://stackoverflow.com/questions/41088596/make-google-actions-development-project-preview-persist-longer/41205026#41205026)).
- API.AI abstracts some of the details of the [Conversation API](https://developers.google.com/actions/reference/conversation) which was a bit frustrating sometimes because I wanted to learn it and have more control over it.

Somewhere along the way I realized I didn't need to go through API.AI and it would be a bit more of a learning experience to not do so.  It turns out that writing the Action by hand is not terribly hard.

Below is what I learned and how I got it all setup.

## Overview

A Google Assistant Action has 2 main components:

1. Action Package - a JSON manifest that describes all the metadata about your action in addition to how users invoke and provide input to your action.
2. Fulfillment - a service that you provide which conforms to the Conversation API](https://developers.google.com/actions/reference/conversation) and ultimately fulfills the user's request.

### Action Package

The Action Package I ended up with is fairly simple.

```
{
  "name": "tiger",
  [...]
  "actions": [
    [...]
    {
      "description": "alarm",
      "initialTrigger": {
        "intent": "ALARM",
        "queryPatterns": [
            { "queryPattern": "to $alarm-status:alarm-status" },
            { "queryPattern": "to $alarm-status:alarm-status the alarm" },
            { "queryPattern": "$alarm-status:alarm-status the alarm" }
          ]
      },
      "httpExecution": { "url": "https://[aws_lambda_endpoint_url_here.com]" }
    },
  ],
  "customTypes": [
    {
      "name": "$alarm-status",
      "items": [
          {"key": "arm", "synonyms": ["arm"]},
          {"key": "disarm", "synonyms": ["disarm"]}
      ]
    }
    [...]
```

Let's break down the important parts:

- **name**: This is the name of the Action ("tiger") but _does not_ define the "invocation name" (keyword that Google Assistant uses to launch your Action).  The invocation name is defined at the time the Action package is deployed.
- **intent**: This is
- **queryPatterns**: These are the speech patterns that Google Assistant will recognize.
- **httpExecution**: This is the endpoint URI for the fulfillment service which implements the Conversation API.
- **customTypes**: These are word variables (if you will) and allow you to define a list of words that can be used in a slot.  You can reference a customType in your queryPatterns.

With this setup, I can say any of the following:

- Hey Google, tell tiger to arm (via the `to $alarm-status:alarm-status` queryPattern)
- Hey Google, tell tiger to arm the alarm (via the `to $alarm-status:alarm-status the alarm` queryPattern)
- Hey Google, tell tiger arm the alarm (via the `$alarm-status:alarm-status the alarm` queryPattern)

### Fulfillment

There is a npm package called [actions-on-google](https://www.npmjs.com/package/actions-on-google) that is the client library for implementing the Conversation API in Node.  This client makes it super easy to create a fulfillment service.

Here is what my service looks like:

```
var ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;
var assistant = new ActionsSdkAssistant({ request: assistantRequest, response: assistantResponse });
var actionMap = new Map();

function mainIntent(assistant) {
  assistant.tell("You can say something like tell tiger to arm the alarm or tell tiger to open the left garage door.");
}

function alarmIntent(assistant) {
  var status = assistant.getArgument("alarm-status"); // alarm-status is a customType
  var tellSpeech = null;
  var commandUrlPrefix = "http://vistaicmHost:2945/execute?command=";
  var commandUrl = "";

  if (status == "arm") {
      commandUrl = commandUrlPrefix + "arm";
      tellSpeech = "All secure!";
  } else if (status == "disarm") {
      commandUrl = commandUrlPrefix + "disarm"
      tellSpeech = "Disarmed!";
  }

  console.log("GET " + commandUrl);
  http.get(commandUrl, (response) => {
      assistant.tell(tellSpeech);
  }).on('error', (e) => {
      console.log(`Error: ${e.message}`);
      assistant.tell("Sorry, there was an error when trying to communicate with the house.");
  });
}

// Action map: For each intent defined in the Action Package, define the handler for it.
// The assistant.StandardIntents.MAIN intent is a special and implicitly define intent
// for when the user engages with the Action but does not give it a specific command that
// matches one of the query queryPatterns.

actionMap.set(assistant.StandardIntents.MAIN, mainIntent);
actionMap.set("ALARM", alarmIntent);

assistant.handleRequest(actionMap);
```

## google-action-tiger

After some refining, the final result is a project called [google-action-tiger](https://github.com/bradyholt/google-action-tiger).  This project contains all the necessary parts for the Action: The action package, fulfillment code, and provisioning (i.e. "deploy") script.  I decided to host the fulfillment service on AWS Lambda because it is really suitable for this type of type of application, especially since HTTPS is baked in.

## Usage

In a gist, to get up and running all you need to do is:

1. Install [dependencies](https://github.com/bradyholt/google-action-tiger#dependencies) per the README (including AWS and gactions CLI)
2. Create an AWS Lambda function
3. Create a config file, using config.example as a template
4. Run `./deploy.sh`

The detailed instructions are located on the [README](https://github.com/bradyholt/google-action-tiger/blob/master/README.md).

I really like how everything is in a single repository and updates are deployed simply by running `./deploy`.

### deploy.sh
I decided to use a bash script for the `deploy.sh` (rather than node) script because the primary interaction is with the AWS and gactions CLI and doing that from node would have ended up just being a bunch of spawning of child processes.  Wanting to use the `config` file for _all_ config but also update the `actions.json` file with the `httpExecution.url` from `config` without creating a node script was a little tricky but I settled on passing straight JavsScript code to node using the `-e` parameter [here](https://github.com/bradyholt/google-action-tiger/blob/master/deploy-google-assistant.sh#L10).  I am quite happy with how the `deploy.sh` file turned out.

