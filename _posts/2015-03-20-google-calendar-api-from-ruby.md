---
title: Google Calendar API from Ruby
author: Brady
layout: post
permalink: /google-calendar-api-from-ruby/
dsq_thread_id: 2170 http://www.geekytidbits.com/?p=2170
---
I have a Rails app that needs to sync events to a Google Calendar and I had been using the [gcal4ruby](https://github.com/SeabourneConsulting/GCal4Ruby) gem to do this.  However, back in November 2014, Google deprecated the v1 and v2 Google Calendar API.  This gem does not use the newer v3 API so I had to make a change.

I decided to use the [official Google API Client for Ruby][2].  It took a bit of time to get up to speed with using this client, particularly because of the OAuth authentication requirement in v3 of the API.

The steps to get setup are:

  1. Go to Google Developers Console &#8211; <https://console.developers.google.com/project>
  2. Create a new Project
  3. Go to Project > APIs & Auth > **Credentials**
  4. Create **New Client ID** (OAuth).  Pay attention to the Authorized Redirect Uris; these are the Uris allowed to be redirected to when requesting authorization via OAuth.  This (or these) Uris should be a page you can receive a GET request on after OAuth authorization is given by a Google Account owner.
  5. Click **Download JSON.  **This will download a JSON file with all the app credentials (token / secret) needed to authenticate when connecting with the client.
  6. Rename the file downloaded above to **client_secrets.json** and move it to the same directory your app is running.

[<img src="/media/google_developer_console.png" alt="Google Developer Console"/>][3]

Once you create the app and get your client secrets file in place, you are ready to start using the client.  Here is some example Ruby code that demonstrates how to connect, authenticate, and perform basic Google Calendar API operations like querying for a list of events, adding, and updating.

{% gist bradyholt/944f129fea3d92b8c26b %}

 [2]: https://github.com/google/google-api-ruby-client
 [3]: /wp-content/uploads/google_developer_console.png
