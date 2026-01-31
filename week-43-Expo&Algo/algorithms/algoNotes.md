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

# Day 5 — Loops & Early Exit Discipline

## Core Idea

Loops have different contracts. Most bugs happen when the wrong contract is used.

---

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

- “The data is nested, so the loops must be nested”

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
