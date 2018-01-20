---
layout: post
title: "TIL: Post to Slack from Jenkins"
---

I recently needed to post to Slack from a Jenkins build but since the [Slack Plugin](https://wiki.jenkins.io/display/JENKINS/Slack+Plugin) for Jenkins doesn't provide fine-grained configuration, I used a curl script in a post-build script.

Here's what I used:

{% gist bradymholt/f67f61d5a6f655970f48bae4057b0d5f %}
