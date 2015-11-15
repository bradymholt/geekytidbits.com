---
title: Ansible Module for Modifying JSON
author: Brady
layout: post
permalink: /ansible-module-modify-json/
---

I just recently finished a [side project in Node.js](https://github.com/bradyholt/arena-sheets) and decided to use Ansible for provisioning a [Digital Ocean](https://www.digitalocean.com/?refcode=974ef9a471c1) server
and deploying the app to it.  As part of the deploy playbook, I needed a way to set production specific config values in a JSON file.  There isn't a native way to do this in Ansible 
(that I know of at least) but I wrote a module to do it.  It works great and I thought I would share it here.

Say you've got a JSON file like the following:

_settings.json_      

<pre>
{
 "refresh_token": "",
 "password": ""
}
</pre>

Drop the module file [json_mod](https://gist.github.com/bradyholt/17cb99185c7b80b0f34a) (Gist below) in a folder name `/library` in your playbook directory and use it like this:

<pre>
- name: update config values
  json_mod:
    path: "settings.json"
    refresh_token: "AJDJKS839238AJKSJDKAD"
    password: "superSecurePassword"
</pre>

That's it.  The implementation is pretty simple and it only supports top level properties in the JSON file but I'd like to eventually improve it to support nested objects and array items 
using [this nify JavaScript function to access nested properties by key](http://stackoverflow.com/a/6491621/626911).

Here's the *json_mod* module.  Enjoy!
<script src="https://gist.github.com/bradyholt/17cb99185c7b80b0f34a.js"></script>