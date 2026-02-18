# Lesson 6 — Correct Reads & Indexing

## findUnique

- Must target unique fields
- Fastest
- Encodes expectation of existence

## findFirst

- Returns one of many
- Requires ordering if specificity matters

## findMany

- Returns collections
- Empty array is valid

## Indexing

Indexes prevent full table scans.
They matter earlier than expected (~10k rows).

## Composite Indexes

Index how you READ, not how you STORE.

## Key Insight

Choose queries based on intent, not convenience.
