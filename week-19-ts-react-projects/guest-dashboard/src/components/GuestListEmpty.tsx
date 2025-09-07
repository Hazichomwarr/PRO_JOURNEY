//components/GuestListEmpty.tsx
import type { Guest } from "../models/guest";

interface GuestListHeaderprops {
  guests: Guest[];
  onRegister: () => void;
}

export default function GuestListEmpty({
  guests,
  onRegister,
}: GuestListHeaderprops) {
  return (
    <>
      {guests.length === 0 && (
        <div className="text-gray-400 mt-4 text-center text-lg">
          No guests.
          <button
            onClick={onRegister}
            className="text-md text-white mr-2 rounded-md bg-orange-600 hover:bg-orange-700 active:bg-green px-2 py-1 ml-10"
          >
            Register
          </button>
        </div>
      )}
    </>
  );
}
