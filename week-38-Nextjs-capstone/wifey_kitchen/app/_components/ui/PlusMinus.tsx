//app/components/ui/PlusMinus.tsx
import { PlusCircle, MinusCircle } from "lucide-react";

export default function PlusMinus() {
  return (
    <div className="flex items-center gap-3">
      <PlusCircle size={20} color="green" />
      <MinusCircle size={20} color="red" />
    </div>
  );
}
