---
title: Ansible Module for Modifying JSON
author: Brady
layout: post
permalink: /ansible-module-modify-json/
---

I just recently finished a [side project in Node.js](https://github.com/bradymholt/arena-sheets) and decided to use Ansible for provisioning a [Digital Ocean](https://www.digitalocean.com/?refcode=974ef9a471c1) server
and deploying the app to it. As part of the deploy playbook, I needed a way to set production specific config values in a JSON file. There isn't a native way to do this in Ansible
(that I know of at least) but I wrote a module to do it. It works great and I thought I would share it here.

Say you've got a JSON file like the following:

_settings.json_

```json
{
  "refresh_token": "",
  "password": ""
}
```

Drop the module file [json_mod](https://gist.github.com/bradymholt/17cb99185c7b80b0f34a) in a folder name `/library` in your playbook directory and use it like this:

```yaml
- name: update config values
  json_mod:
    path: "settings.json"
    refresh_token: "AJDJKS839238AJKSJDKAD"
    password: "superSecurePassword"
```

That's it. The implementation is pretty simple and it only supports top level properties in the JSON file but I'd like to eventually improve it to support nested objects and array items
using [this nify JavaScript function to access nested properties by key](http://stackoverflow.com/a/6491621/626911).

Here's the _json_mod_ module. Enjoy!

```js
#!/usr/bin/env node

var fs = require("fs");
var args = fs.readFileSync(process.argv[2], "utf8");
var changed = false;

var jsonPath = null;
var json = null;
var keyValReplacementString = args.split(" ");
keyValReplacementString.forEach(function(i) {
  var keyVal = i.split("=");
  if (!keyVal[1]) {
    return;
  } else if (keyVal[0].indexOf("path") == 0) {
    jsonPath = stripQuotes(keyVal[1]);
  }
});

if (jsonPath) {
  json = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  keyValReplacementString.forEach(function(i) {
    var keyVal = i.split("=");
    if (keyVal[0].indexOf("path") == -1 && json[keyVal[0]]) {
      json[keyVal[0]] = stripQuotes(keyVal[1]);
    }
  });

  fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));
  changed = true;
}

function stripQuotes(text) {
  return text.replace(/["']*([^'"]+)['"]*"/g, "$1");
}

console.log(JSON.stringify({ changed: changed }));
```
