# Project Recovery Notes

## Startup Identity
LUVPARTNR is a private AI relationship intelligence platform for organizing, analyzing, and understanding romantic relationships, dating prospects, exes, friendships, and other meaningful social relationships.

## Product Vision
Build the Relationship Intelligence OS: private case files, timeline entries, message analysis, AI reports, risk scoring, compatibility analysis, memory, and decision support over time.

## Website/App Structure
Validated routes include `/`, `/product`, `/pricing`, `/investor`, `/sample-report`, `/privacy`, `/signup`, `/login`, `/logout`, `/app`, `/app/cases`, `/app/cases/new`, `/app/cases/[id]`, `/app/cases/[id]/add-entry`, `/app/cases/[id]/report`, `/app/reports`, `/app/reports/[id]`, `/app/analyze`, and `/report/[publicId]`.

## Design Direction
Premium dark AI startup. Serious, elegant, private, emotionally grounded, strategic, high-trust. Avoid cheesy dating visuals, gossip language, playful gimmicks, and generic SaaS filler.

## What Was Preserved
The App Router structure, Supabase server/client split, OpenAI-backed report and analyzer routes, authenticated case/report detail routes, public report sharing route, landing pages, package metadata, pnpm lockfile, and public assets were preserved.

## What Was Fixed
Removed corrupt tracked prompt-artifact files, converted unsupported `next.config.ts` to `next.config.mjs`, corrected PostCSS/Tailwind v3 config, fixed analyzer UI endpoint wiring, fixed add-entry background analysis payload, fixed a loading-state stall in the new-case form, and improved premium positioning across home, pricing, investor, privacy, app dashboard, cases, reports, analyzer, and public report pages.

## What Was Removed
Removed stale/corrupt tracked files including stray `.tsx`, prompt text filenames, broken generated helper filenames, the old root `report-button.tsx`, `package-lock.json`, and unsupported `next.config.ts`.

## Current Build Status
Build is green as of 2026-05-06. `pnpm build` completed successfully and generated all 27 app routes.

## Manual Deploy Command
```bash
cd /Users/joshuadavis/startups/luvpartnr
pnpm install
pnpm build
vercel --prod
```

## Return-Later Commands
```bash
cd /Users/joshuadavis/startups/luvpartnr
git status --short
pnpm install
pnpm build
find app -type f | sort
grep -R "@/lib/supabase/server" app --line-number || true
grep -R '"use client"' app --line-number || true
```

## Next Best Tasks
Connect `/app/cases` and `/app/reports` list pages to authenticated Supabase data, add Stripe production billing and paywall rules, harden AI report JSON parsing with schema validation, improve report sharing controls, and add mobile polish QA.

## Autobuilder Guardrails
Use pnpm only. Do not deploy or push automatically. Keep server/client separation strict. Do not expose API keys or private relationship data. Do not build spying, stalking, lie detector, revenge, gossip, or clinical diagnosis features. Prefer small UI polish, copy clarity, empty states, type fixes, route cleanup, and documentation.
