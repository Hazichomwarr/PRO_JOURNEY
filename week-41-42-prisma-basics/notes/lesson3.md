# Lesson 3 — Many-to-Many & Enums

## Many-to-Many Rule

Always use an explicit join table.

## Why

- Control
- Metadata on relationships
- Real SQL clarity

## Example Join Table

Post ↔ Tag via PostTag

## Composite Primary Keys

Use @@id([fieldA, fieldB]) to prevent duplicates.

## Enums

Enums model finite states at the schema level.

## When to Use Enums

- Statuses
- Roles
- Permissions

## When NOT to Use Enums

- User-generated values
- Tags
- Categories

## Key Insight

Relations model structure.
Enums model behavior.
