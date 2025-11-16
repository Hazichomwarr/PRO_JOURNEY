//components/layout/dashboard/Topbar.tsx
import { Bell } from "lucide-react";
import { useMessagesStore } from "../../../store/messagesStore";
import { useAuthStore } from "../../../store/authStore";

export default function Topbar() {
  const user = useAuthStore((s) => s.userInfo);
  const role = user?.role;
  console.log("(inside Topbar.tsx) LoggedIn-User ->", user);

  const messages = useMessagesStore((s) => s.messages);
  const unreadMsgCount = messages.filter((m) => !m.isRead).length;

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3 sticky top-0 z-10">
      <h2 className="text-lg font-semibold text-gray-800">
        Welcome back, {user?.firstName ?? "User"} 👋
      </h2>

      <div className="flex items-center gap-5">
        <button className="relative text-gray-600 hover:text-blue-600">
          <Bell size={20} />
          {unreadMsgCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-6">
          <img
            src={user?.image ?? "/avatar-placeholder.png"}
            alt="avatar"
            className="w-8 h-8 object-cover bg-gray-400 rounded"
          />
          <span className="font-semibold">
            {role ? role.toUpperCase() : "Member"}
          </span>
        </div>
      </div>
    </header>
  );
}
