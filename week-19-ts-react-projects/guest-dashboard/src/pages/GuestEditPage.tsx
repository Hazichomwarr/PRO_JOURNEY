//pages/GuestEditPage.tsx
import GuestForm from "../components/GuestForm";
import { useGuestContext } from "../context/useGuestContext";
import { useParams } from "react-router-dom";

export default function GuestEditPage() {
  const { guests, updateGuest } = useGuestContext();
  const { id } = useParams();

  const guestToUpdate = guests.find((g) => g.id === Number(id));

  if (!guestToUpdate)
    return (
      <p className="text-lg font-medium text-gray-300 text-center">
        Guest not found
      </p>
    );

  return <GuestForm onUpdate={updateGuest} guest={guestToUpdate} />;
}
