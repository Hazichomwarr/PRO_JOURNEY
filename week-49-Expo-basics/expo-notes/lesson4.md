# Lesson 4 — Routing Patterns (Expo Router)

## Route Groups

(folder) = organization only

(auth) → login flow  
(app) → main app

---

## Layouts per Group

Each group can define its own navigation behavior.

---

## Auth Gate

Use layout to protect routes:

if not logged in → redirect

---

## Navigation Rules

login → replace  
app navigation → push

---

## Structure

app/
(auth)/
(app)/

### (auth) / (app)

- Custom naming
- Convention for clarity

### Duplicate routes

- ❌ Not allowed
- Causes conflicts

### Flow

- Router matches path globally
- Layout decides access

---

## Key Insight

Structure determines scalability.
