# Lesson 9 — Production Patterns

## Separation of Concerns

- Prisma = data access
- Business logic = services
- API layer = orchestration

## Error Handling

- Prisma errors are exceptional
- Not control flow

## Soft Deletes

Prefer flags over deletes in real systems.

## Multi-Tenancy

Always scope queries early.

## Key Insight

Prisma is a tool, not an architecture.
