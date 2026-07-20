# Optimization plan — my-own-booking

Status snapshot of the optimization work discussed for this project. Each item lists
impact/effort, the files involved, and current status. Update the status inline as items land.

Legend: ✅ Done · 🚧 In progress · ⬜ Not started

---

## 1. Database & queries — highest impact

| Status | Item | Files |
|---|---|---|
| ✅ | Add indexes on `Hosting.ownerId`, `Hosting.location`, `Hosting.maxGuests` | `prisma/schema.prisma` |
| ✅ | Run `findMany` + `count` in parallel instead of sequentially in `getHostings` | `src/lib/server-utils.ts` |
| ✅ | Parallelize `getOwner` + `getHostingsByOwner` in the owner layout via `session.user.id` | `src/app/owner/layout.tsx` |
| ⬜ | Apply the index migration to the actual database (`npx prisma migrate dev --name add_hosting_indexes` or `npx prisma db push`) — could not be run from this environment (no `prisma/migrations` history, no reachable `DATABASE_URL`) | — |
| ⬜ | Dedupe `getHosting` within a single request (page + `generateMetadata` both call it) by wrapping in React's `cache()` in addition to `unstable_cache` | `src/app/hosting/[slug]/page.tsx`, `src/lib/server-utils.ts` |
| ⬜ | Cache `getHostingsByOwner` (currently uncached) with an owner-scoped tag if the dashboard grows | `src/lib/server-utils.ts` |
| ⬜ | Consider a trigram/GIN index (or a normalized city column) if `location: { contains }` search stays substring-based rather than exact-match | `prisma/schema.prisma` |

## 2. Image delivery — Cloudinary + next/image are fighting each other

| Status | Item | Files |
|---|---|---|
| ⬜ | Stop double-optimizing: use a custom Cloudinary loader (or `f_auto,q_auto,w_<n>` URL transforms) instead of routing Cloudinary URLs back through Next's image optimizer | `next.config.ts`, `src/lib/utils.ts` (`changeImageUrl`) |
| ⬜ | Add `sizes` to grid/carousel images (currently only the main detail image has one) | `src/components/hosting-card-images.tsx`, `src/components/hosting-details-card-images.tsx` |
| ⬜ | Add `priority` to the likely LCP image (first hosting card / hero detail image) | `src/components/hosting-card-images.tsx`, `src/components/hosting-details-card-images.tsx` |
| ⬜ | Raise `images.minimumCacheTTL` (default 60s) since hosting photos rarely change | `next.config.ts` |

## 3. Caching correctness

| Status | Item | Files |
|---|---|---|
| ⬜ | Give `getHostingsByIds` an explicit `keyParts`/tag argument so it can be invalidated via `revalidateTag` like the other cached functions | `src/lib/server-utils.ts` |

## 4. Client-side JS payload

| Status | Item | Files |
|---|---|---|
| ⬜ | Replace or dynamically import `framer-motion` in the header's mobile menu (`ssr:false`) so desktop users don't pay for it in the initial bundle | `src/components/header.tsx` |
| ⬜ | Split owner-only edit/delete controls out of `HostingCard` into their own client component so the public listing (higher-traffic, anonymous) doesn't ship owner-editing code | `src/components/hosting-card.tsx` |

## 5. Dependency hygiene (quick win)

| Status | Item | Files |
|---|---|---|
| ⬜ | Remove unused/likely-accidental dependencies: `fs` (security-squat placeholder package), `node`, `webpack`/`@types/webpack` (dev uses Turbopack, no custom webpack config) | `package.json` |

## 6. Build visibility (enabler)

| Status | Item | Files |
|---|---|---|
| ⬜ | Add `@next/bundle-analyzer` (even temporarily) to confirm framer-motion/radix/embla weight and catch future regressions | `next.config.ts`, `package.json` |

## 7. Prisma 7 migration (new — identified 2026-07-20)

The editor's Prisma language server flags `datasource { url = ... }` as unsupported, quoting
Prisma 7's `prisma.config.ts` convention. The installed CLI is `6.8.2` (confirmed via `npx prisma -v`),
where the current schema syntax is correct — so today this is a version-skew warning from the
editor extension, **not a real build error**. `tsc --noEmit` and `prisma -v` are both clean.

| Status | Item | Notes |
|---|---|---|
| ⬜ | Decide whether/when to upgrade to Prisma 7 | Real migration: connection URL moves to `prisma.config.ts`, `PrismaClient` takes an `adapter` or `accelerateUrl` instead of reading `datasource.url` directly. Touches `src/lib/prisma.ts`, `prisma/schema.prisma`, build/deploy env wiring. Treat as its own scoped task, not a side effect of other work. |
| ⬜ | Until then, optionally pin/downgrade the editor's Prisma extension to a v6-compatible release to stop the false-positive diagnostic | Cosmetic only |

---

## Suggested order

1. ~~Dependency cleanup~~ → ~~DB indexes + query parallelization~~ (done)
2. Apply the pending index migration to the real database
3. Cloudinary loader + `sizes`/`priority` (biggest remaining perceived-performance win)
4. Caching fixes (`getHosting` dedupe, `getHostingsByIds` tagging)
5. Bundle trimming (framer-motion, hosting-card split)
6. Dependency hygiene cleanup
7. Bundle analyzer
8. Prisma 7 upgrade — scheduled independently, not bundled with the optimization pass
