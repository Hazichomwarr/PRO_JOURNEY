import type { Guest } from "../models/guest";

interface GuestListProps {
  guests: Guest[];
}

export default function GuestList({ guests }: GuestListProps) {
  return (
    <ul className="w-full max-w-md">
      {guests.map((guest) => (
        <li
          key={guest.id}
          className=" flex gap-3 items-center p-3 border-b text-sm"
        >
          <div className="font-semibold">{guest.name}</div>
          <div>Email: {guest.email}</div>
          <div>Meal: {guest.meal} </div>
          <div>{guest.attending ? "✅ Attending" : "❌ Not Attending"}</div>
        </li>
      ))}
    </ul>
  );
}
