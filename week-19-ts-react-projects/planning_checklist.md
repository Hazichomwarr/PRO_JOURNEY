## 1. What does the app do ?

> it is a web app that allows guests(users) to attempt to an event through a multi-step-form. Users can explore the lists of attendees, view-update-delete their profiles.

**Core Features:**

- [] Guest browsing (list view)
- [] Guest detail page (accordion, tabs)
- [] Guest updating/deleting his profile (single update/delete)
- [] Multi-step attending form
- [] Persiting data in localStorage
- [] Confirmation feedback
- [] Responsive design
- [] animations (motion.div, transition)
- [] Data fetching and mutations

---

## 2. Who uses it ?

| Role                 | Description                       |
| -------------------- | --------------------------------- |
| **End User/ Guest**  | Browses and filling and attending |
| \*\*Admin _(future)_ | Manages                           |

**Device Target:**

- [] Mobile (first)
- [] Desktop
- [] PWA-ready

---

## 3. What are the core user flows?

### Attending Flow:

1. Home -> Guests(list)
2. Filter by category (sub-topic for the event)
3. Click a Guest -> View profile
4. Click "Attend Event"
5. Fill out multi-step Form
6. Submit -> confirmation

### Browsing Flow:

1. Home -> guests
2. View all or use filter (tabs, search)
3. Click profile to view details (accordion/tab panels)

---

## 4. What are the main pages/routes?

| Route         | Purpose                    |
| ------------- | -------------------------- |
| `/`           | Landing / homepage         |
| `/guests`     | Guest list (tabbed view)   |
| `/guests/:id` | Guest detail w/ animations |
| `/form`       | Multi-step attending form  |
| `/thank-you`  | Confirmation after submit  |

---

## 5. Component Breakdown

### `/guests`

```
<GuestListPage>
 ├── <CategoryTabs />
 ├── <GuestCard />
 └── <LoadingSpinner />
```

### `/guests/:id`

```
<GuestDetailPage>
 ├── <GuestHeader />
 ├── <TabPanel />
 ├── <AccordionSections />
 └── <AttendingEventButton />
```

---

## 🎨 6. Animations & UX Enhancements

- [ ] Page transitions (AnimatePresence)
- [ ] Accordion (motion.div height + layout)
- [ ] Form step transitions
- [ ] Button hover/tap effects
- [ ] Submit spinner or toast

---

## 📁 7. Suggested File Structure

```
/src
 ├── /pages
 ├── /components
 ├── /context
 ├── /hooks
 ├── /api
 ├── /forms
 ├── /models
 └── App.tsx
```

---

## ✅ Final Notes

- What’s the MVP scope?
- What’s stretch or version 2?
- Any libraries to install (e.g. React Query, Framer Motion, Zustand)?
