import React, { useState } from "react";
import type { Guest } from "./models/guest";
import GuestList from "./components/GuestList";
import RSVPForm from "./components/RSVPForm";

//step 1 -> Guest type (Extracted in models/guest)

const MOCK_GUESTS: Guest[] = [
  {
    id: 1,
    name: "Alice",
    attending: true,
    email: "alice@mail.com",
    meal: "chicken",
  },
  { id: 2, name: "Bob", attending: false, email: "bob@mail.com", meal: "beef" },
];

export default function App() {
  //step 2 -> State types with Guest[]
  const [guests, setGuests] = useState<Guest[]>(MOCK_GUESTS);

  //step 3 -> Handle form submit(extracted) only adding guest here
  function addGuest(newGuest: Guest) {
    setGuests([...guests, newGuest]);
  }

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">RSVP Form</h1>

      {/* Form component*/}
      <RSVPForm onAddGuest={addGuest} />

      {/* Guest List component */}
      <GuestList guests={guests} />
    </div>
  );
}
