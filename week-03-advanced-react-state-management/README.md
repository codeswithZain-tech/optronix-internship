# Week 3 — Advanced React & State Management

**Phase 1 · Frontend Foundations**

A multi-page **Task Manager** demonstrating advanced React patterns: Context + `useReducer` for auth, **Zustand** for global UI state, and **TanStack React Query** for server state with optimistic updates — wired together with **React Router v6** protected nested routes.

## What Was Implemented

| Area | File(s) | Details |
|------|---------|---------|
| Authentication | `src/context/AuthContext.jsx` | Centralized authentication state driven by `useReducer`; exposes `login` / `logout` via the `useAuth()` hook |
| Routing | `src/App.jsx` | React Router v6 with protected nested layout routes (`/tasks`, `/tasks/:id`, `/team`, `/settings`) plus a public `/login` route |
| Client UI state | `src/store/useUIStore.js` | Global UI states (sidebar toggle, status filters, sort key) managed with **Zustand** |
| Server state | `src/api/tasksApi.js` | Server state management using **@tanstack/react-query** with **Optimistic UI updates** (rollback on error) so list and detail views stay in sync |
| Performance | `TaskRow.jsx`, `Tasks.jsx` | Optimized list rendering using `useMemo`, `useCallback`, and `React.memo` |
| URL search state | `Tasks.jsx` | Live dynamic search driven by `useSearchParams` (`/tasks?q=...`) |

## Key Concepts Applied

- **Context + useReducer** for structured, centralized auth logic
- **Zustand** selectors for minimal re-renders of global client state
- **React Query**: caching, shared cache reads between views, optimistic mutations with rollback on failure
- **Protected routes**: unauthenticated users are redirected to `/login` and sent back to their original page after login
- **Rendering optimization**: memoized row components, stable callback references, derived/sorted lists computed with `useMemo`
- **URL as state**: search query lives in the URL, making it shareable and refresh-safe

## Project Structure

```
src/
├── App.jsx                    # Router setup, protected layout & providers
├── api/
│   └── tasksApi.js            # React Query hooks (tasks, task detail, team, update mutation)
├── components/
│   └── TaskRow.jsx            # Memoized task row component
├── context/
│   └── AuthContext.jsx        # Auth state via Context + useReducer
├── pages/
│   ├── Tasks.jsx              # List view: search / filter / sort / toggle
│   ├── TaskDetail.jsx         # Single task view
│   ├── Team.jsx               # Team members list
│   ├── Settings.jsx           # Global UI state demo (sidebar toggle)
│   └── Login.jsx              # Public login route
└── store/
    └── useUIStore.js          # Zustand store for client UI state
```

## How to Run

```bash
# Create a Vite React project and copy the src/ folder into it
npm create vite@latest week3-task-manager -- --template react
cd week3-task-manager
npm install react-router-dom zustand @tanstack/react-query
npm run dev
```

> Data is fetched from the public [JSONPlaceholder](https://jsonplaceholder.typicode.com) API, so an internet connection is required.
