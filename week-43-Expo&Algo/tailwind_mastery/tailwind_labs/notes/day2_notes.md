# Day 2 — Layout Mastery (The 80%)

## Core Principle

Layout answers one question only:
“How do elements relate in space?”

Visuals come later.

---

## Flex vs Grid Rule

- Flex → alignment & flow (default)
- Grid → structure & placement (dashboards, galleries)

If spacing siblings → Flex.

---

## Flex Anchors

- flex / flex-col / flex-row
- gap-\* (single source of spacing)
- items-_ / justify-_

Avoid margins for layout spacing.

---

## Width Anchors (Critical)

- Containers → max-w-\*
- Children → w-full
- Golden pattern: w-full + max-w-\*

- Viewport-Based Widths: use mainly for overlays and full-page layouts

w-screen(full viewport width) min-h-screen(full viewport height)

- Centering Trick: mx-auto

Common choices:

- max-w-sm → forms, cards
- max-w-md → modals
- max-w-lg/xl → content columns
- max-w-5xl+ → page sections

---

### color rule

There are only 5 roles you need early:

Page -> background bg-gray-100 / bg-background
Surface -> bg-white
Border -> border-gray-200
Primary text -> text-gray-900
Muted text -> text-gray-500

---

## Modal Structure

Overlay (fixed, inset-0)
→ Centering wrapper (flex, items-center, justify-center)
→ Modal box (w-full, max-w-md, p-\*)

Overlay ≠ modal.

---

## Layout Patterns Learned

- Card = vertical stack + gap + padding
- Form = vertical stack of horizontal rows
- Modal = layered structure, centered content

---

## Key Takeaway

When UI feels unstable:

- define container width
- centralize spacing with gap
- describe layout in plain English
