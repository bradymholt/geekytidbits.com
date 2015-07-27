---
title: Simple Deploy Script for Rails
author: Brady
layout: post
permalink: /simple-deploy-script-rail/
dsq_thread_id: 1381 http://www.geekytidbits.com/?p=1381
---
I&#8217;ve been working with Rails more and more recently on some personal projects and have to say I really like it.  It&#8217;s been very beneficial to get outside the box of .NET for awhile and work with a framework like Rails because it has helped me learn new things and approach common problems from a different angle.

One of the obvious things I needed to do with some of my Rails projects was to deploy them to a production server.  It seems like the majority of Rails community either deploys to <a href="https://www.heroku.com/" target="_blank">Heroku</a> or uses <a href="https://github.com/capistrano/capistrano" target="_blank">Capistrano</a> to deploy to a Linux box.  I decided against Heroku b/c I already have an Amazon EC2 server that I would like to utilize.  Also, I actually like having full control over a production server whereas one of the largest appeals of Heroku is to &#8220;Forget Servers&#8221; as they put it on their own website.  I almost dove in head first to the world of Capistrano but got cold feet as it seemed a bit too heavy.  With Capistrano, there is a bit of a learning curve (see &#8216;recipes&#8217;) and heavy setup based on assumptions.  I just want to deploy my app!

Anyway, I came up with the following script that I have dropped in my Rails project script folders.  I just run ./script/deploy.sh from my web folder, wait a minute and my Rails app is updated in production. Easy cheesy. This script handles runnings tests, local asset pre-compilation, rsync copy to remote server, bundle install, database migrations, and some misc cleanup tasks.  It works like a champ and it&#8217;s simple.

Yes, there are still a few assumptions here.  You still need to setup the production server  (I use Nginx and Phusion Passenger) and have the ability to ssh to the server.  Once you have everything setup, this script is perfect for pushing incremental releases to production.

<pre class="brush: bash;">#!/bin/bash
#deploy.sh

#PREP
USER_HOST="bholt@myserver.com"
REMOTE_DIR="~/web/myproj"
set -e #exit on any error
git pull

#LOCAL
#run tests
bundle exec rake test
#clear temp files
bundle exec rake tmp:clear
#precompile assets
bundle exec rake assets:precompile
#copy files
rsync -rvuz ./ ${USER_HOST}:${REMOTE_DIR} --exclude='.git/' --exclude='log/' --exclude='tmp/cache' --delete
#clear tmp files after precompile
bundle exec rake tmp:clear

#REMOTE
#bundle install
ssh ${USER_HOST} 'cd ${REMOTE_DIR} && bundle install'
#database migrate
ssh ${USER_HOST} 'cd ${REMOTE_DIR} && bundle exec rake db:migrate RAILS_ENV="production"'
#clear temp files
ssh ${USER_HOST} 'cd ${REMOTE_DIR} && bundle exec rake tmp:clear'
#clear log files
ssh ${USER_HOST} 'cd ${REMOTE_DIR} && bundle exec rake log:clear'
#restart app
ssh ${USER_HOST} 'touch ${REMOTE_DIR}/tmp/restart.txt'

echo "Deploy Successful!"</pre>
