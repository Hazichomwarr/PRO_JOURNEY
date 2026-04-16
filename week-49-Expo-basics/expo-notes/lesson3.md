# Lesson 3 — Navigation (Expo Router)

## Mental Model

Navigation = stack of screens

push → add screen  
back → remove screen

---

## File-Based Routing

app/
index.tsx → "/"
details.tsx → "/details"

---

## Navigation Methods

router.push("/details")
→ go forward (can go back)

router.replace("/home")
→ replace (no back)

router.back()
→ go to previous screen

---

## UX Rules

- Use native back button by default
- Only add custom back when needed

---

## Common Mistakes

❌ Lowercase component names  
❌ Missing flex: 1 on screen root  
❌ Misusing push (stack duplication)

---

## Key Insight

Navigation is UX, not just code.
