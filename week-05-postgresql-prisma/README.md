# Week 5 — Databases: PostgreSQL & ORMs

**Phase 2 · Backend & Database**

A **Library Management API** built with **Node.js + Express + TypeScript** and **PostgreSQL** via the **Prisma ORM**. Demo, transaction-safe borrowing systems, overdue tracking and member analytics.

## What Was Implemented

| Requirement | Implementation |
|-------------|----------------|
| **Prisma schema** (`prisma/schema.prisma`) | 4 related models: `Library`, `Book`, `Member`, `Loan` — relations, uniques, `@@map` to plural table names |
| **Migrations + seed** | `prisma migrate dev` for schema, `prisma/seed.ts` with sample libraries, books and members |
| **Transactions (atomic borrow/return)** | `prisma.$transaction` — validates book & member, decrements/increments `availableCopies` and creates/updates the loan, all-or-nothing with rollback |
| **Input safety** | `409` when no available copies; `404` book/member not found; `409` duplicate email (`P2002`); `400` missing fields |
| **N+1 fix** | `include: { book, member }` in `findMany` instead of per-row queries; `queryCount` from Prisma query logs proves it (3 queries, not `2N+1`) |
| **Pagination** | `page` / `limit` (max 100) on all list endpoints using `skip`/`take` and `Promise.all([count(), findMany()])` |
| **Member analytics** | `/api/members/:id/stats` — `totalLoans`, `avgDaysHeld`, `favouriteGenre`, `genreBreakdown` |
| **Overdue detection** | `dueDate < now()` AND `returnedAt = null` |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/books?genre=&page=&limit=` | List books (optional genre filter) |
| GET | `/api/books/:id` | Book detail incl. active loans |
| POST | `/api/books` | Create book |
| GET | `/api/members` | List members (with loan counts) + pagination |
| GET | `/api/members/:id/stats` | Member analytics |
| POST | `/api/members` | Create member (unique email) |
| POST | `/api/loans` | Borrow a book (atomic transaction) |
| GET | `/api/loans?page=&limit=` | List loans (shows `queryCount` for N+1 proof) |
| GET | `/api/loans/overdue` | Overdue loans |
| PATCH | `/api/loans/:id/return` | Return a book (atomic transaction) |

## Project Structure

```
week-05-postgresql-prisma/
├── package.json
├── tsconfig.json
├── .env.example                # copy to .env and set DATABASE_URL
├── prisma/
│   ├── schema.prisma           # Library / Book / Member / Loan models
│   └── seed.ts                 # seed data
└── src/
    ├── server.ts               # Express app + routes wiring
    ├── db.ts                   # PrismaClient + queryCount tracking
    └── routes/
        ├── books.ts
        ├── loans.ts            # transactions, overdue, return
        └── members.ts          # stats, unique email handling
```

## Key Concepts Applied

1. **Transactions** — borrow/return is all-or-nothing; any failure rolls the whole operation back
2. **N+1 query prevention** — eager loading relations via `include` so the loans list uses a constant number of queries
3. **Prisma relations & migrations** — declarative schema → generated client → SQL migration
4. **PostgreSQL specifics** — `@unique` constraints, `DateTime` handling, `@@map` table naming
5. **Server-side analytics** — computing aggregates (averages, most frequent genre) in the API layer

## How to Run

```bash
# Prerequisites: a running PostgreSQL instance
cd week-05-postgresql-prisma
npm install
npx prisma init                       # creates .env — set DATABASE_URL there
npx prisma migrate dev --name init_library
npx prisma db seed                    # seed sample data
npm run dev                           # → http://localhost:3000
```

> The `.env` file is git-ignored — commit only `.env.example` with placeholder values. Never commit real database credentials.