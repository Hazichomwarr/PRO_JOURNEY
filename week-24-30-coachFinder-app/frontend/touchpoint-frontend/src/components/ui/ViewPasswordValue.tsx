//components/ui/ViewPasswordValue.tsx
import { Eye, EyeOff } from "lucide-react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewPasswordValue({ isOpen, setIsOpen }: Props) {
  return (
    <button
      type="button"
      onClick={() => setIsOpen((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1 hover:bg-gray-200 transition active:scale-95"
    >
      {isOpen ? (
        <Eye size={22} color="gray" />
      ) : (
        <EyeOff size={22} color="gray" />
      )}
    </button>
  );
}
