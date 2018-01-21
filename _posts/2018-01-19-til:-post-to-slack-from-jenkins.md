---
layout: post
title: "TIL: Post to Slack from Jenkins with curl"
---

I recently needed to post to Slack from a Jenkins build but since the [Slack Plugin](https://wiki.jenkins.io/display/JENKINS/Slack+Plugin) for Jenkins doesn't provide fine-grained configuration, I used a curl script in a post-build script.

First, I went created a new [Jenkins CI configuration](https://my.slack.com/services/new/jenkins-ci) in Slack and noted the token it gave me (`$SLACK_API_TOKEN` below). Then, this is the curl script I used:

```shell
if [ "$GIT_BRANCH" = "origin/master" ]
then
curl -X POST -H "Content-Type: application/json" \
 -d '{"text":"'"$JOB_NAME"' - #'"$BUILD_NUMBER"' Failed on '"$GIT_BRANCH"' branch - '"$BUILD_URL"'"}' \
 "https://[domain].slack.com/services/hooks/jenkins-ci?token=$SLACK_API_TOKEN"
fi
```
