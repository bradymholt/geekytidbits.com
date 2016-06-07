
This blog is powered by [Jekyll](http://jekyllrb.com/), the blog-aware, static site generator built in Ruby.  It uses the [kramdown markdown engine](http://kramdown.gettalong.org/quickref.html).

# Provisioning

- Run ansible-playbook -i production provision.yml from `/ansible` directory

# Deployment 

- Add pushurl = [user]@www.geekytidbit.com:repos/geekytidbits.git to `.git/config` and run `git push`.
