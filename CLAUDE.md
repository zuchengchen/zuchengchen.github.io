# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Academic personal website for Zu-Cheng Chen (陈祖成), built on the academicpages Jekyll template (forked from Minimal Mistakes theme). Hosted on GitHub Pages at https://zuchengchen.github.io.

## Common Commands

### Local Development
```bash
# Install dependencies
bundle install

# Serve locally with live reload (localhost:4000)
bundle exec jekyll liveserve

# Standard serve without live reload
bundle exec jekyll serve
```

### JavaScript Build
```bash
npm run build:js    # Minify JavaScript
npm run watch:js    # Watch for JS changes
```

### Content Generation
Python scripts in `markdown_generator/` convert TSV data to markdown:
```bash
python markdown_generator/publications.py   # Generate publication pages from publications.tsv
python markdown_generator/talks.py          # Generate talk pages from talks.tsv
```

## Architecture

### Jekyll Collections
- `_publications/` - Academic papers (markdown with YAML front matter)
- `_talks/` - Conference presentations
- `_teaching/` - Teaching materials
- `_portfolio/` - Project portfolio
- `_posts/` - Blog posts

### Key Configuration
- `_config.yml` - Main site configuration (author info, collections, defaults)
- `_config.dev.yml` - Development overrides (localhost URL, analytics disabled)
- `_data/navigation.yml` - Main menu navigation (Chinese labels)

### Template Structure
- `_layouts/` - Page templates (default.html, single.html, talk.html, archive.html)
- `_includes/` - Reusable components (author-profile, head, footer, analytics)
- `_sass/` - Stylesheet source files

### Static Assets
- `files/` - Downloadable files (PDFs, etc.) served at /files/filename
- `images/` - Image assets
- `assets/` - CSS, JS, fonts

## Content Workflow

1. Add structured data to TSV files in `markdown_generator/`
2. Run Python scripts to generate markdown files
3. Markdown files use YAML front matter for metadata
4. Push to master branch for automatic GitHub Pages deployment
