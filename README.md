# Ganesh Balaraju — Portfolio

Personal portfolio site, positioned for **Revenue Operations Analyst** roles with
frontend engineering as the supporting story. React + styled-components, with a
GPU-shader background and scroll-driven animation.

**Live:** https://ganeshbalaraju.github.io

## Running locally

```bash
npm install
npm start        # dev server on :3000
npm run build    # production build
npm run deploy   # build + publish to GitHub Pages
```

## Structure

```
src/
├── data/
│   ├── constants.js     ← all site content lives here (single source of truth)
│   └── icons.js         ← local icon registry, no CDN requests
├── hooks/useReveal.js   ← IntersectionObserver scroll reveal
└── components/
    ├── shared/Section.js    shared section chrome
    ├── WebGLBackground/     shader starfield (three.js)
    ├── HeroSection/         hero + highlights strip
    ├── Skills/              skills & tooling grid
    ├── Projects/            filterable project grid
    ├── TrainJourney/        experience, client delivery & education (GSAP)
    ├── Credentials/         certifications, languages, volunteering
    ├── Contact/             EmailJS contact form
    └── Footer/
```

### Editing content

Almost everything — bio, roles, skills, jobs, client delivery, education,
projects, certifications, languages — is in
[`src/data/constants.js`](src/data/constants.js). No component changes needed to
update the site's content.

Two conventions worth knowing:

- Projects with no public link set `github: null` / `webapp: null`; the card and
  dialog hide the buttons rather than rendering a dead link. Add
  `confidential: true` for internal production systems so the dialog says
  "not publicly accessible" instead of "not hosted".
- The journey timeline sorts on the **last** year in a date range, so ongoing
  entries like `"Apr 2023 – Oct 2026 (expected)"` rank by when they finish, not
  when they started. Salaried roles use `experiences`; consulting engagements
  use `clientDelivery` and render with an amber badge.

## Performance notes

Things worth preserving if you edit this:

- **Background motion runs in the vertex shader**, driven by a single `uTime`
  uniform. Don't move particle positions in JS — that re-uploads the whole
  buffer to the GPU every frame.
- **Only `transform` and `opacity` are animated.** Animating `box-shadow`,
  `filter` or `backdrop-filter` forces a repaint each frame.
- **No scroll listeners.** Scroll-driven state (nav background, back-to-top,
  reveals, scroll spy) all uses `IntersectionObserver`.
- **`scroll-behavior: smooth` is deliberately not set globally** — it fights
  GSAP ScrollTrigger's scrub. Anchor clicks call `scrollIntoView` explicitly.
- **Everything below the fold is `React.lazy`**, so three.js and GSAP stay out
  of the initial bundle.
- `prefers-reduced-motion` is honoured throughout.

## Stack

React 18 · styled-components · three.js · GSAP ScrollTrigger · react-icons ·
EmailJS · Create React App
