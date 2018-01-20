#!/bin/bash
#
#    This script creates a new blog post with metadata in ./_posts
#    folder. Date will be generated according to the current time in
#    the system. Usage:
#
#        blog "My Blog Post Title"
#
# Source https://codereview.stackexchange.com/questions/158124/generate-a-jekyll-blog-post-template-using-shell

title=$1

if [ -z "$title" ]; then
    echo "usage: blog \"My New Blog\""
    exit 1
fi

bloghome=$(cd "$(dirname "$0")"; pwd)
url=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
filename="$(date +"%Y-%m-%d")-$url.md"
filepath=$bloghome/_posts/$filename

if [ -f filepath ]; then
    echo "$filepath already exists."
    exit 1
fi

cat >> $filepath <<DELIM
---
layout: post
title: "$title"
---
DELIM

echo "Blog created: $filepath"
$EDITOR $filepath --wait

read -p "Post? [Y/n] " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]] || [[ $REPLY = "" ]]
then
    git add $filepath
    git commit -m "New blog: ${title}"
    git push
#else
#    echo "Not published"
fi
