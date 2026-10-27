# AGENTS.md

Personal blog built with [xertz](https://github.com/bradymholt/xertz). No tests or lint; Netlify builds and deploys on push.

## New posts

- Always start a post with `npx xertz new "Title Words"`. It creates `posts/<today>-<slug>/index.md`.
- The slug only lowercases and hyphenates spaces, so pass a title without punctuation, then set the real title in the `title:` front matter.
- Front matter is just `title:`; layout comes from `posts/_config.yml`.
- Put images in the post folder and reference them relatively: `![alt](image.png)`.
- A `_` prefix on a post folder keeps it out of the build (drafts). Older posts live in `posts/archive/`.

## Preview

- Use the `blog` preview server from `.claude/launch.json` (`npx xertz serve` on port 8080). Never run `xertz serve` in the foreground; it doesn't exit.
- It rebuilds on file changes. A post is served at `http://localhost:8080/<slug>/` (the date prefix is dropped).
