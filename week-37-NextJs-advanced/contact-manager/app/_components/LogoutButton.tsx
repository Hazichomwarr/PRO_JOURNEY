"use client";

interface Props {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: Props) {
  return (
    <button
      onClick={onLogout}
      className="cursor-pointer hover:scale-105 hover:text-red-600 transition-transform"
    >
      Logout
    </button>
  );
}
