# Lesson 7 — Forms, Validation & User Input

## Core Idea

Forms = controlled state + validation + async submission + UX feedback

---

## Controlled Inputs

Always bind input to state:

value + onChangeText

---

## Validation Pattern

- Validate BEFORE submission
- Return boolean (valid / invalid)
- Store errors in state

Example:

- build errors object
- setErrors(errors)
- return Object.keys(errors).length === 0

---

## Submission Flow

input → validate → submit → feedback

---

## Async Pattern

- setLoading(true) before request
- try/catch for errors
- finally → setLoading(false)

---

## Prevent Double Submission

if (loading) return;

---

## Error Handling

- field errors (email, password)
- global error (message)

Never assume error exists:
use conditional rendering safely

---

## UX Rules

- show errors near inputs
- clear old errors on new validation
- disable button during loading
- show loading state in button

---

## Mobile-Specific Rules

- use KeyboardAvoidingView
- use secureTextEntry for passwords
- avoid web-only styles (e.g., cursor)

---

## Architecture

- Form handles input + validation
- API layer handles request
- Auth layer handles token

---

## Key Insight

Validation must STOP execution, not just display errors.
