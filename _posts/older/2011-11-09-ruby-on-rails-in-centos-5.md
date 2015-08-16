---
title: Ruby on Rails in CentOS 5
author: Brady
layout: post
permalink: /ruby-on-rails-in-centos-5/
dsq_thread_id: 795 http://www.geekytidbits.com/?p=795
---
I recently started playing around with Ruby on Rails 3.1 to see what all the hype was about.  I&#8217;ve been working on a website for our neighborhood and decided to use RoR for it so I can learn it.  Rather than going the <a href="http://www.heroku.com/" target="_blank">Heroku</a> route, I wanted to host the site on my <a href="/setup-lamp-server-amazon-ec2/" target="_blank">Amazon EC2 instance running CentOS 5 64bit</a>.  Getting it setup on my server was a bit of a chore mostly because CentOS doesn&#8217;t have the latest and greatest packages.  Here are the steps I took to get a Rails site up and running.

## Ruby

The latest package offered by yum in CentOS 5 is too old to work with Rails 3.1 so we must build a newer one.

<pre>cd /tmp
wget http://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.2-p290.tar.gz
tar -zxvf ruby-1.9.2-p290.tar.gz
cd ruby-1.9.2-p290
./configure --prefix=/opt/ruby192 && make && make install
export PATH=$PATH:/opt/ruby192/bin
echo 'export PATH=$PATH:/opt/ruby192/bin' &gt; /etc/profile.d/ruby192.sh</pre>

## RubyGems

<pre>cd /tmp
wget http://rubyforge.org/frs/download.php/75309/rubygems-1.8.10.tgz
tar -zxvf rubygems-1.8.10.tar.gz
cd rubygems-1.8.10
ruby setup.rb</pre>

## Rails

<pre>gem install rails</pre>

## SQLite3

Although CentOS 5 has SQLite3 installed out of the box it is an older version so we must build a new one.

<pre>cd /tmp
wget http://www.sqlite.org/sqlite-autoconf-3070800.tar.gz
tar -zxvf sqlite-autoconf-3070800.tar.gz
cd sqlite-autoconf-3070800
./configure --prefix=/opt/sqlite3 && make && make install</pre>

## Passenger

<a href="http://www.modrails.com/" target="_blank">Phusion Passenger</a> makes running rails apps with Apache a cinch.  Run the following:

<pre>gem install passenger
passenger-install-apache2-module</pre>

The installation has nice walk-through instructions.  Basically, after the install, you will be placing the following in a new apache config file such as /etc/httpd/conf.d/rails_whatever.conf

<pre>LoadModule passenger_module /opt/ruby192/lib/ruby/gems/1.9.1/gems/passenger-3.0.9/ext/apache2/mod_passenger.so
PassengerRoot /opt/ruby192/lib/ruby/gems/1.9.1/gems/passenger-3.0.9
PassengerRuby /opt/ruby192/bin/ruby

&lt;VirtualHost *:80&gt;
 ServerName www.yourhost.com
 DocumentRoot /opt/somewhere/public    # &lt;-- be sure to point to 'public'!
 &lt;Directory /opt/somewhere/public&gt;
   AllowOverride all              # &lt;-- relax Apache security settings
   Options -MultiViews            # &lt;-- MultiViews must be turned off
 &lt;/Directory&gt;
&lt;/VirtualHost&gt;</pre>

## New Rails Site

<pre>cd /opt
rails new somewhere</pre>

So at this point I got a bundle error about problems installing sqlite-ruby. Don&#8217;t fret.  Add the following to /opt/somewhere/Gemfile below gem &#8216;rails&#8217;, &#8216;3.1.1&#8217;:

<pre>gem 'execjs'
gem 'therubyracer'</pre>

Now run the following:

<pre>bundle config build.sqlite3 --with-sqlite3-include=/opt/sqlite3 --with-sqlite3-lib=/opt/sqlite3
 --with-sqlite3-dir=/opt/sqlite3
bundle update
chown -R apache /opt/somewhere</pre>

## Create Database

<pre>rake db:migrate RAILS_ENV="production"</pre>

## Fire it Up

<pre>service httpd restart</pre>

Open a browser and go to www.yoursite.com.  If you see the Rails test page then you are up and running!
