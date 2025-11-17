import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/dashboard")}
      className=" flex items-center justify-center gap-2 w-full py-2 bg-stone-600 hover:bg-stone-700 text-white rounded transition-all"
    >
      <MoveLeft size={22} color="white" />
      <span>Go Back</span>
    </button>
  );
}
