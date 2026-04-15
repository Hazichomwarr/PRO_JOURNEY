# Lesson 2 — Layout Mastery (Flex Rules)

## Core Rule

Only ONE child should control remaining space.

Use:
flex: 1

---

## Flex is Proportion, Not Percentage

❌ Avoid:
flex: 0.7 / 0.3

✅ Use:
flex: 7 / 3

Reason:
Flex distributes remaining space proportionally.

---

## Default Layout Behavior

- Direction: column (vertical)
- Width: stretches by default

---

## Cross-Axis Control (Critical)

alignItems controls width behavior.

Default:
alignItems: "stretch"

If you set:
alignItems: "center"

👉 Children will NOT take full width.

---

## Common Mistakes

❌ Using width manually (e.g., width: 100)  
❌ Multiple flex: 1 at same level  
❌ Using percentages instead of ratios  
❌ Breaking layout with alignItems

---

## Layout Pattern (Advanced)

You can split space like this:

Parent (flex: 1)
├── Child A (flex: 7)
└── Child B (flex: 3)

Result:
70% / 30% split (proportional)

---

## Mental Model

Flex = share of remaining space

Not size. Not pixels. Not percentage.

---

## Key Insight

Parent controls children layout.
Cross-axis alignment can override expected behavior.
