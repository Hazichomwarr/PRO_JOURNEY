//components/GuestListEmpty.tsx
import { useGuestContext } from "../context/useGuestContext";
import type { Guest } from "../models/guest";

interface GuestListHeaderprops {
  guests: Guest[];
  onRegister: () => void;
  hasSearch: boolean;
}

export default function GuestListEmpty({
  guests,
  onRegister,
  hasSearch,
}: GuestListHeaderprops) {
  return (
    <>
      {guests.length === 0 && (
        <div className="text-gray-400 mt-4 text-center text-lg">
          No Match found.
          {!hasSearch && (
            <button
              onClick={onRegister}
              className="text-md text-white mr-2 rounded-md bg-orange-600 hover:bg-orange-700 active:bg-green px-2 py-1 ml-10"
            >
              Register
            </button>
          )}
        </div>
      )}
    </>
  );
}
