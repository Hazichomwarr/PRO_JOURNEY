# Lesson 1 — Prisma Foundations

## What Prisma Is

Prisma is NOT a database.
It is:

- A schema language
- A migration system
- A type-safe database client

PostgreSQL stores data. Prisma translates intent into SQL.

## Core Flow

schema.prisma → migrate → database → Prisma Client → app

## Key Concepts

- `schema.prisma` is the single source of truth
- Never edit the database directly
- Migrations sync schema changes to the DB
- Prisma Client is regenerated automatically on migration

## Commands

- `npm install prisma --save-dev`
- `npm install @prisma/client`
- `npx prisma init`
- `npx prisma migrate dev`
- `npx prisma studio`

## Mental Model

Prisma enforces clarity:

- Schema defines structure
- Migrations define history
- Client enforces correctness

## Prisma stable version

@prisma/client": "^6.9.5
**Do NOT use prisma 7, the latest.**
