## Rodrigo Manão – Portfolio

Interactive cyberpunk-themed portfolio built with Next.js and a custom WebGL hero, showcasing my projects and background in Computer Science and Engineering.

Live site: https://rodrigomanao.github.io/

---

## Stack

- Next.js 16 (App Router, `src/app`)
- React 19
- Custom WebGL background using `ogl`
- Tailwind CSS 4 + CSS Modules
- GitHub Pages for static hosting

---

## Features

- Animated hero section with WebGL grain / gradient effect
- Smooth scrolling navigation with active section highlighting
- "My Projects" section with interactive cards (tap to activate on mobile)
- "Who am I" section with animated About/Skills toggle
- Contact section with glassmorphism cards and hover glow
- Fully responsive layout tuned for desktop and mobile

---

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open http://localhost:3000 in your browser.

---

## Build

This project is configured for static export (used by GitHub Pages).

```bash
npm run build
```

The static output is generated in the `out/` directory by Next.js because `output: 'export'` is set in `next.config.mjs`.

---

## Deployment (GitHub Pages)

The site is deployed automatically using GitHub Actions:

- Workflow: `.github/workflows/pages.yml`
- On every push to `main`:
  - Install dependencies
  - Run `npm run build`
  - Upload the `out/` folder as the GitHub Pages artifact

GitHub Pages serves the site at:

- `https://rodrigomanao.github.io/`


---

## Projects Highlighted

- **DEIChain** – Blockchain system simulation in C using shared memory, semaphores, message queues and named pipes.
- **Googol** – Distributed web indexing and search system in Java using RMI.
- **Project Three** – Game dev project (Unity / C#).

---

## License

This repository is personal portfolio source code. Feel free to browse and get inspiration, but please do not reuse the design or branding as-is.
