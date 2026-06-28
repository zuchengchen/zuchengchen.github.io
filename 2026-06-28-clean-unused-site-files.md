# Goal: Clean Unused Public Site Files

## Goal Mode Objective

Follow the saved goal file at `/home/czc/projects/working/zuchengchen.github.io/2026-06-28-clean-unused-site-files.md`; complete the task only when the verification section passes, and stop to ask if any listed stop condition occurs.

## Full Prompt

### Objective

Clean unused public-facing template, demo, cache, and generated clutter from `/home/czc/projects/working/zuchengchen.github.io` after the bilingual academic homepage redesign, while preserving the redesigned site, real academic content, tooling, and ambiguous files.

### Context

The repository is the GitHub Pages site for `https://zuchengchen.github.io/`. A previous task redesigned the site into a bilingual Chinese/English academic personal homepage with these core files:

- `_pages/about.md`
- `_pages/cv.md`
- `_pages/publications.md`
- `_pages/talks.html`
- `_layouts/academic-home.html`
- `_layouts/academic-page.html`
- `_data/navigation.yml`
- `_config.yml`
- `assets/css/main.scss`
- `assets/js/academic-site.js`

The user chose cleanup strategy `2`: site-surface cleanup. The cleanup should remove old public-facing template/demo clutter where it is clearly unused, but it should not aggressively minimize the repository or delete real academic material.

The repository may contain unrelated modified and untracked files, including generated publication files, scripts, local PDFs, and setup notes. Do not treat a file as disposable only because it is untracked or modified.

### Brainstorming Direction

Use a conservative site-surface cleanup:

- Remove old template/demo pages, sample collections, generated build/cache directories, and placeholder assets only after reference checks.
- Preserve real academic publications, talks, PDFs, profile/site assets, helper scripts, local setup files, and ambiguous files.
- Update configuration only where a removed collection or page would otherwise leave stale site behavior.

This trades maximum repo shrinkage for lower risk of losing useful academic or maintenance content.

### Scope

You may inspect the full repository and remove clearly unused files in these categories after checking references:

- Old example posts in `_posts/`
- `_drafts/`
- `_portfolio/` and `_pages/portfolio.html`
- `_teaching/` and `_pages/teaching.html`
- `_data/comments/`
- Old archive/demo pages, including:
  - `_pages/archive-layout-with-content.md`
  - `_pages/category-archive.html`
  - `_pages/collection-archive.html`
  - `_pages/markdown.md`
  - `_pages/non-menu-page.md`
  - `_pages/page-archive.html`
  - `_pages/tag-archive.html`
  - `_pages/terms.md`
  - `_pages/year-archive.html`
- Talkmap demo/support files if unlinked:
  - `_pages/talkmap.html`
  - `talkmap/`
  - `talkmap.py`
  - `talkmap.ipynb`
- Placeholder/demo PDFs and images after reference checks, such as:
  - `files/paper1.pdf`
  - `files/paper2.pdf`
  - `files/paper3.pdf`
  - old demo images such as image-alignment, foo-bar, or paragraph images if unreferenced
- Generated build/cache directories:
  - `_site/`
  - `.jekyll-cache/`
  - `.sass-cache/` if present

If `_portfolio/` or `_teaching/` are removed, update `_config.yml` to remove stale collection declarations, defaults, or navigation behavior that refers to them.

Use `rg` or other reference checks before deleting any public-facing file or asset.

### Out Of Scope

Do not delete or rewrite these unless the user explicitly approves a separate change:

- The redesigned core pages, layouts, CSS, JavaScript, and navigation listed in Context
- `_publications/` real or generated entries
- `_talks/` and `_talks/slides/`
- Real academic paper PDFs:
  - `files/2404.07075.pdf`
  - `files/2404.08375.pdf`
  - `files/2405.10031.pdf`
- Profile and site identity assets:
  - `images/profile.png`
  - `images/profile.jpg`
  - `images/site-logo.png`
  - favicon, tile, manifest, and browserconfig assets
- `markdown_generator/`
- `scripts/`
- `preview.sh`
- `README_LOCAL.md`
- `Gemfile`
- `Gemfile.lock`
- unrelated uncommitted modifications
- ambiguous files whose purpose cannot be confidently determined from references and names

Do not revert user changes. Do not use destructive git commands such as `git reset --hard` or `git checkout --`.

### Verification

Completion requires all of the following:

1. Run reference checks before deleting scoped public-facing files and assets, using commands such as:

   ```bash
   rg -n "portfolio|teaching|talkmap|markdown|terms|page-archive|year-archive|category-archive|tag-archive|collection-archive|archive-layout|non-menu" _config.yml _data _includes _layouts _pages assets README.md Gemfile package.json --glob '!_site/**'
   ```

2. Remove only approved unused categories and update `_config.yml` if removed collections leave stale configuration.

3. Build the site successfully:

   ```bash
   export PATH="$HOME/.local/share/gem/ruby/3.4.0/bin:$HOME/.gems/ruby/3.4.0/bin:$PATH"
   bundle exec jekyll build --config _config.yml,_config.dev.yml
   ```

   Existing Sass deprecation warnings or pre-existing sample-content warnings may be reported, but the command must exit successfully.

4. Review the cleanup scope with:

   ```bash
   git status --short
   git diff --name-status
   ```

   The changed/deleted files should match the conservative cleanup scope and should not include protected files from Out Of Scope.

5. Report a concise summary of:

   - what was removed
   - what was intentionally preserved
   - build result
   - any remaining clutter that was left because it was ambiguous or out of scope

### Stop Conditions

Stop and ask the user before continuing if:

- A candidate deletion is referenced by the redesigned site or by real academic content.
- A file appears to contain real CV, publication, talk, profile, project, or maintenance information but its purpose is unclear.
- Removing a file would require changing the redesigned homepage structure or bilingual behavior.
- The Jekyll build fails for reasons unrelated to a clearly fixable stale reference introduced by the cleanup.
- The cleanup would touch protected files listed in Out Of Scope.

## Notes

- Created for Codex Goal mode.
- Do not mark complete until the verification section passes or the user explicitly changes the completion standard.
