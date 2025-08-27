import type React from "react";
import { useRef } from "react";

interface ShoppingListFormProps {
  onAddItem: (item: string, qty: number) => void;
}

export default function ShoppingListForm({ onAddItem }: ShoppingListFormProps) {
  const prodInputRef = useRef<HTMLInputElement>(null);
  const qtyInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newProduct = prodInputRef.current!.value;
    const quantity = Number(qtyInputRef.current!.value);
    onAddItem(newProduct, quantity);
    prodInputRef.current!.value = "";
    qtyInputRef.current!.value = "1";
  }

  return (
    <form
      className="flex flex-col gap-3 width-full shadow-lg p-9 rounded-md"
      onSubmit={handleSubmit}
    >
      <input
        className="input"
        type="text"
        placeholder="Product Name"
        ref={prodInputRef}
      />
      <input
        className="input"
        type="number"
        min={0}
        placeholder="Quantity"
        ref={qtyInputRef}
      />
      <button className="btn" type="submit">
        Add Item
      </button>
    </form>
  );
}
