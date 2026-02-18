# Lesson 5 — Safe Writes & Transactions

## connectOrCreate

Used for relationships.
Prevents race conditions when linking data.

## upsert

Used for a single model.
Create or update atomically.

## Transactions

All-or-nothing execution.
Used when multiple writes must succeed together.

## When to Use Transactions

- Money
- Inventory
- Permissions
- Cross-table invariants

## When NOT to Overuse

- Increased locking
- Higher latency
- Harder debugging

## Key Insight

Reads can be flexible.
Writes must be safe.
