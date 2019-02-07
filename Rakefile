task :serve do
  sh 'jekyll serve'
end

task :provision do
  sh 'ansible-playbook -i ops/config.yml ops/provision.yml'
end

task :deploy do
  sh 'jekyll build && rsync -vr _site/ 45.55.125.52:/home/bholt/apps/geekytidbits'
end

task :commit_push do
  # Commit and push
  sh 'git add --all'
  git commit -m "Updates from rake commit_push"
  sh 'git push'  
end

task :publish => [:commit_push, :deploy]
