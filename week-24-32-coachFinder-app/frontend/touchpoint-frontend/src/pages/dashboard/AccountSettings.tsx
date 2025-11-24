//Pages/dashboard/AccountSettings.tsx
import { Outlet } from "react-router-dom";

export default function Settings() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {/* ---HEADER */}
      <header className="w-full py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold text-center">Settings</h1>
      </header>

      {/* ---COontent Area */}
      <section className="flex-1 w-full flex justify-center py-10 px-4">
        <div className="w-full max-w-3xl">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
