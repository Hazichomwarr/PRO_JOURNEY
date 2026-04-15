# Lesson 1 — React Native Mental Model

## Core Shift

React Native is NOT the web.

- No DOM
- No HTML tags
- You render native components

## Core Components

- View → container (like div)
- Text → required for all text
- Image → for images

Rule:
Text must ALWAYS be inside <Text>

---

## Layout System

- Flexbox by default
- Default direction: column (vertical)

Golden rule:
Parent controls layout of children

---

## Root Container Rule

Top-level View must have:
flex: 1

This makes it fill the entire screen.

---

## Layout Pattern (Most Common)

Header
Content (flex: 1)
Footer

Content expands, pushing footer down.

---

## Styling

- No CSS
- No cascade
- No global styles

Styles are JS objects:
StyleSheet.create({})

---

## Key Differences from Web

- No semantic tags (header, main, footer)
- No CSS inheritance
- No browser layout engine

---

## Common Mistakes

❌ Using HTML tags  
❌ Using color on View  
❌ No root container  
❌ Fighting flexbox

---

## Mental Model

You are designing a fixed screen, not a document.

Layout = explicit control
