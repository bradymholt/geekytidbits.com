#!/bin/bash
#
#    This script creates a new blog post with metadata in ./_posts
#    folder. Date will be generated according to the current time in
#    the system.  Source: https://codereview.stackexchange.com/questions/158124/generate-a-jekyll-blog-post-template-using-shell
#
# Usage:
#   newpost.sh "My Blog Post Title"
#

title=$1

if [ -z "$title" ]; then
    echo "usage: blog \"My New Blog\""
    exit 1
fi

bloghome=$(cd "$(dirname "$0")"; pwd)
url=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
filename="$(date +"%Y-%m-%d")-$url.md"
filepath=$bloghome/_posts/$filename

# Create post file
cat >> $filepath <<DELIM
---
layout: post
title: "$title"
---
DELIM

echo "Post file created: $filepath"

# Open in editor
$EDITOR $filepath --wait

read -p "Do you want to publish this post? [Y/n] " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]] || [[ $REPLY = "" ]]
then
    # Commit and push
    git add $filepath
    git commit -m "New blog: ${title}"
    git push
#else
#    echo "Not published"
fi
