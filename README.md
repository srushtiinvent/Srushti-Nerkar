# Srushti Nerkar — Portfolio

Personal portfolio of **Srushti Nerkar**, a software engineer with 4 granted Indian patents, working across backend systems, full-stack products and applied AI/ML.

🔗 **Live site:** https://srushtiinvent.github.io/Srushti-Nerkar/

## What's inside

- **Hero** with an animated intro and staggered reveal
- **About, Highlights, Skills and Projects** chapters with scroll-based reveals and an active-chapter navbar and side rail
- **Three themes:** Dark, Light and Sunset, remembered across visits
- **Resume menu** with role-specific variants
- Keyboard navigation (↑ / ↓ / Page Up / Page Down jump between chapters)
- Responsive layout, plus reduced-motion support

## Featured projects

| Project | What it is |
|---|---|
| **PRISM** | Hierarchical network intrusion detection using an Isolation Forest pre-filter and a Spiking Neural Network |
| **Smart Sentry** | Phase-aware streaming anomaly detection with Kafka and Redis |
| **TraceFlow** | Live C++ code-to-flowchart visualiser |
| **Job Watcher** | Full-stack fresher job tracker with alerts |
| **Aspect-Based Sentiment Analysis** | Hybrid BERT + rule-based ABSA pipeline |

## Tech stack

React · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · wouter · TanStack Query · Radix UI · Lucide / React Icons

## Run locally

Requires Node 22+ and [pnpm](https://pnpm.io).

```bash
pnpm install
PORT=5173 BASE_PATH=/ pnpm dev
```

Then open http://localhost:5173.

`PORT` and `BASE_PATH` are required by `vite.config.ts`.

## Build

```bash
PORT=4173 BASE_PATH=/Srushti-Nerkar/ pnpm build
```

The output goes to `dist/public`.

## Deployment

Pushes to `main` build and deploy to GitHub Pages automatically through `.github/workflows/deploy-pages.yml`.
In the repo, go to **Settings → Pages** and set **Source: GitHub Actions**.

## Project structure

```
src/
  App.tsx          # page layout, sections, animations
  index.css        # theme variables, custom styles
  components/ui/   # shared UI primitives
public/            # profile image, resume PDF, favicon
```

## Contact

- LinkedIn: https://www.linkedin.com/in/srushti-nerkar-58034827b/
- GitHub: https://github.com/srushtiinvent
- Email: srushti.invent@gmail.com

© Srushti Nerkar. Feel free to take inspiration from the layout, but please don't copy my content, photo or resume.
