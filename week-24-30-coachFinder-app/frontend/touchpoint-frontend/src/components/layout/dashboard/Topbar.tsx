//components/layout/dashboard/Topbar.tsx
import { Bell } from "lucide-react";
import { useMessagesStore } from "../../../store/messagesStore";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useCoachStore } from "../../../store/coachStore";
import Tooltip from "../../ui/Tooltip";

export default function Topbar() {
  const userInfo = useAuthStore((s) => s.userInfo);
  const coachId = useCoachStore((s) => s.coachId);

  const unreadMsgCount = useMessagesStore((s) => s.unreadCount);

  const handleclick = () => {
    if (userInfo?.role !== "coach") navigate("/dashboard");
    else navigate(`/coach/${coachId}`);
  };

  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3 sticky top-0 z-10">
      <h2 className="text-lg font-semibold text-gray-800">
        Welcome back, {userInfo?.firstName ?? "User"} 👋
      </h2>

      <div className="flex items-center gap-5">
        <button
          className="relative group text-gray-600 hover:text-blue-600 transition hover:scale-110 active:scale-100"
          onClick={() => navigate("/dashboard/messages")}
        >
          <Bell size={20} />
          {/* Red Dot */}
          {unreadMsgCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
          {/* Tooltip */}
          <Tooltip text={"inbox"} /> {/*this tooltip works*/}
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-6">
          <div
            aria-roledescription="button"
            role="button"
            onClick={handleclick}
            className="relative group"
          >
            <img
              src={userInfo?.image?.toString() ?? "/avatar-placeholder.png"}
              alt="avatar"
              className="w-10 h-9 object-cover bg-gray-400 rounded cursor-pointer hover:scale-125 transition-all"
            />
            {/* Avatar Tooltip */}
            <Tooltip text={"profile"} />
          </div>

          {/* User Role display */}
          <span className="font-semibold">
            {userInfo?.role ? userInfo.role.toUpperCase() : "Member"}
          </span>
        </div>
      </div>
    </header>
  );
}
