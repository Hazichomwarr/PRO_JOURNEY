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

Split sections: gap-10

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

## Pattern learned

- Use mt-\* for structural spacing hierarchy.
- Use flex flex-col gap-\* when elements are same structural level.

In hero text group:

Title

Paragraph

CTA group

These are different hierarchy levels, so individual mt-\* preserves intentional spacing differences.

---

# Week-3: Typography

Eyebrow provides category context to reduce headline ambiguity.

It answers: “What domain is this headline about?”

---

h1 → text-4xl / text-5xl → page authority

h2 → text-3xl → section authority

h3 → text-lg → card authority

p → text-base neutral-700 → explanation layer

eyebrow → text-sm neutral-500 → context layer

---

## Layout container (page width)

- max-w-6xl → main site container (almost always)
- Column text → max-w-xl
- Section header → max-w-2xl
- Centered statement → max-w-3xl

That’s enough to build 90% of pages.

---

## Typography Hierarchy System

---

## Core Principle

Typography encodes **authority hierarchy**, not aesthetics.

Users scan authority instantly using:

- size
- weight
- contrast
- spacing

Typography must follow a deterministic ladder.

---

# Authority Ladder (Highest → Lowest)

```txt
h1 → text-4xl md:text-5xl font-bold text-neutral-900
h2 → text-3xl font-bold text-neutral-900
h3 → text-lg font-semibold text-neutral-900
p  → text-base text-neutral-700
eyebrow → text-sm font-medium text-neutral-500
legal/meta → text-xs text-neutral-500
```

Each level must strictly decrease in authority.

Never skip hierarchy levels.

---

# Eyebrow Label Rule

Purpose: provide **context**, not dominance.

Use when headline needs domain clarification.

Structure:

```html
<p class="text-sm font-medium text-neutral-500">CATEGORY</p>
<h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-900"></h2>
```

Spacing: eyebrow → headline uses `mt-2`.

---

# Spacing Ladder (Typography Rhythm)

```txt
mt-2 → eyebrow → headline
mt-4 → headline → paragraph
mt-6 → paragraph → list / CTA
mt-8 → paragraph → CTA group
mt-12 → section header → content group
```

Spacing encodes semantic distance.

---

# Section Text Width Constraints

```txt
max-w-xl  → split-section text blocks / hero columns
max-w-2xl → section headers above grids
max-w-3xl → centered statement sections
max-w-6xl → overall content container
```

Layout width ≠ reading width.

---

# Card Typography Hierarchy

```html
<h3 class="text-lg font-semibold text-neutral-900">
  <p class="mt-2 text-sm text-neutral-600"></p>
</h3>
```

Card headline authority must remain below section authority.

---

# Navbar Typography Hierarchy

```html
Logo → text-lg font-semibold text-neutral-900 Nav → text-sm font-medium
text-neutral-700 CTA → text-sm font-medium bg-black text-white
```

CTA gains authority through contrast, not font size.

---

# Footer Typography Hierarchy

```html
Brand → text-lg font-semibold text-neutral-900 Links → text-sm font-medium
text-neutral-700 Legal → text-xs text-neutral-500
```

Legal text always lowest authority.

---

# Split Section Typography Pattern

```html
eyebrow h2 section headline paragraph explanation bullet list support
```

Authority flows top → down.

---

# Structural Rule

Typography hierarchy must mirror structural hierarchy.

Structure defines authority.
Typography reinforces authority.

Never reverse this relationship.

---

# Result After Week-3

You can now construct professional typography systems for:

- landing pages
- hero sections
- feature sections
- split layouts
- navbars
- footers
- card systems

without guesswork.

---

# Week 4 — Landing Page Composition Patterns

## Core Principle

Professional pages are not designed from scratch every time.

They are assembled from **reusable section patterns** that follow a predictable persuasion sequence.

Layout knowledge from Weeks 1–3 becomes **page architecture**.

---

# Universal Landing Page Flow

```
Hero
Trust
Feature Grid
Split Feature
CTA Band
Footer
```

Each section answers a specific psychological question.

---

# 1. Hero Section — Attention

**Purpose:** capture attention and communicate the core value.

Structure:

```
Hero
  Eyebrow (optional)
  H1 headline
  Supporting paragraph
  CTA buttons
```

Spacing ladder:

```
mt-2 → eyebrow → headline
mt-6 → headline → paragraph
mt-8 → paragraph → CTA group
```

Hero vertical rhythm:

```
py-24
```

---

# 2. Trust Section — Credibility

**Purpose:** provide social proof and legitimacy.

Structure:

```
Header (centered)
Stat Grid
  Stat Block
    Number
    Label
```

Stat typography:

```
number → text-2xl font-semibold
label → text-sm text-neutral-600
```

Typical layout:

```
grid grid-cols-2 md:grid-cols-4
```

---

# 3. Feature Grid — Explanation

**Purpose:** explain key capabilities.

Structure:

```
HeaderGroup
Feature Grid
  Feature Card
    Title
    Description
```

Card typography:

```
title → text-lg font-semibold text-neutral-900
description → text-sm text-neutral-600
```

Grid layout:

```
grid gap-6 md:grid-cols-3
```

---

# 4. Split Feature — Deep Explanation

**Purpose:** explain _how_ something works.

Structure:

```
Text Column
  Eyebrow
  H2 headline
  Paragraph
  Bullet list

Media Column
  Image / illustration / video
```

Layout:

```
grid md:grid-cols-2
```

List typography:

```
list-disc
pl-5
text-sm text-neutral-600
```

---

# 5. CTA Band — Conversion

**Purpose:** convert user interest into action.

Structure:

```
Headline
Supporting paragraph
Primary CTA
Secondary CTA
```

Visual style:

```
bg-neutral-900
text-white
text-white/80
```

Primary button:

```
bg-white text-neutral-900
```

Secondary button:

```
border border-white/30 text-white
```

---

# 6. Footer — Closure

**Purpose:** provide navigation, brand context, and legal information.

Structure:

```
Brand block
Navigation links
Legal/meta line
```

Typography hierarchy:

```
brand → text-lg font-semibold
links → text-sm font-medium
legal → text-xs text-neutral-500
```

---

# Persuasion Sequence

Landing pages follow a **trust funnel**:

```
Hero → Attention
Trust → Credibility
Features → Understanding
Split → Conviction
CTA → Action
```

---

# Result After Week 4

You can now assemble complete landing pages using deterministic section patterns instead of guessing layouts.

This structure is used across modern websites such as:

- Stripe
- Vercel
- Linear
- Notion
- Apple product pages

The blank canvas problem is eliminated by composing pages from known sections.

# Week 5 — Interaction & Navigation Patterns

Week 5 introduced the behavioral layer of user interfaces.

The focus was building a modern navigation system with responsive behavior,
smooth scrolling, and UI micro-interactions.

---

# Navigation System Components

A production navigation system includes:

- Sticky navigation
- Mobile hamburger menu
- Smooth anchor scrolling
- Scroll shadow feedback
- Animated mobile dropdown menu
- ScrollSpy section highlighting
- Animated hamburger → close icon

---

# Sticky Navbar

Sticky navigation keeps the navbar visible while the user scrolls.

Key CSS utilities:

```
sticky
top-0
z-50
bg-white/80
backdrop-blur
```

Scroll shadow provides feedback when the user begins scrolling.

Example behavior:

```
window.addEventListener("scroll")
```

---

# Mobile Navigation Pattern

Navigation structure:

```
Navbar
 ├ Logo
 ├ Desktop links
 └ Hamburger button

Mobile menu
 └ Dropdown panel
```

Mobile navigation appears only on small screens.

Desktop navigation remains visible on larger screens.

---

# Smooth Anchor Scrolling

Smooth scrolling allows users to navigate to sections of a page without abrupt jumps.

Enabled using:

```
scroll-smooth
```

Example navigation link:

```
<a href="#mission">
```

Section offset for sticky navbars:

```
scroll-mt-24
```

This prevents headings from being hidden behind the navbar.

---

# Animated Dropdown Menu

The mobile menu uses motion primitives to create smooth transitions.

Core animation properties:

```
opacity
translateY
transition
duration
```

Example state change:

```
opacity-0 → opacity-100
-translate-y-2 → translate-y-0
```

This creates a fade + slide animation.

---

# Hamburger Icon Animation

The hamburger icon morphs into a close icon when the menu opens.

This animation uses CSS transforms.

Core transforms:

```
rotate
translate
opacity
```

Example transformation:

```
rotate(45deg)
rotate(-45deg)
```

Three bars transform into an "X".

---

# ScrollSpy Navigation

ScrollSpy highlights the navigation item corresponding to the section currently in view.

Implementation steps:

```
detect visible section
compare section id with nav link href
apply active class to matching link
remove active class from others
```

This provides visual feedback while scrolling.

---

# Motion Primitives

Most modern UI animations rely on four CSS primitives:

```
opacity
translate
scale
rotate
```

Combined with:

```
transition
duration
ease
```

These primitives power most modern UI interactions.

---

# Result After Week 5

You can now build a modern navigation system with:

- Sticky navigation
- Responsive mobile menus
- Smooth scrolling
- Animated dropdown menus
- Scroll-based UI feedback
- Interactive hamburger animations

This completes the interaction layer of the UI system.

---

# These five primitives allow you to build almost everything.

Container
└ HeroSection
├ Stack
│ ├ Heading
│ ├ Text
│ └ Button

---

# Typical Production Frontend Structure

app/
│
├─ layout.tsx
├─ page.tsx
│
├─ components/
│ ├─ ui/ # primitives
│ │ ├─ Button.tsx
│ │ ├─ Card.tsx
│ │ ├─ Container.tsx
│ │ ├─ Input.tsx
│ │ └─ Badge.tsx
│ │
│ ├─ navigation/
│ │ ├─ Navbar.tsx
│ │ ├─ MobileMenu.tsx
│ │ └─ NavLink.tsx
│ │
│ ├─ sections/
│ │ ├─ HeroSection.tsx
│ │ ├─ TrustSection.tsx
│ │ ├─ FeatureGrid.tsx
│ │ ├─ FestivalSection.tsx
│ │ └─ CTASection.tsx
│ │
│ └─ layout/
│ ├─ Footer.tsx
│ └─ PageWrapper.tsx
│
├─ lib/
│ ├─ utils.ts
│ ├─ constants.ts
│ └─ hooks/
│ ├─ useScrollSpy.ts
│ └─ useMobileMenu.ts
│
├─ styles/
│ └─ globals.css
│
└─ content/
├─ site.ts
└─ festival.ts

---
