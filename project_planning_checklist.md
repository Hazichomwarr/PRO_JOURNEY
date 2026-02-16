# 📁 Project File Planning Checklist

## 1. /api (Fetcher Functions)

- [ ] coaches.ts
  - [ ] getCoaches(): Promise<Coach[]>
  - [ ] getCoachById(id: string): Promise<Coach>
- [ ] bookings.ts
  - [ ] submitBooking(data: BookingRequest): Promise<BookingResponse>

## 2. /hooks (React Query Wrappers)

- [ ] useCoaches()
- [ ] useCoach(id: string)
- [ ] useSubmitBooking()

## 3. /types (Shared App-Wide Contracts)

### Domain Models

- [ ] Coach
- [ ] Category
- [ ] Review
- [ ] AvailabilitySlot
- [ ] BookingRequest
- [ ] BookingResponse

### API Shapes

- [ ] Paginated<T>
- [ ] ApiError
- [ ] QueryKeys enum/const

### Form & State

- [ ] FormState
- [ ] FormAction
- [ ] ValidationErrors

### Context Contracts

- [ ] FormContextValue

### UI Contracts (Reusable Components)

- [ ] Tab
- [ ] AccordionSection
- [ ] SharedProps

### Optional

- [ ] Zod schemas for runtime validation
- [ ] Type inference from schemas

## 4. Notes

- Keep **fetchers** in /api, **hooks** in /hooks
- /types should have no logic, only type definitions
- Local component prop types can live with the component

---

Les objectifs spécifiques de Wonder Woman Africa international festival:

 1.⁠ ⁠Célébrer et valoriser les femmes africaines et de la diaspora
 2.⁠ ⁠Promouvoir l’autonomisation et le leadership féminin
 3.⁠ ⁠Renforcer les liens entre l’Afrique et la diaspora
 4.⁠ ⁠Promouvoir le bien-être, la santé et l’équilibre familial
 5.⁠ ⁠Offrir un espace de formation, de coaching et de transformation
 6.⁠ ⁠Soutenir l’entrepreneuriat féminin
 7.⁠ ⁠Promouvoir les produits locaux à l’international
 8.⁠ ⁠Faire rayonner la culture africaine
 9.⁠ ⁠Encourager la solidarité, la sororité et l’engagement communautaire
10.⁠ ⁠Récompenser l’excellence et l’impact social
11.⁠ ⁠Positionner le festival comme un rendez-vous international incontournable
