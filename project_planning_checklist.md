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
