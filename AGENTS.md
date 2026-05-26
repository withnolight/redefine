# Repository Guidelines

## Project Structure & Module Organization

This is a Hexo static site. Site-wide settings live in `_config.yml`; keep deployment, URL, permalink, theme, and directory settings there. Content belongs in `source/`, with blog posts in `source/_posts/` as Markdown files with YAML front matter. Reusable content templates are in `scaffolds/` (`post.md`, `page.md`, `draft.md`). Theme configuration is split into `_config.landscape.yml`, and theme placeholders or custom themes belong under `themes/`. Generated output is written to `public/` by Hexo and should not be edited by hand.

## Build, Test, and Development Commands

Install dependencies with:

```sh
npm install
```

Run the local preview server:

```sh
npm run server
```

Generate the static site into `public/`:

```sh
npm run build
```

Remove generated files and caches before a clean build:

```sh
npm run clean
```

Deploy with `npm run deploy` only after `_config.yml` has a valid `deploy` target.

## Coding Style & Naming Conventions

Use Markdown for content and YAML front matter for metadata. Prefer lowercase, hyphenated post slugs, for example `source/_posts/my-new-post.md`. Keep front matter minimal and consistent with the scaffold:

```yaml
---
title: My New Post
date: 2026-05-26 10:00:00
tags:
---
```

Use two-space indentation in YAML. Keep configuration changes focused and avoid committing generated `public/`, cache files, or local environment artifacts.

## Testing Guidelines

There is no automated test script in `package.json` at this time. Validate changes by running `npm run build`; this catches many Markdown, front matter, and theme rendering problems. For visual or navigation changes, also run `npm run server` and review the affected pages locally. When adding custom scripts or theme code, include a matching test or documented validation command in the same pull request.

## Commit & Pull Request Guidelines

This repository has no existing commit history, so use clear imperative commit messages such as `Add initial post scaffold` or `Update site metadata`. Keep each commit focused on one content or configuration change.

Pull requests should include a short summary, the pages or config files changed, and the validation performed, such as `npm run build`. Link related issues when available. Include screenshots for visible theme, layout, or content presentation changes.

## Security & Configuration Tips

Do not commit secrets, deployment tokens, or machine-specific paths. Keep production URLs, author metadata, and deployment settings in `_config.yml` accurate before publishing. Dependabot is configured for npm updates in `.github/dependabot.yml`; review generated dependency PRs with a clean build before merging.
