# 🧠 React–Axios–Zustand Debugging Report: Coach Role Upgrade Flow

## Overview

A two-day deep debugging session revealing how React handles async state, axios interceptors, and eventual consistency between backend updates and frontend state.

---

## 🧭 Integration Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant axiosClient
    participant Backend
    participant ZustandStore

    User->>Frontend: Click "Upgrade to Coach"
    Frontend->>axiosClient: PATCH /users/upgrade-role (Bearer token)
    axiosClient->>Backend: Send request with accessToken
    Backend-->>axiosClient: ✅ 200 OK (role updated)
    axiosClient-->>Frontend: returns updated user info
    Frontend->>ZustandStore: updateRole("coach")
    Note right of ZustandStore: Store updates state synchronously
    ZustandStore-->>Frontend: triggers re-render
    Frontend->>Frontend: navigate("/coaches/new")
    Frontend->>Backend: POST /coaches (requires fresh role)
    Backend-->>Frontend: ✅ 200 OK → Success
```
