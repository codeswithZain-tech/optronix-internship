# Week 4 — Node.js & Express APIs

**Phase 2 · Backend & Database**

A complete **Task Manager API** built with **Node.js + Express** using a layered architecture (`db → services → controllers → routes`). Full CRUD for both `/tasks` and `/users`, filtering, validation, rate limiting, CORS and security headers — tested and submitted with a Postman collection.

## Requirements Covered

| # | Requirement | Implementation |
|---|-------------|----------------|
| 1 | **Full CRUD** on `/tasks` and `/users` | GET all / GET by id / POST / PUT / DELETE for both resources |
| 2 | **Filter tasks** by status, assignee, due date range | `status` (exact), `assigneeId` (Number convert + exact), `dueAfter`/`dueBefore` (date range) — combined with AND logic in `taskService.js` |
| 3 | **express-validator** on write endpoints | `taskValidationRules` (title 3–150 chars, assigneeId integer, ISO dueDate) and `userValidationRules` (name, email) |
| 4 | **asyncHandler** | Wraps every controller so thrown errors flow to the global error handler |
| 5 | **Rate limiting + CORS** | `express-rate-limit` global limiter (200 req / 15 min), CORS restricted to `http://localhost:5173` |
| 6 | **Layered structure** | `db → services → controllers → routes` |
| 7 | **Postman collection** | `postman/Task-Manager-Api.postman_collection.json` (Collection v2.1, `{{baseUrl}}` env var) |

## Extra Details

- **Health check**: `GET /health` → `{ status: "ok", uptime: process.uptime() }`
- **Data integrity**: `assigneeId` is validated against real users before creating a task → returns `422` if the user doesn't exist; deleting a user with assigned tasks returns `409`
- **Pagination**: `?page` & `?limit` (max 100) on the tasks list with `total` / `totalPages`
- **Reused building blocks**: `asyncHandler`, `errorHandler`, `rateLimiters`, `helmet`, `cors`, request logger middleware

## Project Structure

```
week-04-nodejs-express-apis/
├── server.js
├── package.json
├── controllers/
│   ├── taskController.js
│   └── userController.js
├── db/
│   └── taskDb.js              # In-memory seed data + DB operations
├── middleware/
│   ├── errorHandler.js
│   ├── loggerMiddleware.js
│   ├── rateLimiters.js
│   └── validators.js          # express-validator rules + shared validate()
├── routes/
│   ├── tasksRouter.js
│   └── usersRouter.js
├── services/
│   ├── taskService.js         # Business logic + filtering
│   └── userService.js
├── utils/
│   └── asyncHandler.js
└── postman/
    └── Task-Manager-Api.postman_collection.json
```

## How to Run

```bash
cd week-04-nodejs-express-apis
npm install
npm start        # → http://localhost:3000
```

Then test endpoints in Postman by importing `postman/Task-Manager-Api.postman_collection.json`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/tasks?status=&assigneeId=&dueAfter=&dueBefore=&page=&limit=` | List tasks (with filters + pagination) |
| GET | `/api/tasks/:id` | Get task by id |
| POST | `/api/tasks` | Create task (validated) |
| PUT | `/api/tasks/:id` | Update task (validated) |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/users` | List users |
| GET | `/api/users/:id` | Get user by id |
| POST | `/api/users` | Create user (validated) |
| PUT | `/api/users/:id` | Update user (validated) |
| DELETE | `/api/users/:id` | Delete user |