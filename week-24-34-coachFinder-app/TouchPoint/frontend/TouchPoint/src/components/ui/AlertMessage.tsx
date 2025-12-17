import { TriangleAlertIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  textHeader: string;
  redirectPath?: string;
  text?: string;
}

export default function AlertMessage({
  textHeader,
  redirectPath,
  text,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 border outline-orange-200 p-3 text-center bg-orange-100">
      <TriangleAlertIcon />
      <p className="flex gap-1">
        <span>{textHeader}</span>
        <button
          type="button"
          className=" cursor-pointer hover:underline text-blue-600"
          onClick={() => navigate(redirectPath || "/dashboard")}
        >
          Click here
        </button>
        <span>{text}</span>
      </p>
    </div>
  );
}
