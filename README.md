# Optronix Internship — Weekly Assessments

Weekly assessment submissions for my Software Development internship at **Optronix**, Lahore.

## Phase 1 — Frontend Foundations

> Track: HTML → React → State

| Week | Topic | Assessment | Status |
|------|-------|------------|--------|
| W1 | HTML, CSS & JavaScript Fundamentals | [Fake Store — vanilla JS product page](./week-01-html-css-javascript) | ✅ Completed |
| W2 | React Fundamentals & JSX | [Todo App — core hooks only](./week-02-react-fundamentals-jsx) | ✅ Completed |
| W3 | Advanced React & State Management | [Task Manager — Router v6 + Zustand + React Query](./week-03-advanced-react-state-management) | ✅ Completed |

## Tech Stack

- **HTML5 / CSS3 / JavaScript (ES6+)** — Fetch API, async/await, DOM manipulation
- **React 18** — JSX, Hooks (`useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`), Context API
- **State management** — Zustand (client state), TanStack React Query (server state, optimistic updates)
- **Routing** — React Router v6 (protected nested routes, URL search params)

## Repository Structure

```
optronix-internship/
├── week-01-html-css-javascript/
│   ├── README.md
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
├── week-02-react-fundamentals-jsx/
│   ├── README.md
│   └── src/
│       └── App.jsx
└── week-03-advanced-react-state-management/
    ├── README.md
    └── src/
        ├── App.jsx
        ├── api/tasksApi.js
        ├── components/TaskRow.jsx
        ├── context/AuthContext.jsx
        ├── pages/ (Tasks, TaskDetail, Team, Settings, Login)
        └── store/useUIStore.js
```

Each week folder contains its own `README.md` with the task details, features implemented and run instructions.
