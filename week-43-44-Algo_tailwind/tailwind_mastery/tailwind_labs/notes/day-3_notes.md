# Day 3 — Spacing, Rhythm & Density

## Core Meta Concepts

### Spacing

Spacing communicates **relationship**.

- Close = related
- Far = separate

In Tailwind:

- gap-\* → space between siblings
- p-\* → space between container and content

Avoid margins for layout rhythm.

---

### Rhythm

Rhythm is the **pattern of spacing over time** as the eye moves.

Good rhythm:

- repeats a small set of spacing values
- increases spacing only at structural breaks

Bad rhythm:

- random spacing changes
- too many gap values in one component

Tailwind enforces rhythm via a constrained spacing scale.

---

### Density

Density describes **how much information fits in a space**.

Density is defined by the relationship between:

- text size
- gap
- padding
- component size

---

## Density Modes

### Dense (fast scanning)

Use for: dashboards, tables, admin UIs

Tailwind anchors:

- text-sm
- gap-2
- p-3

---

### Comfortable (default apps)

Use for: forms, modals, cards

Tailwind anchors:

- text-base
- gap-4
- p-4 / p-6

---

### Airy (slow reading / emotional)

Use for: landing pages, onboarding

Tailwind anchors:

- text-lg
- gap-6 / gap-8
- p-8+

---

## Mental Flow for UI Decisions

Before touching classes, instead of “This looks off… let me tweak padding”
ask:

1. What density mode am I in?
2. Are these elements part of the same idea?
3. Is this a continuation or a section break?
4. Choose spacing accordingly.

Spacing expresses relationship  
Rhythm expresses structure  
Density expresses intent

---

## Key Takeaway

When UI feels “off”, it is usually:

- mixed density modes
- inconsistent spacing rhythm
- unclear relationships between elements

Fix the system, not individual classes.
