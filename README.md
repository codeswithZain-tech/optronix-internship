# Optronix Internship — Weekly Assessments

Weekly assessment submissions for my Software Development internship at **Optronix**, Lahore.

## Phase 1 — Frontend Foundations

> Track: HTML → React → State

| Week | Topic | Assessment | Status |
|------|-------|------------|--------|
| W1 | HTML, CSS & JavaScript Fundamentals | [Fake Store — vanilla JS product page](./week-01-html-css-javascript) | ✅ Completed |
| W2 | React Fundamentals & JSX | [Todo App — core hooks only](./week-02-react-fundamentals-jsx) | ✅ Completed |
| W3 | Advanced React & State Management | [Task Manager — Router v6 + Zustand + React Query](./week-03-advanced-react-state-management) | ✅ Completed |

## Phase 2 — Backend & Database

> Track: Node → PostgreSQL → Auth

| Week | Topic | Assessment | Status |
|------|-------|------------|--------|
| W4 | Node.js & Express APIs | [Task Manager API — layered Express API](./week-04-nodejs-express-apis) | ✅ Completed |
| W5 | Databases — PostgreSQL & ORMs | — | ⏳ Upcoming |
| W6 | REST APIs & Authentication | — | ⏳ Upcoming |

## Phase 3 — Full-Stack Apps

> Track: Next.js → TS → Testing

| Week | Topic | Assessment | Status |
|------|-------|------------|--------|
| W7 | Next.js & Full-Stack Routing | — | ⏳ Upcoming |
| W8 | TypeScript & Type Safety | — | ⏳ Upcoming |
| W9 | Testing & Quality Assurance | — | ⏳ Upcoming |

## Phase 4 — Deploy & Ship

> Track: DevOps → Projects → Capstone

| Week | Topic | Assessment | Status |
|------|-------|------------|--------|
| W10 | DevOps, Docker & Deployment | — | ⏳ Upcoming |
| W11 | Performance, Security & Advanced Patterns | — | ⏳ Upcoming |
| W12 | Capstone Project & Final Assessment | — | ⏳ Upcoming |

## Tech Stack

- **HTML5 / CSS3 / JavaScript (ES6+)** — Fetch API, async/await, DOM manipulation
- **React 18** — JSX, Hooks (`useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`), Context API
- **State management** — Zustand (client state), TanStack React Query (server state, optimistic updates)
- **Routing** — React Router v6 (protected nested routes, URL search params)
- **Node.js & Express** — layered REST APIs (`db → services → controllers → routes`), express-validator, rate limiting, CORS, helmet

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
├── week-03-advanced-react-state-management/
│   ├── README.md
│   └── src/
│       ├── App.jsx
│       ├── api/tasksApi.js
│       ├── components/TaskRow.jsx
│       ├── context/AuthContext.jsx
│       ├── pages/ (Tasks, TaskDetail, Team, Settings, Login)
│       └── store/useUIStore.js
└── week-04-nodejs-express-apis/
    ├── README.md
    ├── package.json
    ├── server.js
    ├── controllers/ · db/ · middleware/ · routes/ · services/ · utils/
    └── postman/Task-Manager-Api.postman_collection.json
```

Each week folder contains its own `README.md` with the task details, features implemented and run instructions.
