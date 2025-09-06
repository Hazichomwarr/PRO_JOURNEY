// pages/GuestList.tsx
import type { Guest } from "../models/guest";
import { useNavigate } from "react-router-dom";
import { useGuestContext } from "../context/useGuestContext";
import GuestCard from "../components/GuestCard";
import GuestListEmpty from "../components/GuestListEmpty";

export default function GuestListPage() {
  const { guests, removeGuest } = useGuestContext();
  const navigation = useNavigate();

  function handleEdit(guest: Guest) {
    navigation(`${guest.id}/update`, { state: guest });
  }

  return (
    <>
      <h3 className="font-medium text-center text-lg my-4">All Attendees</h3>

      {/* if No guests */}
      <GuestListEmpty
        guests={guests}
        onRegister={() => navigation("/guests/new")}
      />

      {/* if Guests */}
      <ul className="grid-cols sm:grid-cols-2 ld:grid-cols-3 justify-items-center">
        {guests.map((guest: Guest) => (
          <GuestCard
            key={guest.id}
            guest={guest}
            onEdit={() => handleEdit(guest)}
            onDelete={removeGuest}
          />
        ))}
      </ul>
    </>
  );
}
