# Lesson 7 — Pagination at Scale

## OFFSET Pagination

Uses skip + take.
Degrades linearly.
Breaks at scale.

## Cursor Pagination

Uses position, not page numbers.
Scales logarithmically.
Stable under inserts.

## Cursor Rules

- Cursor must be unique
- Always define orderBy
- Use skip: 1 to avoid duplicates

## Production Pattern

Return nextCursor with each page.

## Key Insight

Real systems paginate by position, not page number.
