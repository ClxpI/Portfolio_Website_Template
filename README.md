# Professional Software Engineer Portfolio

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **Executive Summary:** A high-end, single-page portfolio template for software engineers to showcase their work, experience, and technical expertise — optimized for professional presentation alongside a CV/resume.

## 🚀 Key Features

- **Premium Design**: A sophisticated color palette (Slate & Indigo) and modern typography (**Plus Jakarta Sans**).
- **Mouse-tracking spotlight**: A soft indigo/emerald glow follows the cursor across the page (respects `prefers-reduced-motion`, disabled on touch devices).
- **Dark mode**: Toggle in the nav, persists via `localStorage`, no flash-of-wrong-theme on load.
- **Scroll interactivity**: Sections reveal on scroll, and the nav highlights whichever section is currently in view (scrollspy).
- **Working mobile nav**: A real collapsible menu (not just a decorative icon).
- **Project filtering**: Filter the Projects section by tag.
- **Contact form**: Submits via [Formspree](https://formspree.io) with an inline success/error state — see Setup below.
- **Skill proficiency bars**, a **Testimonials** section, and a **scroll-to-top** button.
- **Experience Timeline**: A dedicated section to showcase professional career progression — essential for recruiters.
- **Project Showcase**: High-impact project cards with tech badges and hover animations.
- **CV Integration**: A prominent "Download CV" call-to-action in the Hero section.
- **Modern UI Elements**: Mesh gradients, glassmorphism, and smooth scroll animations.

## 🛠️ Technologies Used

- **HTML5** (Semantic structure)
- **Tailwind CSS** (Utility-first styling, via CDN)
- **Vanilla JavaScript** (`assets/js/main.js` — no framework, no build step)
- **Font Awesome 6** (Iconography)
- **Google Fonts** (Typography)

## ⚙️ Setup

The contact form needs a real [Formspree](https://formspree.io) form ID to actually deliver messages:
1. Create a free account at formspree.io and create a form.
2. In `index.html`, replace `YOUR_FORM_ID` in the `<form action="https://formspree.io/f/YOUR_FORM_ID" ...>` line with your real form ID.

Everything else works with zero configuration.

## 📂 Location

Everything lives at the repository root:
- `index.html` — markup
- `assets/css/style.css` — custom styles (spotlight, dark mode, animations)
- `assets/js/main.js` — all interactivity
- `assets/favicon.svg` — site icon

## 🚀 How to Deploy / View

Since this is a static site, deployment is trivial.

1. **Local Viewing**: Simply open `index.html` in any modern web browser.
2. **GitHub Pages**: Push this repo to GitHub and enable "Pages" in the repository settings.
3. **Netlify / Vercel**: Drag and drop the folder into their deployment dashboards.

## 📝 Customization Guide

To make this your own:
1. **Replace Name/Bio**: Edit the text in the `nav` and `hero` sections of `index.html`.
2. **Update Experience**: Modify the timeline items in the `#about` section.
3. **Add Projects**: Duplicate and edit the project card `div` blocks in the `#projects` section.
4. **Change Colors**: Update the Tailwind classes (e.g., change `bg-indigo-600` to `bg-emerald-600`).
