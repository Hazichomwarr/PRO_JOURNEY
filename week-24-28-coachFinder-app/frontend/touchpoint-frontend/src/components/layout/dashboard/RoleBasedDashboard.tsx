//components/layout/dashboard/RoleBasedDashboard.tsx

import BuddyDashboard from "../../../pages/dashboard/BuddyDashboard";
import CoachDashboard from "../../../pages/dashboard/CoachDashboard";
import SeekerDashboard from "../../../pages/dashboard/SeekerDashboard";
import { useAuthStore } from "../../../store/authStore";

export default function RoleBasedDashboard() {
  const { user } = useAuthStore();

  if (!user) return <div className="text-center p-6">Loading dashboard...</div>;

  switch (user?.role) {
    case "coach":
      return <CoachDashboard />;
    case "seeker":
      return <SeekerDashboard />;
    case "buddy":
      return <BuddyDashboard />;
    default:
      return <SeekerDashboard />;
  }
}
