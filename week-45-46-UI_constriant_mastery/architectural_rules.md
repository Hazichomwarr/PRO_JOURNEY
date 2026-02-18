# ARCHITECTURAL RULES (to keep forever)

- A <section> defines _vertical grouping_: section → vertical stack
- A <div> inside defines _layout behavior_: (grid/flex) div → horizontal

## Vertical Rhythm Hierarchy Rule

Spacing must scale based on structural weight.

- Title → paragraph → mt-4
- Paragraph → button → mt-6
- Header block → grid block → mt-12

---

## Spacing Hierarchy Rule

Minor separation:

- mt-4 (continuation of same conceptual block: Text → text)

Medium separation:

- mt-6 (transition to a new interactive element: Text → action = medium spacing)

Major boundary:

- mt-12 (Block → new block = large spacing (mt-12+) )

Spacing signals structural weight.

---

## Final Section Pattern

Section
├── Header (max-w-2xl)
└── Grid (mt-12 gap-6 md:grid-cols-3)

This is the base marketing layout primitive.

---

# Week 1 – Day 2

## 2-Column Split Section (Geometry Control)

---

## Core Concepts Reinforced

---

## 1️⃣ Section = Vertical Container

- `<section>` controls vertical stacking.
- It does NOT control horizontal layout.
- Grid lives inside the section.

---

## 2️⃣ Split Layout Pattern

Structure:

Section
└── Grid (md:grid-cols-2)
├── TextGroup
└── MediaGroup

Rules:

- Mobile: stacked (1 column)
- md+: 2 columns
- items-center to vertically align both sides

---

## 3️⃣ Column Gap Discipline

Card grids:

---

Split sections:

Reason:
Two large columns require more breathing room than compact cards.

Spacing scales with structural weight.

---

## 4️⃣ Reading Width Inside Columns

Even inside a column, text width must be constrained.

Use: max-w-xl

Reason:
Constraints must remain meaningful within layout context.

If the column is narrower than `max-w-2xl`, that constraint does nothing.

---

## 5️⃣ Media Placeholder Geometry

Right column uses:

- fixed height (h-48 or larger)
- rounded-xl
- border
- bg-white

Purpose:
Visualize box model clearly during training.

---

## Final Pattern

<section>
  Grid (gap-10 md:grid-cols-2)
    Left: max-w-xl text group
    Right: fixed-height media box

This is the base split-section primitive.

---

# Week 1 – Day 3

## Centered Text Block Section

---

## Purpose

Used for:

- Mission statements
- Value propositions
- CTAs
- Trust messaging

This is a core marketing primitive.

---

## Structure Pattern

Section
└── CenteredTextGroup (max-w-3xl mx-auto text-center)

    ├── Title
    ├── Paragraph
    └── Button

---

## Constraints

Section spacing: Centered container

Spacing hierarchy:
Title → Paragraph: mt-4
Paragraph → CTA: mt-6

---

# Week-1 Day-4: The Core Principle: Structure first, style second

Geometry defines structural hierarchy, while fonts and colors define stylistic hierarchy — structure must be correct before style is applied

## Geometry answers:

- What is primary vs secondary
- What attracts attention first
- What occupies more visual weight
- How the layout flows

## Style answers:

- How it looks emotionally
- Brand identity
- Tone

> If structure is wrong, no amount of styling fixes it.

## Example:

- Bad geometry + fancy style = still bad UI
- Good geometry + plain style = already good UI

> That’s why most professional sites look good even in grayscale.
> **Because their geometry is correct.**

## Summary

Geometry = architecture
Style = paint

You don’t paint before building the structure.

> Area > position > contrast > typography.

---

# Week-1 Day-5: 4-Card Grid Section (Expanded Grid Primitive)

---

## Objective

Section
├── HeaderGroup
└── GridGroup

    ├── Card
    ├── Card
    ├── Card
    └── Card

## Pattern learned

- md:grid-cols-2
- lg:grid-cols-4

**items-center is for split sections (text + media) not for card grids**

---

# Week-1 Day-6: Hero Section

Hero is structurally different from normal sections. It has two special properties:

1. It occupies dominant vertical space
2. It anchors the page entry point

---

## Hero Structure

Section (Hero)
└── Grid

    |── TextGroup

        ├── Title

        ├── Paragraph

        └── CTA group

    |
    └── MediaBlock

## Patter learned

- Use mt-\* for structural spacing hierarchy.
- Use flex flex-col gap-\* when elements are same structural level.

In hero text group:

Title

Paragraph

CTA group

These are different hierarchy levels, so individual mt-\* preserves intentional spacing differences.

---
