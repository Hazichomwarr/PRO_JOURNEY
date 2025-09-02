import type { Guest } from "../models/guest";

interface GuestListProps {
  guests: Guest[];
  onRemoveGuest: (guest: Guest) => void;
}

export default function GuestList({ guests, onRemoveGuest }: GuestListProps) {
  if (guests.length === 0) {
    return <p className="text-gray-500 mt-4">No guests yet.</p>;
  }

  function handleClick(guest: Guest) {
    const confirmDelete: boolean = window.confirm(`Remove ${guest.name}`);
    if (confirmDelete) onRemoveGuest(guest);
  }

  return (
    <ul className="w-full max-w-md">
      {guests.map((guest) => (
        <li
          key={guest.id}
          className=" flex gap-5 items-center justify-between p-3 border-b text-sm"
        >
          <div className="flex justify-between gap-4 items-center rounded-md shadow-md p-3 bg-gray-200">
            <div className="flex flex-col">
              <span>Name:</span>
              <span className="font-semibold pr-2">{guest.name}</span>
            </div>
            <div className="pr-2">Email: {guest.email}</div>
            <div className="pr-2">Meal: {guest.meal} </div>
            <div className="pr-2">
              {guest.attending ? "✅ Attending" : "❌ Not Attending"}
            </div>
          </div>
          <button className="btn" onClick={() => handleClick(guest)}>
            remove
          </button>
        </li>
      ))}
    </ul>
  );
}
