import type { Item } from "../models/item";

interface ShoppingListProps {
  items: Item[];
}

export default function ShoppingList({ items }: ShoppingListProps) {
  return (
    <div>
      <h1 className="text-xl font-bold underline">Shopping List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.product} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
