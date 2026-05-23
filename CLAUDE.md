# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
