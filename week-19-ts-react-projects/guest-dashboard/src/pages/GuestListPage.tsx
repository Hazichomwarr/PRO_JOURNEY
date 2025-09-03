import { useState } from "react";
import type { Guest } from "../models/guest";
import { MOCK_DATA } from "../utils/mockData";
import { useNavigate } from "react-router-dom";

export default function GuestListPage() {
  const [guests, setGuests] = useState<Guest[]>(MOCK_DATA);

  const navigation = useNavigate();

  function handleClick() {
    navigation("/guests/new");
  }

  function handleUpdate(guest: Guest) {
    navigation(`${guest.id}/update`);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="font-medium ">All Attendees</h2>
      <ul className="flex items-center gap-3">
        {guests.map((guest) => (
          <li
            key={guest.id}
            className=" flex gap-4 items-center border-b-2 mb-2 p-4 shadow-md bg-gray-100"
          >
            <div className="flex flex-col text-sm justify-between">
              <span> Name: {guest.name}</span>

              <span>Email: {guest.email}</span>
              <span>Tel: {guest.phone} </span>
              <span>Attending ? {guest.attending ? "Yes" : "No"}</span>
              {guest.attending && (
                <>
                  <span>Category: {guest.category}</span>
                  <span>meal option: {guest.meal} </span>
                </>
              )}
            </div>
            <div>
              <button
                className="text-sm mr-2 rounded-md bg-green-500 hover:bg-green-600 active:text-white px-2 py-1"
                onClick={() => handleUpdate(guest)}
              >
                Edit
              </button>
              <button className="text-sm text-white rounded-md bg-red-500 hover:bg-red-700 active:bg-red-300 px-2 py-1">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="text-gray-300 rounded-md bg-blue-600 hover:bg-blue-700 active:text-white px-2 py-1 mt-4"
        onClick={handleClick}
      >
        Register to Event
      </button>
    </div>
  );
}
