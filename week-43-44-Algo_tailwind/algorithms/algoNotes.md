# Day 2 – Algorithms Foundations (JS)

## Key Concepts Learned

### 1. Input → Process → Output

Every algorithm:

- Takes an input
- Transforms it step by step
- Returns an output (not console logs)

### 2. Zero-Based Indexing

- Arrays and strings start at index `0`
- `length` gives the number of elements, not the last index
- Last valid index = `length - 1`

### 3. Loop Boundaries

- Forward loops: `i = 0; i < length`
- Backward loops: `i = length - 1; i >= 0`

### 4. Core Algorithm Patterns

- Accumulator pattern (sum, average)
- Reverse traversal (strings, arrays)
- Conditional counting (vowels, filters)

### 5. JavaScript vs Python Difference

- `in` in JavaScript checks KEYS, not VALUES
- Use `includes()` to check value membership

## Algorithms Implemented

- sumArray(arr) → O(n)
- reverseString(str) → O(n)
- countVowels(str) → O(n)

## Personal Insight

Algorithms are predictable patterns built on careful boundaries and conditions — not magic.

---

# Day 3 & 4 - Decision Problem and Planning discipline

## Key Concepts Learned

### 1. Decision Tree:

- Check overlapping characterictics first, then continue until uniqueness

### 2. Problem planning discipline:

- 1. Answer the 5 planning questions: I-O-DATS-OC-NG
- 2. if OC, Write the condition order in plain English
- 3. Identify if the output represents maximum authority or current/session result
- 4. Then Code it.

### Core Insight

- Most bugs come from solving the wrong problem correctly
- Condition order is determined by the system model, not by syntax

## Algorithms Implemented

- fizzBuzz(str) -> 0(1)
- getAccess(str) -> 0(1)

---

# Day 5 — Loops & Early Exit Discipline

## Core Idea

Loops have different contracts. Most bugs happen when the wrong contract is used.

## Planning Checklist for Loops

Before writing a loop:

1. Am I searching or accumulating?
2. Can the answer be known before reaching the end?
3. Would stopping early still produce a correct result?

If YES → Search loop → early exit allowed  
If NO → Accumulation loop → full traversal required

---

## Key Insight

- “All X are valid” problems are usually:
  → Searches for a single counterexample
- Reframe:
  - “Are all positive?” → “Is there any non-positive?”

---

## Core Rule

Early exit is a feature only when the loop’s goal is to decide, not to build.

---

## Common Bug Pattern

- Using early return in accumulation loops
- Returning inside a loop unintentionally
- Mixing search helpers with element-level accumulation

---

## The Two Loop Contracts

### 1. Search Loop

Goal: decide or find something.

Characteristics:

- Looks for a condition or violation
- Can stop early
- Uses `return` or `break` inside the loop
- Optimized for speed

Examples:

- Check if a value exists
- Validate conditions
- Authorization checks
- “Any” / “All” type problems

Rule:

- Early exit is correct and encouraged

---

### 2. Accumulation Loop

Goal: build or compute a result.

Characteristics:

- Must process all elements
- Early exit causes incorrect results
- Uses a running total, count, or structure

Examples:

- Sum
- Count
- Average
- Frequency tables
- Transformations

Rule:

- Full traversal is mandatory

---

## Algorithms implemented

hasEvenNumber -> 0(n)
sumOfAllEvenNumber -> 0(1)

---

# Day 6 — Nested Loops & Time Complexity (Intuition)

## Core Idea

Nested loops are not bad by default.
They are required when a problem involves relationships that cannot be expressed in a single pass.

---

## Legitimate Reasons for Nested Loops

### 1. Pairwise Comparison

Used when each element must be compared with other elements.

Examples:

- Detect duplicates
- Count value pairs (e.g., sum to 10)
- Match items between two arrays

Mental model:

- “Every item must be compared with others”

Optimization:

- Start inner loop at `j = i + 1` to avoid redundant comparisons
- Early exit allowed only for search problems

---

### 2. Structural Nesting (Grids / Matrices)

Used when data itself is nested.

Examples:

- 2D arrays
- Game boards
- Tables
- Image pixels

Mental model:

- “The data (structure) is nested, so the loops must be nested”

---

### 3. Containment Relationships

Used when each item contains its own collection.

Examples:

- Users → permissions
- Orders → items
- Sentences → words

Mental model:

- “For each X, process its Y”

---

## Index vs Value Rule

- Index variables (`i`, `j`) control traversal
- Value variables (`arr[i]`, `arr[j]`) answer the problem

Best practice:

- Assign values to named variables (`a`, `b`, `current`, `candidate`)
- Reduces cognitive load and prevents index/value bugs

---

## Performance Insight

- O(n²) is acceptable when the problem requires pairwise comparison
- Correctness always comes before optimization
- You cannot optimize a wrong solution

---

## Core Rule

Nested loops appear when a single pass cannot express the relationship the problem asks about.

## Algorithms implemented

arrayHasDuplicate -> 0(n2)
pairSum10 -> 0(n2)

---

# Day 7 — State Tracking & Consecutive Logic

## Core Ideas Learned

### 1. State Variables

Some problems require remembering past information while moving forward.
These are called **state variables** (e.g. smallestSoFar, currentStreak).

### 2. Consecutive ≠ Pairwise

- “Consecutive / in a row / adjacent” problems only require **neighbor comparison**.
- This collapses the problem to a **single loop**.
- Nested loops are not just inefficient — they are logically unnecessary.

### 3. When NOT to Use Nested Loops

Ask:

> Am I comparing each item with many others, or just its neighbor?

- Neighbor only → single loop
- Many-to-many → nested loops

### 4. Order Guarantees Meaning

Iteration order already enforces consecutiveness.
The loop itself proves adjacency — no need to re-check distance.

### 5. Explicit Decisions Beat Helpers

Avoid hiding logic behind helpers when learning.
Write comparisons explicitly to train algorithmic thinking.

If you are tracking a running state, compare with the past, not the future.

---

# Day 8 — Nested Loops & 2D Thinking

## Core Insights

### 1. What Nested Loops Mean

Nested loops model **two dimensions**:

- outer loop → high-level structure (rows, base element, phase)
- inner loop → detailed work inside each unit

They are required when:

- each element must interact with multiple others
- a problem has rows × columns, pairs, or combinations

### 2. Nested Loops Are Not “Slow by Default”

They are correct when the problem space itself is 2D.
Using a single loop in a 2D problem adds unnecessary complexity.

### 3. Pairwise vs Adjacent Comparison

- Pairwise (nested): compare many-to-many (e.g. generating all pairs)
- Adjacent (single): compare neighbors only (e.g. consecutive characters)

### 4. Loop Invariants Matter

Each loop counter must have **one clear meaning**.
If progression rules change (grow → shrink), use separate loops or phases.

### 5. Printing vs Returning

- Functions that print usually don’t return values
- `undefined` is returned by default if nothing is returned

## Algorithms implemented

- printRectangle(w,h) -> 0(n2)
- printTriangleSymetry(n) -> 0(n+n)
- pairGeneration(arr) -> 0(n2)

---

# Day 9 — map & filter (Manual Implementations)

## map — Transformation Contract

- Input array → output array
- Output length === input length
- Purpose: transform values, not structure

Manual map pattern:

- create new array
- loop
- push transformed value
- return new array

## filter — Selection Contract

- Output length ≤ input length
- Purpose: keep elements that pass a condition

Manual filter pattern:

- create new array
- loop
- conditionally push
- return new array

## Key Distinction

- map answers: "What should this become?"
- filter answers: "Should this stay?"

## Loop Insight

Both map and filter:

- are single-pass loops
- do NOT depend on future elements
- are deterministic per element

This makes them predictable and optimizable.

---

# Day 10 — forEach: The Side-Effect Loop

## Core Idea

`forEach` is not about producing values.
It is about **executing intent** on each element.

If `map` transforms and `filter` selects,
`forEach` **acts**.

## Mental Model

- Input: array
- Output: ❌ nothing (`undefined`)
- Purpose: mutate external state or trigger effects

## When to Use

- Counting / frequency maps
- Logging
- Accumulating into objects
- Mutating existing data structures

## When NOT to Use

- When you need a returned array → use `map`
- When you need selection → use `filter`
- When you need early exit → use `for` / `some` / `every`

## Key Insight

`forEach` is a _controlled loop with intention_.
It replaces boilerplate, not logic.

Your examples:

- Frequency counting ✔️
- Word occurrence ✔️

These are **canonical forEach use-cases**.

---

# Day 11 — Reduce (The Universal Builder)

## Core Idea

`reduce` walks through an array once and **builds a final value** (number, array, object).

## Mental Model

Reduce answers 3 questions:

1. What am I building? → number | array | object
2. What’s the starting value? → 0 | [] | {}
3. How does ONE element update it?

## Canonical Shape

arr.reduce((acc, curr) => {
// update acc
return acc;
}, initialValue);

Returning the accumulator is mandatory.

## Reduce Re-derives Everything

- Sum → number accumulator
- Map → array accumulator + push
- Filter → array accumulator + conditional push
- Frequency count → object accumulator

## Key Rules

- Mutation of the accumulator is allowed (and idiomatic).
- Reduce is NOT default — use when final shape is custom.
- Clarity > cleverness.

## Red Flag

If you can’t answer “what am I building?” → don’t use reduce.

## Algorithms implemented

- sumAll
- countNumbers
- squareAll
- longWords

---

# Day 12 — Choosing the Right Tool

## Decision Rules

- Transform every element → map
- Select some elements → filter
- Build non-array result → reduce
- Need early exit / max clarity / complex control → loop

## Reduce is NOT default

Use reduce only when output shape is custom.

## Senior Signal

Correct tool choice > clever syntax.

---

# Day 15 — Visual Big-O Intuition

## Core Insight

Big-O answers one question only:

> As input grows, what grows with it?

## O(n) — Linear Growth

- One loop over input
- Work increases proportionally with input size
- Example: printing each element of an array

Visual:
n = 3 → 3 steps  
n = 6 → 6 steps  
n = 12 → 12 steps

## O(n²) — Quadratic Growth

- Nested loops dependent on the same input
- Often appears in pairwise comparisons
- Total work grows rapidly (triangle pattern)

Visual:
n = 3 → 3 comparisons  
n = 6 → 15 comparisons  
n = 12 → 66 comparisons

## Key Rules

- Constants don’t matter (O(3n) → O(n))
- Worst case is what counts
- Inner loop dependent on outer loop → think O(n²)
- Inner loop with fixed size → still O(n)

## Mental Model

Don’t calculate Big-O.
Name the repetition pattern.

---

# Day 17 — Factorials, Loops & Boundary Awareness

## Core Idea

The most important part of an algorithm is often **not the loop**, but the **boundary condition**.

For factorial:

- `n! = n × (n-1) × ... × 1`
- **Special case**: `0! = 1`

Failing to handle boundaries leads to incorrect results or infinite loops.

---

# Day 18 — Recursion (Factorial & Sum)

## Core Idea

Recursion is a function calling itself to solve a smaller version of the same problem, **until it reaches a base case**.

Every recursive function must have:

- Base case → stops recursion
- Recursive case → reduces the problem
- Progress toward base case → avoids infinite calls

## Key Insight

The base case must match the operator used during the unwind

## Recursion Reality Check

Elegant, expressive, But:

- Uses stack memory
- Can be slower than loops
- Dangerous without correct base case

---

# Day 20 takeaway (this is the money line)

Fibonacci recursion explodes because it recomputes the same subproblems, not because recursion is bad.

---

# Day 21 - 24

Dynamic Programming exists because recursion without memory is wasteful, and DP is the act of remembering answers to well-defined subproblems.

## Ask yourself this before any DP problem:

“If I pause time right now, what single variable fully describes where I am?”
(If you can answer that, DP is already working).

Dynamic Programming works because it replaces an exponentially large set of concrete solutions with a small set of counted states whose transitions preserve exact equivalence.

---
