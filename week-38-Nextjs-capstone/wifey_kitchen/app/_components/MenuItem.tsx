//_components/MenuItem.tsx
"use client";

import { MinusCircle, PlusCircle } from "lucide-react";
import Button from "./ui/Button";
import { useState } from "react";

interface Props {
  item: string;
  label: string;
}

export default function MenuItem({ item, label }: Props) {
  const [numSelected, setNumSelected] = useState<number>(0);

  function handleMinus() {
    if (numSelected === 0) setNumSelected(0);
    else setNumSelected((prev) => prev - 1);
  }

  return (
    <div className="w-full flex items-center justify-between">
      <label htmlFor={item} className="flex items-center gap-2">
        <span>{numSelected >= 1 && numSelected}</span>
        {label}
      </label>
      <div className="flex gap-2 items-center">
        <input
          type="hidden"
          name={`items[${item}]`}
          id={item}
          value={`${numSelected}`}
        />

        {numSelected >= 1 && (
          <Button variant="secondary" type="button" onClick={handleMinus}>
            <MinusCircle />
          </Button>
        )}
        <Button
          variant="secondary"
          type="button"
          onClick={() => setNumSelected((prev) => prev + 1)}
        >
          <PlusCircle />
        </Button>
      </div>
    </div>
  );
}
