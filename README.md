
This blog is powered by [Jekyll](http://jekyllrb.com/), the blog-aware, static site generator built in Ruby.

# Provisioning

- Run ansible-playbook -i production provision.yml from `/ansible` directory

# Deployment 

- Add pushurl = [user]@www.geekytidbit.com:repos/geekytidbits.git to `.git/config` and run `git push`.
