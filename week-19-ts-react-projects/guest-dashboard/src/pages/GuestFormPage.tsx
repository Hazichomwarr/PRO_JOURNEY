// pages/GuestFormPage.tsx
import GuestForm from "../components/GuestForm";
import { useGuestContext } from "../context/useGuestContext";

export default function GuestFormPage() {
  const { addGuest } = useGuestContext();

  return <GuestForm onAddGuest={addGuest} />;
}
