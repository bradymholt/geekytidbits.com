---
title: GitHub Actions Version and Release to npm
---

I have been playing with [GitHub Actions](https://github.com/features/actions) quite a bit recently at YNAB and for some personal projects and it has been fun.  Most recently I got [xertz](https://github.com/bradymholt/xertz), my static site generator project, running on GitHub Actions for build/test and releases to the npm registry.

I wanted to walk through the workflow I wrote to release a new version to the npm registry.  With this workflow, when I merge a PR, a new release will be tagged and pushed up to npm.  This is one less thing I have to do manually when I want to get a change out to a package I manage.  Automated scripts for deploying to npm are certainly not a new things but getting this working on GitHub Actions was a new thing for me.

The full workflow script is [in the xertz repository](https://github.com/bradymholt/xertz/blob/master/.github/workflows/publish.yml) so if you just want to take a quick look, please do.

Below, I will work through the script.

## Walkthrough

The first bit is the trigger clause:

```yaml
name: Publish to npm Registry

on:
  pull_request:
    types: closed
```

 When should GitHub Actions run this workflow?  Any time a Pull Request is closed.  But, I actually only want it to run when a PR is _merged_ and I want it to run on the master branch.  Those additional filters will come later.

Now, the next bit simply names the first (and only) job in the workflow "publish" and tells GitHub Actions to run it on the latest supported version of Ubuntu.  This is pretty standard stuff:

```yaml
jobs:
  publish:
    runs-on: ubuntu-latest
```

Now we get to the main part of the workflow.  The steps.  These are the steps the "publish" job will run, in sequential order.  Above, I told this workflow to trigger on pull requests being closed.  Here, I will tell it to only trigger if a pull request is closed _because_ it was merged (`if: github.event.pull_request.merged`).  Also, I'll specify that I want the workflow to checkout and use the _master_ branch (`refs/heads/master`).

```yaml
steps:
  - uses: actions/checkout@v1
    if: github.event.pull_request.merged
    with:
      ref: refs/heads/master
```

So far, my workflow will run using the latest commit on the master branch, after a Pull Request is merged.  Next, I'll specify I want it to use Node.js version 8 and to run `npm install` to make sure all the dependent packages are installed:

```yaml
- name: Install Node.js
  uses: actions/setup-node@v1
  with:
    node-version: 8
- name: npm install
  run: npm install
```
Next, I'm going to setup some git config (user.name and user.email) in preparation of pushing new git tags up to GitHub.  `$GITHUB_ACTOR` is an automatically available environment variable and is the "the name of the person or app that initiated the workflow", which in this case will be my down GitHub username (bradymholt) since I will be the one merging Pull Requests which triggers the workflow.

```yaml
- name: version and publish
  run: |
    git config user.name $GITHUB_ACTOR
    git config user.email gh-actions-${GITHUB_ACTOR}@github.com
```

Next, I'll login to npm through the CLI.  `$NPM_API_TOKEN` is a token I generated on my npm account and stored as a GitHub [Secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/virtual-environments-for-github-hosted-runners#creating-and-using-secrets-encrypted-variables) on the repository, and then exposed as an environment variable (see below).

```yaml
npm config set //registry.npmjs.org/:_authToken=$NPM_API_TOKEN
```

Ok, now I'll do some standard npm commands to version and publish my package:

```yaml
npm version minor --force -m "Version %s"
npm publish
```

By default, when you use `npm version` (as I did above), it will create a git version commit and tag.  I want to push both of these back up to GitHub
to keep track of them.  So, here, I will add the GitHub remote and push to it. `$GITHUB_TOKEN` is a built-in secret, exposed as an environment variable (see below), with access to the repository.  `$GITHUB_REPOSITORY` is also a built-in environment variable referencing the, well, repository name which in this case is "bradymholt/xertz".

```yaml
git remote add gh-origin https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git
git push gh-origin HEAD:master --tags
```

Finally, the `env:` section specifies environment variables to be made available for the duration of the workflow.  Above, I referenced `$NPM_API_TOKEN` (manually added secret) and `$GITHUB_TOKEN` (automatically added secret).  You have to explicitly make secrets available as environment variables by using the following syntax:
```yaml
env:
  NPM_API_TOKEN: ${{ secrets.NPM_API_TOKEN }}
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Only then can you use them in the steps.  Do note that other automatically added environment variables that are not considered secrets, such as `$GITHUB_REPOSITORY`, do not require this explicit syntax.

That's it.  I hope this proves useful to others.
