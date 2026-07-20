# CozyPlaces (my-own-booking)

A booking/listings app (Airbnb-style) built with Next.js 15 App Router, React 19, Prisma +
Accelerate, and NextAuth 5. Guests can search hostings by city, guest count, and availability
dates, and save favourites locally. Owners can sign up, log in, and manage their own hostings
(create/edit/delete, with photo uploads to Cloudinary).

## Tech stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4, Radix UI primitives (shadcn-style), CVA for variants
- **Data:** PostgreSQL via Prisma 6 + Prisma Accelerate
- **Auth:** NextAuth 5 (beta), credentials provider, JWT sessions
- **Images:** Cloudinary (uploads + hosting), `next/image` for rendering
- **Forms/validation:** react-hook-form + zod

See [`docs/architecture.md`](docs/architecture.md) for the full architecture writeup.

## Prerequisites

- Node.js (a recent LTS)
- A PostgreSQL database (Prisma Accelerate is used in `src/lib/prisma.ts`)
- A Cloudinary account (for image uploads)

## Environment variables

Create a `.env` file in the project root with:

| Variable | Used for |
|---|---|
| `DATABASE_URL` | Prisma datasource connection string |
| `NEXTAUTH_URL` | Base URL used for internal auth callbacks (`src/lib/utils.ts`) |
| `AUTH_SECRET` | NextAuth 5 session/JWT encryption secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary SDK config (`src/lib/cloudinary.ts`) |
| `CLOUDINARY_API_KEY` | Cloudinary SDK config |
| `CLOUDINARY_API_SECRET` | Cloudinary SDK config |

## Getting started

```bash
# install dependencies
npm install

# generate the Prisma client
npx prisma generate --no-engine

# push the schema to your database (no migration history is committed yet —
# see docs/architecture.md for details)
npx prisma db push

# run the dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Starts the dev server with Turbopack |
| `npm run build` | Runs `prisma generate --no-engine` then `next build` |
| `npm run start` | Starts the production server (after `build`) |
| `npm run lint` | Runs `next lint` |

## Project structure

```
src/
  app/            # App Router routes, layouts, API routes
  actions/        # Server Actions (mutations: search, hosting CRUD, auth)
  components/     # Feature components + ui/ (design-system primitives)
  context/        # React Context (owner-scoped data)
  lib/            # Prisma client, auth config, validation, server utils
prisma/
  schema.prisma   # Owner / Hosting / Availability models
```

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — architecture, data model, conventions, known gaps
- [`docs/optimization-plan.md`](docs/optimization-plan.md) — tracked performance/optimization work

## Deploy

The easiest way to deploy is via [Vercel](https://vercel.com/new). Make sure the environment
variables above are configured in the deployment target, and that `prisma generate --no-engine`
runs as part of the build (already wired into `npm run build`).
