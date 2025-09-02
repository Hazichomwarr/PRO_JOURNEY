import React, { useState } from "react";
import type { Guest } from "./models/guest";
import GuestList from "./components/GuestList";
import RSVPForm from "./components/RSVPForm";

//step 1 -> Guest type (Extracted in models/guest)

export default function App() {
  //step 2 -> State types with Guest[]
  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem("guests");
    return saved ? JSON.parse(saved) : [];
  });

  //step 3 -> Handle form submit(extracted) only adding guest here
  function addGuest(newGuest: Guest) {
    const updatedGuests = [...guests, newGuest];
    setGuests(updatedGuests);
    localStorage.setItem("guests", JSON.stringify(updatedGuests));
  }

  function removeGuest(toRemoveGuest: Guest) {
    const updated = guests.filter((guest) => guest.id !== toRemoveGuest.id);
    setGuests(updated);
    localStorage.setItem("guests", JSON.stringify(updated));
  }

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">RSVP Form</h1>

      {/* Form component*/}
      <RSVPForm onAddGuest={addGuest} />

      {/* Guest List component */}
      <GuestList guests={guests} onRemoveGuest={removeGuest} />
    </div>
  );
}
