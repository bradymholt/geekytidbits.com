---
title: Moving my Rails app to DigitalOcean with Ansible
author: Brady
layout: post
permalink: /rails-digitalocean-ansible/
dsq_thread_id: 2232 http://www.geekytidbits.com/?p=2232
---
I recently moved my Rails app to a $5/month [DigitalOcean](https://www.digitalocean.com/?refcode=974ef9a471c1) server and used [Ansible](http://www.ansible.com/) to do it. It was fun and really eye opening about the power of Ansible as a configuration management and orchestration tool. I assimilated some playbooks and was up and running in no time. To build the server from the ground up I ran:

    ansible-playbook -i production provision.yml


**Poof**. Ansible installed and configured everything I needed to run my app.

  * Nginx
  * Phusion Passenger
  * MySQL
  * Ruby.
  * Automatic backups of MySQL to S3

Did I forget a setting tweak for MySQL or a config entry for Nginx? Easy; just make a simple change to my Ansible playbook and run it again. No big deal. All that was left to do now was deploy my app! Oh, Ansible works great for that too. To deploy my app I just ran:

    ansible-playbook -i production deploy.yml


**Poof**. App deployed; up and running. No [Capistrano][3] needed. It did all this:

  * `rake assets:precompile` (locally)
  * Files copied
  * database.yml updated on the fly with my production credentials
  * `bundle install`
  * `rake db:migrate`

## The Back Story

I&#8217;ve been running one of my Rails apps on a reserved [Amazon EC2][4] instance for about 4 years now. My reservation expired and my monthly bill has gone up to about $18. That price reflects some data I have stored on S3 as well. Since the app is a side project I really don&#8217;t want to pay much to host it but still do like having a full blown virtual server. I decided to move it over to [DigitalOcean][https://www.digitalocean.com/?refcode=974ef9a471c1] because they offer a 512MB/20GB *SSD \*server for $5/month.  That&#8217;s hard to beat, \*especially* considering they have SSD drives!  There was just one hitch.  

When I setup my EC2 box 4 years, I did so by tinkering the config over the course of a week or so to get everything up and running.  And that was just the initial setup.  There were many more one-off tweaks over the last few years to get things just so.  I was honestly dreading building up the server again because it was a lot of work.  I actually have fun with the tinkering, if I&#8217;m being honest, but the initial time to get it up and running had me dreading the plunge.  Here&#8217;s a sample of what needs to be done:

  * Create a user; give appropriate permission to this user (i.e. add SSH public key in authorized_keys)
  * Install Nginx, Passenger, RVM / Ruby, MySQL
  * Configure Nginx and MySQL
  * Deploy my app and make sure all document root permissions are correct
  * Setup cron jobs to run recurring rake tasks
  * Setup daily MySQL backups to S3
  * Test the app; iron out any config issues

That&#8217;s a lot of stuff, and could easily take hours; more hours if I get hung up somewhere along the way. However, I have recently started working with [Ansible][5] at work and decided this just might be a good use for it. Ansible is a DevOps configuration management and orchestration tool that can handle provisioning and deployments, based on simple .yml text file configs. You simply construct how you want your server to look and then run it.  It takes an idempotent approach so that you can run the script (&#8220;playbook&#8221;) multiple times and it will only change/update what needs to be updated.  The cool thing about Ansible, and other tools like it (Chef, Puppet, etc.) is that there are reusable scripts out there that you can just grab and run.  Setting up a Rails server is so common and there are tons of pr-ebuilt playbooks on [Ansible Galaxy][6] that you can just download, run, and *poof*, your server is built.

I downloaded a few playbooks, made a few tweaks to my liking and and was able to get the server up and running without much effort! Maybe an hour? Best of all, now that I have this Ansible playbook, I could destroy and rebuild the server, move to another cloud provider with ease, and use it to setup any other Rails webapp. That&#8217;s awesome.

I broke the Ansible config up into 2 playbook: 1) provision and 2) deploy. This way I can use the provision script initially to build the new server up and/or to make provisioning type changes when needed. For instance, if I wanted to install a different SMTP server or update the Ruby version I would use the provisioning playbook. The deploy playbook is obviously for deploying the Rails app and will be used much more often. The deploy playbook takes the place of a tool like [Capistrano][3], which most people use to deploy Rails. That&#8217;s the great thing about Ansible; you can use it anything DevOps related.

I created a GitHub repository with the playbooks for others to enjoy here: <https://github.com/bradyholt/ansible-rails>

 [3]: http://capistranorb.com/
 [4]: http://aws.amazon.com/ec2/
 [5]: http://www.ansible.com/home
 [6]: https://galaxy.ansible.com/
