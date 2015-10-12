---
title: Posting To Facebook with Rails
author: Brady
layout: post
permalink: /facebook-posts-from-rails/
---
Awhile back I developed a Rails app I call "veritas" ([GitHub](https://github.com/bradyholt/veritas)) that is intended to help organize community around a group of people.  It was primarily developer for the class my wife and I attend at our church.  It allows us to keep a contact list of members with photos, a calendar of events,  signups management (class breakfast, baby meals, etc.), sending of SMS messages, and manages the publishing of our class podcast.  I know, there are bazillion sites out there that can do these things but it was fun to build and I was able to customize it just how I wanted it.  One of the features I added was the ability to post a message to our class Facebook group page when a new podcast is posted or there is a new signup available.  You know, it posts a message to Facebook that says something like, "A new signup is available to brings meals to the Smith's because they just had a baby!  Click here to signup [link]".

To do this, I utilized the well written gem [koala](https://github.com/arsduo/koala) to interface with Facebook's Graph API.  I have an aptly named module called [FacebookGroupPoster](https://github.com/bradyholt/veritas/blob/bcd394ceaf8546f769e58975ccd7a9e1a20a6327/lib/facebook_group_poster.rb)  that encapsulates the usage of koala so I have a clean interface to call from my app.  In a simplified form, posting a message to our Facebook group when a new podcast is published looks like this:

<pre>
podcast_date = podcast.date.strftime('%m/%d')
graph = Koala::Facebook::API.new(settings.facebook_access_token)
graph.put_object(settings.facebook_group_id, "feed", {
    :name => "#{podcast.title} - #{podcast.speaker}, #{podcast_date}",
    :link => podcast.audio_url,
    :message => "New Podcast for #{podcast_date} is Available!"
})
</pre>

That's pretty simple.  However, there are two things that are a little tricky.  Notice that you need both the *Group ID* and an *Access Token* to successfully post something.

## Group ID

I'm sure there is a fancy way to get through the Facebook Graph API but what I did was just go to our group page, and then click "Manage Group" (You have to be a group admin).  When you do this, the Group ID is exposed in the URL of the page.  Easy cheesy.

![Group ID](/media/fb_manage_group.png)
![Group ID](/media/fb_group_id_url.png)

## Access Token

The Graph API utilizes OAuth for authentication so to be properly authenticated you must obtain an access token.  This token gives an app *revokable* and *limited* permissions to do something on Facebook without requiring a user to provide their username/password credentials to a third party.  From a Facebook user's perspective, this is a great think as it is much more secure.  From a development perspective however, it's quite a pain to get it all setup.  When I used the [Google Calendar API with OAuth](/google-calendar-api-from-ruby/) awhile back, I experienced the pain first hand.  Although that post might appear to make it seem like it was trivial to interact with Google Calendar API, it was not.  Things seem easy in hindsight don't they?

Fortunately I found a series of steps that making obtaining an Access Code fairly straightforward.  **The following method of obtaining an  access token for posting to Facebook will only work for posting from your own Facebook account.**  If you need to post of behalf of other people or you want the posts to come from an "app" directly, you'll have to do some more work (app approval, setting up webpage request handler, etc.) which I don't cover here.

Anyway, this is what you need to do:

1. Go to the Facebook Developers page - [https://developers.facebook.com](https://developers.facebook.com)
2. Create a new application; when it asks for the type, specify "Website".  
3. Skip all the other non-required settings it prompts you for
4. Go to the Graph API Explorer - [https://developers.facebook.com/tools/explorer/](https://developers.facebook.com/tools/explorer/)
5. Select your new application on the top right
6. Click "Get Token" > "Get "Access Token" ![Graph API Explorer](/media/fb_graph_explorer.png)
7. When asked which permissions you will need, select `user_posts` and `publish_actions` (at the very least).
8. Continue through the prompts; you will be asked to grant your new application some permissions on your own personal Facebook account.

![Grant Access](/media/fb_grant_access.png)

Grant the requested permissions and you will be taken back to the Graph API Explorer and a new *Access Token* will be filled in at the top.  This is the access token you need to pass to koala to start posting!

![Grant Access](/media/fb_access_key.png)
