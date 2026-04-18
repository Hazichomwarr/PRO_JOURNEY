# Lesson 9 — UX Polish

## Core Idea

Every screen must handle:
loading, empty, error, success

---

## States

Loading → show feedback  
Empty → guide user  
Error → show + retry  
Success → render UI

---

## UX Rules

- never leave blank screen
- always give feedback
- allow recovery (retry)

---

## Micro-Polish

- touch feedback
- spacing consistency
- text hierarchy

---

## State reset is part of UX

- Retry ≠ just call function
- Retry = reset state + re-fetch
  > Don't forget to reset state

## Styling in RN (React Native) has layers

- Static → StyleSheet
- Dynamic → inline function

## Layout consistency matters

- flex: 1 everywhere at root
- Centering for states

---

## Key Insight

UI should reflect state, not assumptions.
