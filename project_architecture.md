# 🧱 Project Architecture Template

## 🧭 1. What does the app do?

> _Write 1–3 sentences describing the core purpose of the app._

- Example:
  > CoachFinder is a web app that allows users to browse, view, and book sessions with expert coaches in various fields. Users can filter coaches by category, explore their profiles, and submit session requests through a multi-step form.

**Core Features:**

- [ ] Coach browsing (list view)
- [ ] Category filtering (tabs)
- [ ] Coach detail page (accordion, tabs)
- [ ] Multi-step booking form
- [ ] Confirmation feedback
- [ ] Responsive design
- [ ] Animations (motion.div, transitions)
- [ ] Data fetching and mutations (React Query)

---

## 👤 2. Who uses it?

> _Define the primary user types and their motivations._

| Role                   | Description                                     |
| ---------------------- | ----------------------------------------------- |
| **End User / Client**  | Browses coaches and books sessions              |
| **Coach** _(optional)_ | Profile is displayed, receives session requests |
| **Admin** _(future)_   | Manages coaches and sessions (optional)         |

**Device Target:**

- [ ] Mobile
- [ ] Desktop
- [ ] PWA-ready

---

## 🔄 3. What are the core user flows?

> _List each key user journey as a bullet point or flow diagram._

### ✅ Booking Flow:

1. Home → Coaches
2. Filter by category
3. Click a coach → View profile
4. Click “Book session”
5. Fill out multi-step form
6. Submit → confirmation

### 🔍 Browsing Flow:

1. Home → Coaches
2. View all or use filters (tabs, search)
3. Click profile to view details (accordion/tab panels)

---

## 📄 4. What are the main pages/routes?

| Route          | Purpose                    |
| -------------- | -------------------------- |
| `/`            | Landing / homepage         |
| `/coaches`     | Coach list (tabbed view)   |
| `/coaches/:id` | Coach detail w/ animations |
| `/form`        | Multi-step booking form    |
| `/thank-you`   | Confirmation after booking |

---

## 🧩 5. Component Breakdown

> _Break each page into components (top-down)._

### `/coaches`

```
<CoachListPage>
 ├── <CategoryTabs />
 ├── <CoachCard />
 └── <LoadingSpinner />
```

### `/coaches/:id`

```
<CoachDetailPage>
 ├── <CoachHeader />
 ├── <TabPanel />
 ├── <AccordionSections />
 └── <BookSessionButton />
```

### `/form`

```
<BookingForm>
 ├── <FormLayout />
 ├── <FormStep />
 ├── <ProgressTracker />
 └── <AnimatedButtons />
```

---

## 🧠 6. Global vs Local State

| Global State (Context / Query) | Local Component State    |
| ------------------------------ | ------------------------ |
| Form data                      | Active tab index         |
| Booking mutation status        | Accordion open state     |
| Current step in form           | Hover/tap animations     |
| Coach list (React Query)       | Input focus, blur, error |

---

## 🔌 7. Async Needs (API & Query)

> _Define what needs to be fetched, updated, or submitted._

| Data                | How?            | Where?         |
| ------------------- | --------------- | -------------- |
| Coach list          | `useQuery()`    | `/coaches`     |
| Coach details       | `useQuery()`    | `/coaches/:id` |
| Booking form submit | `useMutation()` | `/form/submit` |

---

## 🎨 8. Animations & UX Enhancements

- [ ] Page transitions (AnimatePresence)
- [ ] Accordion (motion.div height + layout)
- [ ] Form step transitions
- [ ] Button hover/tap effects
- [ ] Submit spinner or toast

---

## 📁 9. Suggested File Structure

```
/src
 ├── /pages
 ├── /components
 ├── /context
 ├── /hooks
 ├── /api
 ├── /reducers
 ├── /types
 └── App.tsx
```

---

## ✅ Final Notes

- What’s the MVP scope?
- What’s stretch or version 2?
- Any libraries to install (e.g. React Query, Framer Motion, Zustand)?
