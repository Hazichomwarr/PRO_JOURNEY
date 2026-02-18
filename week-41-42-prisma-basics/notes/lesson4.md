# Lesson 4 — Querying & Data Shaping

## include vs select

- include = exploratory, internal
- select = intentional, API-facing

## Filtering

- Use `some`, `none`, `every` for relations
- Filter enums via values, not booleans

## Counting

Use `_count` instead of loading arrays.

## Ordering

Always define `orderBy` for deterministic results.

## API Discipline

Never expose raw database models.
Shape responses deliberately.

## Key Insight

Databases store data.
APIs shape meaning.
