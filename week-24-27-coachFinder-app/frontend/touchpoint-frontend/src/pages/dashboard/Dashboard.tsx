//pages/dashboard/Dashboard.tsx
// import { useUserStore } from "../../store/userStore";
import CoachDashboard from "./CoachDashboard";
import SeekerDashboard from "./SeekerDashboard";
import BuddyDashboard from "./BuddyDashboard";
import DashboardLayout from "../../components/layout/dashboard/DashboardLayout";
import { useAuthStore } from "../../store/authStore";

export default function Dashboard() {
  const { user } = useAuthStore();

  const renderDashboard = () => {
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
  };
  if (!user) return <div className="text-center p-6">Loading dashboard...</div>;

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>;
}
