# Lesson 8 — Performance & Prisma Footguns

## N+1 Query Problem

Querying inside loops silently kills performance.

## Fix

Eager-load relations or use counts.

## Payload Discipline

- include leaks structure
- select defines contracts

## Guardrails

- Always paginate
- Never return raw models
- Validate input before Prisma

## Prisma Philosophy

Strict writes, flexible reads.

## Key Insight

Clarity beats cleverness.
