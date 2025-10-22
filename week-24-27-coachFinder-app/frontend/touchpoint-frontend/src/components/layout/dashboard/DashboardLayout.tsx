//components/layout/dashboard/DashboardLayout.tsx
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type Props = { children: ReactNode };

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main content Area */}
      <div className="flex flex-1 flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
