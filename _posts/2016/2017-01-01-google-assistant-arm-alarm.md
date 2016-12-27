---
title: Using Google Assistant to Arm my House Alarm
author: Brady
layout: post
permalink: /google-assistant-arm-alarm
---

I've had a Google Home up and running at the house for about a month and finally decided to create a Google Assistant Action for it.  I already have [vistaicm-server](https://github.com/bradyholt/vistaicm-server) up and running so I thought I would create an action to control my Honeywell Vista 20P alarm panel.

I started out in the API.ai interface but I found that once deployed, the Action is only available for 30 minutes.  That wasn't going to work.  I ended up figuring out how to get around this (and [posted the solution on StackOverflow](http://stackoverflow.com/questions/41088596/make-google-actions-development-project-preview-persist-longer/41205026#41205026)) but somewhere along the way I realized I didn't need to go through API.ai and it would be a bit more of a learning experience to not do so.

## vistaicm-server

https://github.com/bradyholt/vistaicm-server

This project is a blah blah blah.

## google-action-tiger

https://github.com/bradyholt/google-action-tiger

I created a repository with all the assets and instructions.  In a gist, all you need to do is:

1. Install dependencies (including AWS and gactions CLI)
2. Create an AWS Lambda function
3. Create a config file, using config.example as a template
4. Run `./deploy.sh`

The detailed instructions are located on the [README](https://github.com/bradyholt/google-action-tiger/blob/master/README.md).

I really like how everything is in a single repository and updates are deployed simply by running `./deploy`.

On a side note, I decided to use a bash script for the `deploy.sh` (rather than node) script because the primary interaction is with the AWS and gactions CLI and doing that from node would have ended up just being a bunch of spawning of child processes.  Wanting to use the `config` file for _all_ config but also update the `actions.json` file with the `httpExecution.url` from `config` without creating a node script was a little tricky but I settled on passing straight JavsScript code to node using the `-e` parameter [here](https://github.com/bradyholt/google-action-tiger/blob/master/deploy.sh#L10).  I am quite happy with how the `deploy.sh` file turned out.

