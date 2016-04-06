
This blog is powered by [Jekyll](http://jekyllrb.com/), the blog-aware, static site generator built in Ruby.

~~[twitterfeed](http://twitterfeed.com/dashboard) is configured to listen for new post on [http://www.geekytidbits.com/feed/](http://www.geekytidbits.com/feed/) and post to Twitter and LinkedIn.~~

# Provisioning

- Run ansible-playbook -i production provision.yml from `/ansible` directory

# Deployment 

- Add pushurl = [user]@www.geekytidbit.com:repos/geekytidbits.git to `.git/config` and run `git push`.
