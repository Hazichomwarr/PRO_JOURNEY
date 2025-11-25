import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)} // or "/dashboard" if you want fixed
      className="flex items-center justify-center gap-2 w-full py-2 bg-gray-400 hover:bg-gray-500 text-white rounded transition-colors"
    >
      <MoveLeft size={20} strokeWidth={2} className="text-white" />
      <span>Go Back</span>
    </button>
  );
}
