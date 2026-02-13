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

- mt-4

Medium separation:

- mt-6

Major boundary:

- mt-12

Spacing signals structural weight.

---

## Final Section Pattern

Section
├── Header (max-w-2xl)
└── Grid (mt-12 gap-6 md:grid-cols-3)

This is the base marketing layout primitive.
