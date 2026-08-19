# Portfolio — Valeria Sanz Jones

Source for my personal site: case studies on the GenAI and automation systems I've built.

**Live:** _(add your Vercel URL here once deployed)_

## What's here

Three case studies, each written as problem → build → outcome:

| Project | Org | What it does |
|---|---|---|
| [Automated UGC Product Detection](content/projects.ts) | Bloom Nutrition | Computer-vision pipeline that identifies which products appear in creator videos |
| [AI-Assisted UGC Moderation Platform](content/projects.ts) | Social Native | Claude-driven 3-stage moderation workflow across brand clients |
| [Invoice Intake & Bookkeeping Automation](content/projects.ts) | Janey Health | n8n + Claude workflow from inbox to filed document and open QuickBooks bill |

## Editing content

All copy, metrics, and project data live in two files — no component edits needed:

- `content/projects.ts` — case studies
- `content/site.ts` — bio, experience, skills, contact

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · deployed on Vercel.
