# SplitBuddy – Client

React + TypeScript + Vite + Tailwind v4 front end for SplitBuddy.

## Run

```bash
cd client
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

Requests to `/api/*` are proxied to the Express server on port 5000 (see `vite.config.ts`).

## Routes

| Path                   | Page                                     |
| ---------------------- | ---------------------------------------- |
| `/`                    | Public homepage + nav menu               |
| `/login`               | Log in                                   |
| `/signup`              | Sign up                                  |
| `/dashboard`           | Dashboard overview (balances, groups, expenses) |
| `/dashboard/expenses`  | Expenses                                 |
| `/dashboard/split`     | Split a bill                             |
| `/dashboard/reports`   | Reports                                  |

`/dashboard/*` requires a logged-in user; otherwise it redirects to `/login`.

## Folder structure

```
src/
  main.tsx              entry point
  App.tsx               router + auth provider
  index.css             global/dashboard styles
  types.ts              shared TypeScript types
  components/           reusable UI (Logo, Avatar, ExpenseRow, SiteNav, modal, ...)
  layouts/              DashboardLayout (sidebar/topbar/mobile nav), AuthLayout
  pages/                Home, Login, Signup, NotFound
  pages/dashboard/      Overview, Expenses, SplitBill, Reports
  context/              AuthContext (current user)
  services/             auth.ts – swap for real API calls
  data/                 mockData.ts – placeholder groups/expenses/balances
  utils/                formatting + category helpers
  styles/               public.css (homepage + auth pages)
```

## Placeholders

- **Auth**: `services/auth.ts` stores accounts in `localStorage` because the server has no
  login/signup routes yet. Replace its functions with `fetch("/api/...")` calls when they exist.
- **Dashboard data**: groups, balances and expenses come from `data/mockData.ts`. Each dashboard
  section also has an empty-state placeholder that shows when its list is empty.
