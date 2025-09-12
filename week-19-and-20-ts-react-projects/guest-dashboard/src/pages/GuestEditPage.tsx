//pages/GuestEditPage.tsx
import GuestForm from "../components/GuestForm";
import { useGuestContext } from "../context/useGuestContext";
import { useParams, useNavigate } from "react-router-dom";

export default function GuestEditPage() {
  const { guests, updateGuest } = useGuestContext();
  const { id } = useParams();
  const navigation = useNavigate();

  const guestToUpdate = guests.find((g) => g.id === id);

  if (!guestToUpdate)
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-64">
        <p className="text-lg font-medium text-gray-500">Guest Not Found</p>
        <button
          type="button"
          onClick={() => navigation(`/`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-[0.97] transition-all"
        >
          Back
        </button>
      </div>
    );

  return <GuestForm onUpdate={updateGuest} guest={guestToUpdate} />;
}
