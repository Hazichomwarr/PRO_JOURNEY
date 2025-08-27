import { useState } from "react";
import "./App.css";
import Greeter from "./components/Greeter";
import ShoppingList from "./components/ShoppingList";
import type { Item } from "../models/item";
import ShoppingListForm from "./components/ShoppingListForm";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (product: string, quantity: number) => {
    console.log(`successfully added ${product}-${quantity}!`);
    setItems([...items, { id: Date.now(), product, quantity }]);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Greeter person="Hamza" />
      <Greeter person="Abdiel" />
      <Greeter person="Issa" />

      <ShoppingList items={items} />
      <ShoppingListForm onAddItem={addItem} />
    </div>
  );
}

export default App;
