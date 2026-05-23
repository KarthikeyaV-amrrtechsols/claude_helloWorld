# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project structure

All application code lives under `frontend/`. There is no backend in this repo.

```
frontend/
  app/           # Next.js App Router pages and layouts
  store/         # Redux Toolkit state (store.ts, hooks.ts, apiSlice.ts)
  public/        # Static assets
```

## Commands

All commands must be run from the `frontend/` directory.

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production build
```

There is no lint or test script configured yet.

## Stack

- **Next.js 16** with App Router — this version has breaking changes from earlier releases. Before writing Next.js-specific code, read the relevant guide in `frontend/node_modules/next/dist/docs/`. Do not assume behavior from Next.js 13–15.
- **React 19** — use the React 19 API surface, not legacy patterns.
- **Redux Toolkit** — async actions use `createAsyncThunk`; typed hooks (`useAppDispatch`, `useAppSelector`) are in `frontend/store/hooks.ts`.
- **Tailwind CSS 4** — configuration and utility classes differ from v3; check the v4 docs when in doubt.
- **TypeScript** with strict mode; path alias `@/*` resolves to `frontend/`.

## State management pattern

Redux state is in `frontend/store/`. Each feature gets its own slice file. The single store is mounted in `app/StoreProvider.tsx` (a client component wrapping all children in `layout.tsx`).

The current `apiSlice.ts` has a placeholder `API_URL = "https://api.example.com/submit"` — replace this with the real endpoint before using.

## Key conventions

- Pages that need interactivity or hooks must be marked `"use client"`.
- Server components are the default in App Router; only add `"use client"` when necessary.
- The `@/*` alias always points to the `frontend/` root, not the repo root.
