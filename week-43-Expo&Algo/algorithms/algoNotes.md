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
