# SAMBHAV UPSC

SAMBHAV UPSC is a web-first UPSC preparation platform for PYQs, prelims, CSAT, mains answer writing, handwritten answer evaluation, current affairs, revision, study material, performance tracking, groups, leaderboard, notifications and admin operations.

## Phase 1 — Web Foundation

- Next.js App Router + TypeScript
- Supabase Auth + PostgreSQL + Row Level Security
- Shared TypeScript types, Zod validation and API contracts
- Secure profile management
- Student/admin route protection
- Password recovery flow
- Versioned API foundation under `/api/v1`
- Private answer-image storage bucket foundation

Android/iOS scaffolding is intentionally left untouched. The same Supabase/API layer can be consumed by Flutter later.

## Local setup

```bash
npm install
cp apps/web/.env.example apps/web/.env.local
npm run web
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Apply Supabase migrations in order:
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_storage.sql`
3. `supabase/migrations/003_security_hardening.sql`

## Checks

```bash
npm run web:typecheck
npm run web:build
```
