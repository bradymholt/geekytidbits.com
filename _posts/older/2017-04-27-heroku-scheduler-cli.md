---
title: Running Heroku CLI from Heroku Scheduler
author: Brady
layout: post
permalink: /heroku-scheduler-cli
---

The Heroku Scheduler is a simple and handy add-on for any Heroku application, to run recurring commands.  I recently had the need to run a Heroku CLI command from within the Scheduler itself.  Why would you need to do such a thing?  In my case, at [YNAB](https://youneedabudget.com), we have an app pipeline which includes a staging app for our marketing site.  We don't want this staging app running all the time for various reasons, including not wanting others to accidently stuble upon it and not wanting search engines to crawl it.  So, we wanted to put the app in maintenace mode on a scheduled basis.  When we deploy an update to the staging app we take the app out of maintenance mode as part of the deployment process but then we want the Scheduler to automatically take it back into maintence mode.

There are other uses cases for this as well:

1. Automatically promoting apps within a pipeline
2. Database management such as forking, attaching to another app, etc.
3. Management of any third-party addons
4. Scaling up/down on a scheduled basis (scale up to 2 dynos in the morning; back down to 1 in the evening)

Here's a how I got it to work.

1. First, head to your _Manage Account_ page within Heroku and grab your **API Key**.  You'll need to click the _Reveal_ button first to see it and to be able to copy it.
![Heroku API Key](/media/heroku_api_key.png){: .block }
2. Now, head over to app _Settings_ page and click  **Config Vars**.
![Heroku Config Vars](/media/heroku_config_vars.png){: .block }
3. Add a new var with the KEY of `HEROKU_API_KEY` and VALUE of the API Key you copied earlier.  Click the _Add_ button to save it.
![Heroku New Config Var](/media/heroku_config_var_new.png){: .block }
4. On the app _Resources_ page, click on _Heroku Scheduler_ (add it as an Add-on first if you haven't already done so) to manage its settings.
![Heroku Scheduler](/media/heroku_scheduler.png){: .block }
5. Click "Add New Job" and then enter this command:
<pre>
curl -s https://s3.amazonaws.com/assets.heroku.com/heroku-client/heroku-client.tgz \
  | tar xz && ./heroku-client/bin/heroku [command] -a [app_name]
</pre>

In my above described scenario where I want to put my app in mainteannce mode, my command looks like this:

<pre>
curl -s https://s3.amazonaws.com/assets.heroku.com/heroku-client/heroku-client.tgz \
  | tar xz && ./heroku-client/bin/heroku maintenance:on -a stark-bakin-2764
</pre>
![Heroku Add Jost](/media/heroku_add_job.png){: .block }
6. Save the new job and you are done.  It will now run on a schedule.