//pages/dashboard/Dashboard.tsx

import DashboardLayout from "../../components/layout/dashboard/DashboardLayout";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
