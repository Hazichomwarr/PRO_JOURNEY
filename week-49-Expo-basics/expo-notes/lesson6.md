# Lesson 6 — API Layer & Data Fetching

## Core Goal

Create a clean bridge between mobile app and backend.

---

## Architecture

Mobile (Expo)
↓ fetch()
API Layer (lib/api.ts)
↓
Backend (Next.js / Node / etc.)
↓
Database

---

## API Layer Pattern

Create a reusable function:

apiFetch(path, options)

Responsibilities:

- attach token automatically
- handle headers
- handle errors
- return parsed JSON

---

## Example

const res = await apiFetch("/api/profile");

---

## Rules

❌ Do NOT fetch inside layout  
❌ Do NOT duplicate fetch logic in components

✅ Fetch inside screens  
✅ Centralize logic in lib/api.ts

---

## Async UI Pattern

useEffect → fetch → setState

Handle:

- loading state
- error state
- success state

---

## Common Mistakes

❌ forgetting res.json()  
❌ not calling async function inside useEffect  
❌ using localhost on real device  
❌ mixing auth logic with data fetching

---

## Key Insight

Layout controls access.  
Screens control data.  
API layer connects both worlds cleanly.
