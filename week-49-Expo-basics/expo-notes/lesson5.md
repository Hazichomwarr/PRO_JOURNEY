# Lesson 5 — Auth (Tokens, Storage, Platform Awareness)

## Real Auth Flow

Login → backend validates → returns token → store → reuse → validate

---

## Storage (Mobile vs Web)

Mobile:

- Use expo-secure-store
- Backed by OS (iOS Keychain / Android Keystore)

Web:

- SecureStore not supported
- Use localStorage as fallback

---

## Platform Abstraction

Use a single API:

getToken()
setToken()
logout()

Internally:

- Mobile → SecureStore
- Web → localStorage

---

## Auth Architecture

lib/auth.ts → token storage abstraction  
layout → auth gate (checks token)  
login screen → sets token  
logout → removes token

---

## Layout Auth Gate

- Async check on app start
- If no token → redirect to /login
- If token → allow access

---

## Important Distinction

SecureStore tells you:
→ token exists

Backend tells you:
→ token is valid

---

## Debugging

- console.log works in React Native
- Logs appear in terminal (Expo CLI)
- Web logs appear in browser console

---

## Platform Insight

Mobile ≠ Web

- APIs differ (SecureStore vs localStorage)
- Must handle platform differences explicitly

---

## Key Insight

Auth is:

- persistence (storage)
- validation (backend)
- access control (layout)

Not just state.
