# Lesson 2 — Relations (One-to-Many)

## Core Rule

Databases do NOT store arrays.
Relations are implemented using foreign keys.

## Example

- A User has many Posts
- A Post belongs to one User
  → The foreign key lives on Post

## Prisma Relation Fields

- Foreign key field (e.g. authorId) → exists in DB
- Relation field (e.g. author, posts[]) → Prisma-only

## Why Both Exist

- Foreign keys enforce DB integrity
- Relation fields enable navigation, includes, and nested writes

## Required vs Optional Relations

- `User` vs `User?`
- `String` vs `String?`
  Controls whether nulls are allowed.

## Key Insight

Foreign keys are database truth.
Relation fields are Prisma navigation.
