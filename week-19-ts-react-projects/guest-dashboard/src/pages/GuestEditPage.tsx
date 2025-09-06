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
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-500">Guest not found</p>
      </div>
    );

  return <GuestForm onUpdate={updateGuest} guest={guestToUpdate} />;
}
