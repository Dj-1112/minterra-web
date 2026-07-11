# minterra-web

Official website source code for **Minterra** — Architecture & Construction.  
Live at: [minterra.in](https://minterra.in)

---

## Table of Contents

1. [Repo Overview](#repo-overview)
2. [Tech Stack](#tech-stack)
3. [File Structure](#file-structure)
4. [First-Time Setup — GitHub Pages](#first-time-setup--github-pages)
5. [Connecting GoDaddy Domain](#connecting-godaddy-domain)
6. [Images & Assets](#images--assets)
7. [YouTube Video Embeds](#youtube-video-embeds)
8. [How to Add a New Page](#how-to-add-a-new-page)
9. [How to Add a New Project](#how-to-add-a-new-project)
10. [How to Replace an Image](#how-to-replace-an-image)
11. [How to Edit Existing Content](#how-to-edit-existing-content)
12. [Contact Form Setup](#contact-form-setup)
13. [Development Notes](#development-notes)

---

## Repo Overview

This repo contains all website source code (HTML, CSS, JS). It is a **fully static site** — no build step, no framework, no Node.js required. Every file is plain HTML/CSS/JS and is served directly by GitHub Pages.

Images and media live in a **separate companion repo**: `minterra-assets`  
(see [Images & Assets](#images--assets) below)

---

## Tech Stack

| Layer      | Choice                  | Why                                              |
|------------|-------------------------|--------------------------------------------------|
| Hosting    | GitHub Pages            | Free, reliable, custom domain support            |
| HTML       | Plain HTML5             | No build step, anyone can edit                   |
| CSS        | Plain CSS (custom props)| Full control, no framework lock-in               |
| JS         | Vanilla JS              | Lightweight, no dependencies                     |
| Fonts      | Google Fonts            | Cormorant Garamond + DM Sans                     |
| Forms      | Formspree               | Free tier, works with static sites               |
| Videos     | YouTube embeds          | No storage cost, autoplay supported (muted)      |
| Images     | minterra-assets repo    | Separate repo = clean separation, easy swapping  |

---

## File Structure

```
minterra-web/
│
├── index.html              ← Home page
├── about.html              ← About page
├── services.html           ← Services page
├── projects.html           ← Projects / Portfolio page
├── contact.html            ← Contact page
│
├── css/
│   ├── main.css            ← Design system: variables, reset, typography, nav, footer
│   ├── components.css      ← Reusable UI: buttons, cards, section headers, forms
│   └── pages/
│       ├── home.css        ← Home-specific layout and sections
│       ├── about.css       ← About-specific layout
│       ├── services.css    ← Services-specific layout
│       ├── projects.css    ← Projects grid and filter
│       └── contact.css     ← Contact form and split layout
│
├── js/
│   ├── main.js             ← Global: nav scroll, mobile menu, scroll reveal
│   └── pages/
│       ├── home.js         ← Home-specific interactions
│       └── projects.js     ← Projects filter (All / Residential / Commercial / etc.)
│
├── icons/
│   ├── favicon.ico         ← Browser tab icon (add your own)
│   └── apple-touch-icon.png← iOS home screen icon (add your own)
│
├── CNAME                   ← Tells GitHub Pages to use minterra.in
└── README.md               ← This file
```

---

## First-Time Setup — GitHub Pages

1. Create a new GitHub repo named exactly: `minterra-web`  
   (visibility: **Public** — required for free GitHub Pages)

2. Push all files from this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial site scaffold"
   git branch -M main
   git remote add origin https://github.com/YOUR-GITHUB-USERNAME/minterra-web.git
   git push -u origin main
   ```

3. In GitHub: go to repo **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
   - Click **Save**

4. GitHub will give you a URL like `https://YOUR-GITHUB-USERNAME.github.io/minterra-web`  
   This works immediately. The custom domain (minterra.in) works after DNS is set up (next section).

---

## Connecting GoDaddy Domain

> This connects minterra.in (purchased on GoDaddy) to GitHub Pages.

### Step 1 — Add DNS Records in GoDaddy

Log in to GoDaddy → DNS → Add these records:

| Type  | Name | Value               | TTL  |
|-------|------|---------------------|------|
| A     | @    | 185.199.108.153     | 600  |
| A     | @    | 185.199.109.153     | 600  |
| A     | @    | 185.199.110.153     | 600  |
| A     | @    | 185.199.111.153     | 600  |
| CNAME | www  | YOUR-GITHUB-USERNAME.github.io | 600 |

> The four A records point the apex domain (minterra.in) to GitHub's servers.  
> The CNAME points www.minterra.in there too.

### Step 2 — Set Custom Domain in GitHub

In GitHub: **Settings → Pages → Custom domain**  
Type: `minterra.in` → Save

### Step 3 — Wait

DNS propagation takes 10 minutes to 48 hours. Once done, minterra.in will serve the site.  
Tick the **Enforce HTTPS** checkbox once it becomes available (free SSL from GitHub).

---

## Images & Assets

All images live in the companion repo: **`minterra-assets`**  
Once that repo is set up with GitHub Pages enabled, images are accessible at:

```
https://YOUR-GITHUB-USERNAME.github.io/minterra-assets/[folder]/[filename]
```

**Before the assets repo is ready:** images show as broken in the browser — this is expected.  
The layout and design still renders correctly.

**When setting up the assets repo:**
1. Create GitHub repo named `minterra-assets` (Public)
2. Enable GitHub Pages on it (Settings → Pages → main branch)
3. In all HTML files in this repo, do a **Find & Replace**:
   - Find: `YOUR-GITHUB-USERNAME`
   - Replace: your actual GitHub username
4. Done — all images will load automatically.

---

## YouTube Video Embeds

Videos are embedded via YouTube. To add an autoplay (muted) video:

```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID&controls=0"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen
  loading="lazy">
</iframe>
```

Replace `VIDEO_ID` with the ID from the YouTube URL.  
Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → VIDEO_ID is `dQw4w9WgXcQ`

> Note: Autoplay only works if the video is **muted** (`&mute=1`). This is a browser rule,  
> not a YouTube restriction — it applies to all video on the web, including self-hosted.

---

## How to Add a New Page

1. Copy any existing HTML file (e.g. `services.html`) and rename it (e.g. `team.html`)
2. Update the `<title>` tag and `<meta name="description">` at the top
3. Update the `<link rel="canonical">` href
4. Write your content inside `<main>`
5. Add a link to the new page in the `<nav>` inside **every HTML file** (and in the footer)
6. Add a new CSS file in `css/pages/` if the page needs unique styling
7. Link that CSS file in the `<head>` of the new page

---

## How to Add a New Project

### 1. Add images to minterra-assets

Create a new folder in the assets repo:
```
projects/project-00X-project-slug-name/
```
- `X` = next number in sequence (004, 005...)
- `project-slug-name` = short hyphenated name (e.g. `lakefront-residence`)

Add these files inside:
```
cover.jpg       ← Main card image (used on projects listing page) — ALWAYS this name
gallery-01.jpg
gallery-02.jpg
gallery-03.jpg  ← Add as many as needed, always numbered sequentially
```

### 2. Add the project card in projects.html

Copy an existing `<article class="project-card">` block and update:
- `data-category` → category slug (`residential`, `commercial`, `renovation`)
- `src` → new image path in assets repo
- Project number, name, location, year

### 3. Optionally feature it on the home page

Add it to the "Featured Projects" section in `index.html`.

---

## How to Replace an Image

Because all images use **stable filenames** (e.g. `cover.jpg`, `gallery-01.jpg`), you can  
replace any image without touching the HTML:

1. Go to the `minterra-assets` repo on GitHub
2. Navigate to the image's folder
3. Upload a new file with the **exact same filename**
4. GitHub will overwrite it — the URL stays the same — HTML requires zero changes

---

## How to Edit Existing Content

All content is in the HTML files. Each section is clearly commented.  
Open the relevant HTML file and find the section you want to update.

Common edits:
- **Phone / email**: Search for `+91` or `hello@minterra.in` across all files
- **Address**: Search for `Bengaluru` across all files
- **Tagline / headline**: In `index.html`, look for the `<!-- HERO -->` comment block
- **Services list**: In `services.html`, look for `<!-- SERVICES GRID -->`
- **Team members**: In `about.html`, look for `<!-- TEAM -->`

---

## Contact Form Setup

The contact form uses **Formspree** (free, no backend needed):

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form — Formspree gives you a form ID like `xrgvkpqz`
3. In `contact.html`, find the `<form>` tag and update the action:
   ```html
   <form action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
   ```
4. Replace `YOUR-FORM-ID` with your actual ID — done.

Submissions go straight to your email inbox.

---

## Development Notes

- **No build step needed.** Open any HTML file directly in a browser to preview.
- **Live server (optional):** If you have VS Code, install the "Live Server" extension for  
  auto-reload while editing.
- **CSS variables** are all defined at the top of `css/main.css` — change colors, fonts,  
  or spacing there and it reflects site-wide.
- **Adding Google Fonts:** Font imports are already in `main.css`. If changing fonts,  
  update both the `@import` URL and the `--font-*` variables.
- **Browser support:** Targets modern browsers (Chrome, Firefox, Safari, Edge). No IE support.
- **Favicon:** Add your logo as `icons/favicon.ico` and `icons/apple-touch-icon.png`.  
  Use [realfavicongenerator.net](https://realfavicongenerator.net) to generate all sizes.
