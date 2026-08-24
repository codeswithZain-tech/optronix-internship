# Week 2 — React Fundamentals & JSX

**Phase 1 · Frontend Foundations**

A **Todo App** built with React that implements all 7 required features using only core React hooks (`useState`, `useEffect`) — no external libraries.

## Features Implemented

| # | Feature | How It Works |
|---|---------|--------------|
| 1 | **Add Todo** | Controlled input (`value` + `onChange`) tied to `inputValue` state; form submission creates a new todo object with a unique id (`Date.now()`) and adds it via spread syntax (`setTodos([...todos, newTodo])`) |
| 2 | **Mark Complete** | `toggleComplete()` uses `.map()` to create a new array with the matching todo's `completed` flag flipped; inline styles apply strike-through and gray color when completed |
| 3 | **Delete Todo** | `deleteTodo()` uses `.filter()` to remove the todo matching the given id, returning a new array without mutating state directly |
| 4 | **Filter Tabs** | A `filter` state (`"all" \| "active" \| "completed"`) controls which todos are shown. `filteredTodos` is **not** stored as separate state — it's derived from `todos` + `filter` on every render, keeping it always in sync |
| 5 | **Clear Completed** | `clearCompleted()` filters out all todos where `completed` is `true`, keeping only active ones |
| 6 | **Live Count** | `remainingCount` is derived by filtering incomplete todos and reading `.length` — recalculated automatically on every render |
| 7 | **localStorage Persistence** | `useState`'s lazy initializer loads todos from localStorage on mount, and a `useEffect` with `[todos]` dependency saves to localStorage whenever todos change |

## State Management Approach

State ownership follows one-directional data flow: all state (`todos`, `inputValue`, `filter`) lives in `App`, and all functions that mutate state are defined in `App` and called via event handlers. Derived values (filtered list, remaining count) are computed during render instead of being stored as state.

## Project Structure

```
src/
└── App.jsx    # Full application: state, handlers & UI
```

## How to Run

```bash
# Create a Vite React project and copy src/App.jsx into it
npm create vite@latest week2-todo -- --template react
cd week2-todo
npm install
npm run dev
```

## Key Concepts Applied

- JSX syntax and conditional rendering
- Controlled components (form inputs)
- Immutability with `.map()`, `.filter()`, spread operator
- Derived state vs stored state
- `useEffect` for side effects (persistence)
- Lazy `useState` initializer for reading localStorage once on mount
