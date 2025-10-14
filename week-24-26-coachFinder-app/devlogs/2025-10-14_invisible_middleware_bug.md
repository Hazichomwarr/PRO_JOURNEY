# DevLog Entry – The “Invisible Middleware” Bug

**Project:** TouchPoint
**Date:** 2025-10-14  
**Hours:** 10 hours over 2 days
**Summary:**  
...  
I spent two days debugging why the /auth/me endpoint hung despite valid tokens, headers, and working routes. Every layer—Axios client, React Query, Express route, and JWT middleware—checked out fine. Eventually, I discovered the issue: I mistakenly used authWithToken() instead of authWithToken in my route definition. The parentheses executed the middleware immediately, preventing Express from passing the request to it during runtime.

**Lessons Learned:**

- Middleware functions must be passed, not executed, in Express routes.
- Use console tracing at each layer (frontend → backend → DB) to isolate the failing link.
- Always return data from React Query functions; undefined breaks the render silently.
- Restart servers after critical syntax or environment changes.
- Real debugging is systematic, not random — and persistence always wins.

**Mindset Shift:**

I no longer panic when something “mysteriously” breaks. I’ve gained full-stack intuition — the ability to reason across the frontend, backend, and network boundaries. This wasn’t a syntax mistake; it was my graduation into production-grade debugging.

**Next Steps:**

- Build Zustand user store.
- Bind /auth/me data to Dashboard.
