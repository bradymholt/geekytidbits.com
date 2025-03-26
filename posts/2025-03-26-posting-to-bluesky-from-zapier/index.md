---
title: Posting to Bluesky from Zapier (for free)
---

Zapier recently added a [Bluesky app](https://zapier.com/apps/bluesky/integrations) but unfortunately it is designated as Premium. This means that you need to pay for a Zapier subscription to use it. However, you can still post to Bluesky using the [Code by Zapier app](https://zapier.com/apps/code/integrations), which is free to use.

Here's how to do it!

1. First of all, you'll need to create a Bluesky app password to use.  Go to [https://bsky.app/settings/app-passwords](https://bsky.app/settings/app-passwords) and generate a password for use later in these steps.
1. **Create a new Zap**: Go to your Zapier dashboard, select "Zaps" in sidebar, and then click "+ Create > New Zap".
1. **Choose a Trigger**: Select the app and event that will trigger the Zap in the first step of the Zap. For example, you can use "RSS by Zapier" to post new items from an RSS feed.  Edit the details for this trigger per your specific needs.
1. **Choose an Action**: In the second step, click "Action" and select "Code" (Code by Zapier).  Then, do the following steps:
   1. Choose "Run JavaScript" as the action event then click "Continue".
   1. Add 3 items for "Input Data" and provide the values.
      - `username`: Your Bluesky username (without the @ symbol; for example "bradymholt.bsky.social" ).
      - `password`: Your Bluesky password.
      - `post_text`: The text you want to post to Bluesky.  You'll likely want to use a variable from the trigger step here.
   1. Paste in the following code:

      ```js
      const sessionResponse = await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", {
          method: 'POST',
          body: JSON.stringify({
              identifier: inputData['username'], password: inputData['password']
          }),
          headers: {
              'Content-Type': 'application/json'
          },
          redirect: 'manual'
      });

      // Check if the response status is OK
      if (!sessionResponse.ok) {
          console.error('Failed request', await sessionResponse.text());
          return null;
      }

      const responseBody = await sessionResponse.json();

      if (!responseBody.accessJwt) {
          console.error('accessJwt not found in the response');
          return null;
      }

      const postText = inputData['post_text']};

      const recordData = {
          "$type": "app.bsky.feed.post",
          "text": postText,
          "createdAt": new Date().toISOString()
      };

      const postData = {
          repo: inputData['username'],
          collection: 'app.bsky.feed.post',
          record: recordData
      };

      const postResponse = await fetch("https://bsky.social/xrpc/com.atproto.repo.createRecord", {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${responseBody.accessJwt}`
          }
      });

      if (!postResponse.ok) {
          console.error('Failed request', await postResponse.text());
          output = {
              success: false,
              message: "Failed to create record"
          };
          return;
      }

      const postResponseBody = await postResponse.json();
      if (!postResponseBody.success) {
          console.error('Failed to create record', postResponseBody.message);
          output = {
              success: false,
              message: postResponseBody.message
          };
          return;
      }

      output = {
          success: true
      };
      ```
  1. Click "Continue" to test the action and complete the setup.




That's it!  Enjoy.
