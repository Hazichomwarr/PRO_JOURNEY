# Lesson 8 — Lists & Performance

## Core Idea

Lists must be efficient and scalable on mobile.

---

## FlatList

Use FlatList instead of map() for dynamic data.

Why:

- renders only visible items
- improves performance
- avoids memory issues

---

## Required Props

data → array  
renderItem → how to render each item  
keyExtractor → unique key

---

## Example

<FlatList
data={data}
keyExtractor={(item) => item.id}
renderItem={({ item }) => <Item item={item} />}
/>

---

## Patterns

- Extract item component
- Keep renderItem simple
- Avoid heavy logic inside render

---

## Common Mistakes

❌ using index as key  
❌ missing keyExtractor  
❌ rendering everything with map()  
❌ inline heavy components

---

## UX Requirements

- loading state
- empty state
- error state

---

## Performance Insight

FlatList is NOT just a loop:

- it virtualizes rendering
- reuses components
- batches updates

---

## Key Insight

Lists are the backbone of real apps:

- feeds
- messages
- requests
- users
