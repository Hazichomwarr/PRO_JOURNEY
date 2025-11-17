//components/layout/dashboard/DashboardLayout.tsx
import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useMessagesStore } from "../../../store/messagesStore";

type Props = { children: ReactNode };

export default function DashboardLayout({ children }: Props) {
  const fetchUnreadCount = useMessagesStore((s) => s.fetchUnreadCount);
  useEffect(() => {
    fetchUnreadCount(); // very light call
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main content Area */}
      <div className="flex flex-1 flex-col min-h-screen">
        <Topbar />

        <main className="flex-1 p-6 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
