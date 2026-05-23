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
## Repository Structure

Monorepo with two top-level directories:
- `frontend/` — Next.js 16 app (TypeScript, React 19, Redux Toolkit, Tailwind CSS v4)
- `backend/` — Django 6 + Django REST Framework API (Python 3.13, virtual env at `backend/venv/`)

## Backend Commands

Run all commands from the `backend/` directory using the venv:

```powershell
# Windows
.\venv\Scripts\python manage.py runserver        # start dev server (http://127.0.0.1:8000)
.\venv\Scripts\python manage.py test             # run tests
.\venv\Scripts\python manage.py test calculator  # run tests for the calculator app only
.\venv\Scripts\pip install -r requirements.txt   # install dependencies
```

## Backend Architecture

Single Django app (`calculator`) exposed under the `/api/` prefix.

**Request flow:** `POST /api/sum/` → `config/urls.py` → `calculator/urls.py` → `calculator/views.SumView` → `calculator/serializers.SumInputSerializer`

- `config/` — Django project package (settings, root URL conf, WSGI)
- `calculator/serializers.py` — validates `number1` and `number2` as floats
- `calculator/views.py` — `SumView` returns `{"result": number1 + number2}`
- `calculator/urls.py` — mounts `SumView` at `sum/`

**API contract:**
```
POST http://127.0.0.1:8000/api/sum/
Content-Type: application/json
{"number1": 7, "number2": 3}
→ 200 {"result": 10.0}
```

## Frontend Commands

Run all commands from the `frontend/` directory:

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm start        # serve production build
```

No lint or test scripts are configured yet.

## Frontend Architecture

Single-page "API Calculator" — user enters two numbers, result is fetched from the backend and displayed.

**Data flow:** `app/page.tsx` (UI) → Redux dispatch → `store/apiSlice.ts` (`callApi` async thunk, `fetch` POST) → backend

- `store/store.ts` — single `api` reducer
- `store/apiSlice.ts` — `{ result, loading, error }` state; `API_URL` constant points at the backend endpoint
- `store/hooks.ts` — typed `useAppDispatch` / `useAppSelector`
- `app/StoreProvider.tsx` — client component wrapping the tree in Redux `<Provider>`

**Note:** `API_URL` in `store/apiSlice.ts` is currently a placeholder (`https://api.example.com/submit`). Point it at `http://127.0.0.1:8000/api/sum/` for local development.

## Next.js Version Note

This project uses **Next.js 16**, which has breaking changes from prior versions. Before writing any Next.js-specific code, consult `frontend/node_modules/next/dist/docs/` for current APIs and conventions.
