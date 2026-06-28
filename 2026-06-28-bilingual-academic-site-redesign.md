# Goal: Bilingual Academic Site Redesign

## Goal Mode Objective

Follow the saved goal file at `/home/czc/projects/working/zuchengchen.github.io/2026-06-28-bilingual-academic-site-redesign.md`; complete the task only when the verification section passes, and stop to ask if any listed stop condition occurs.

## Full Prompt

### Objective

Redesign `https://zuchengchen.github.io/` into a bilingual English/Chinese academic personal website for Zu-Cheng Chen / 陈祖成, with an early-universe spacetime visual identity, a subtle Three.js/canvas hero scene, public-facing CV content, and core pages that can switch between English and Chinese.

### Context

The repo is a Jekyll/GitHub Pages site at `/home/czc/projects/working/zuchengchen.github.io`.

Relevant existing files include:
- `_pages/about.md` for the homepage at `/`
- `_pages/cv.md` for CV
- `_pages/publications.md` for publications
- `_pages/talks.html` for talks
- `_data/navigation.yml` for navigation
- `_config.yml` for site metadata
- `assets/css/main.scss` and `_sass/` for styling
- `images/profile.png` / `images/profile.jpg` for profile photos
- `1262200641_引力波与早期宇宙.pdf` and `cv_zucheng-chen_chi.pdf` as source material

Public-facing academic facts to use:
- Name: Zu-Cheng Chen / 陈祖成
- Position: Associate Professor, College of Physics and Electronic Science, Hunan Normal University / 湖南师范大学物理与电子科学学院
- Research areas: gravitational waves, cosmology, primordial black holes, dark matter, early universe, pulsar timing arrays
- Collaborations: LIGO-Virgo-KAGRA, PPTA, IPTA
- Conservative achievement metrics from the grant application: 48 first-author or corresponding-author papers, 2,600+ citations, h-index 30
- CV material includes education/work timeline, projects, awards, representative publications, collaborations, and academic service

### Brainstorming Direction

Use the approved design direction:

- Visual style: Early-Universe Spacetime
- Motion: Subtle Academic Motion
- Hero implementation: Three.js/canvas dynamic spacetime grid
- Language: English and Chinese core-page versions with in-page language switching
- Default language: detect browser language; Chinese browser defaults to Chinese, otherwise English; remember manual selection
- Information architecture: complete homepage plus existing detailed subpages
- Scope of bilingual content: core pages, navigation, headings, descriptions, contact/profile text; keep publication and talk item titles mostly in their original English
- Photo treatment: use a formal profile photo in a restrained way
- Tone: serious academic site, not grant-application prose and not a marketing landing page
- Avoid copying or continuing the current site's existing dark-gradient/purple-cyan visual style

The design should feel like a theoretical cosmology and gravitational-wave researcher’s site: immersive but calm, readable, and credible.

### Scope

Implement a bilingual redesign for the site's core public pages:

- Redesign the homepage at `/`
- Replace the current homepage with a rich bilingual academic landing page containing:
  - Hero section with name, position, affiliation, research keywords, profile photo, and main links
  - Subtle Three.js/canvas early-universe spacetime scene in the hero background
  - Research focus section
  - Academic profile section
  - CV timeline
  - Selected highlights
  - Selected publications
  - Collaborations and service
  - Contact section
- Update `/cv/` so it no longer contains placeholder GitHub University content and instead presents a real concise CV based on the PDFs
- Update Publications and Talks page titles/descriptive text to support English/Chinese switching while keeping publication/talk entries largely in their original English
- Update navigation labels to participate in the language switch
- Add JavaScript and CSS needed for:
  - language switching
  - language persistence
  - browser-language default detection
  - Three.js/canvas hero scene
  - reduced-motion fallback
  - responsive mobile behavior
- Use the existing profile image if suitable; choose the best available existing image
- Preserve existing publication and talk collections unless small integration changes are needed
- Keep the site compatible with GitHub Pages/Jekyll static deployment

### Out Of Scope

- Do not translate every publication or talk entry.
- Do not reproduce long grant-application passages.
- Do not expose sensitive or private grant-application material.
- Do not make the homepage read like a funding application.
- Do not delete unrelated generated publication/talk data.
- Do not redesign unrelated blog/demo pages unless required for navigation or core-site consistency.
- Do not replace the whole Jekyll theme unless the current structure makes the approved design impossible.

### Verification

Run and pass:

```bash
bundle exec jekyll build --config _config.yml,_config.dev.yml
```

Start a local preview server:

```bash
bundle exec jekyll serve --config _config.yml,_config.dev.yml --host 127.0.0.1 --port 4000
```

If port 4000 is occupied, use another port.

Manual and browser verification:

- Homepage loads at local `/`
- `/cv/`, `/publications/`, and `/talks/` load
- EN/中文 switch is visible and works on the homepage and core pages
- Browser-language default works for Chinese and non-Chinese language settings, or is implemented with a clear best-effort fallback
- Manual language selection is remembered after refresh
- Hero first viewport clearly signals Zu-Cheng Chen / 陈祖成 and gravitational-wave/cosmology research identity
- Three.js/canvas hero scene is nonblank on desktop and mobile
- Canvas animation is subtle and does not block text readability
- `prefers-reduced-motion` produces a static or near-static fallback
- Desktop and mobile layouts have no obvious overlap, clipped text, or broken visual assets
- The page includes public-facing CV content: position, affiliation, research interests, timeline, selected achievements, selected publications, collaborations/service, and contact
- The site does not read like a grant application
- The visual style is substantially redesigned and does not follow the current folder's existing webpage style

If practical, use Playwright screenshots or equivalent browser inspection for at least one desktop viewport and one mobile viewport, including a basic canvas-pixel/nonblank check.

### Stop Conditions

Stop and ask the user if:

- The PDFs cannot be read or key CV facts are ambiguous.
- A public-facing claim would require confirmation because it is not clearly supported by the PDFs or existing repo content.
- The implementation would require replacing the whole Jekyll theme.
- The implementation would require deleting large existing content.
- Three.js cannot be included in a static GitHub Pages-compatible way.
- Verification cannot run because of missing dependencies or environment errors.

## Notes

- Created for Codex Goal mode.
- Do not mark complete until the verification section passes or the user explicitly changes the completion standard.
