# Autobuilder Guardrails

## Product Truth
LUVPARTNR is a private AI relationship intelligence platform for organizing, analyzing, and understanding romantic relationships, dating prospects, exes, friendships, and other meaningful social relationships through structured case files, timeline entries, communication analysis, AI reports, risk scoring, compatibility analysis, memory, and relationship intelligence over time.

## Public Positioning
Position LUVPARTNR as a Relationship Intelligence OS, private case file system, communication forensics tool, emotional risk dashboard, long-term compatibility simulator, and serious relationship decision-support product.

## Do Not Expose
Never expose API keys, Supabase secrets, OpenAI secrets, Stripe secrets, private relationship data, raw private case entries, internal Autobuilder implementation details, or user-identifying relationship context.

## Do Not Delete
Do not delete `app/`, `components/`, `lib/`, used public assets, `package.json`, `pnpm-lock.yaml`, config files, `.env.local`, `.env.example`, `README.md`, `RECOVERY_NOTES.md`, `AUTOBUILDER_FOUNDATION.json`, `.autobuilder/`, `.git`, or `.gitignore`.

## Do Not Drift
Do not drift toward gossip, spying, stalking, revenge, lie detector claims, clinical diagnosis, cheesy dating-app visuals, generic SaaS filler, or therapy-blog-only content.

## Safe Improvements
UI polish, copy clarity, empty states, report presentation, mobile responsiveness, type fixes, safe route cleanup, documentation, small API hardening, and privacy/ethics messaging are safe.

## Risky Improvements
Changing auth architecture, moving Supabase clients across server/client boundaries, deleting source folders, adding fake functionality, client-side secrets, broad schema changes, or auto-deploying are risky and require extra care.

## Build Rules
Use pnpm only. Run `pnpm build` after focused changes. Do not use npm. Do not push or deploy automatically. Prepare for manual deploy with `vercel --prod`.
