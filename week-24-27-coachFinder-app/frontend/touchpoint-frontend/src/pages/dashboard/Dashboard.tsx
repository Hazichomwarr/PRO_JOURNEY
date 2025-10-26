//pages/dashboard/Dashboard.tsx
// import { useUserStore } from "../../store/userStore";
import CoachDashboard from "./CoachDashboard";
import SeekerDashboard from "./SeekerDashboard";
import BuddyDashboard from "./BuddyDashboard";
import DashboardLayout from "../../components/layout/dashboard/DashboardLayout";
import { useAuthStore } from "../../store/authStore";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuthStore();

  const renderRoleDashboard = () => {
    switch (user?.role) {
      case "coach":
        return <CoachDashboard />;
      case "seeker":
        return <SeekerDashboard />;
      // case "buddy":
      //   return <BuddyDashboard />;
      default:
        return <SeekerDashboard />;
    }
  };
  if (!user) return <div className="text-center p-6">Loading dashboard...</div>;

  return (
    <DashboardLayout>
      <section className="mb-8">{renderRoleDashboard()}</section>
      <Outlet />
    </DashboardLayout>
  );
}

// pages/dashboard/Dashboard.tsx
// import { useEffect } from "react";
// import { useDashboardStore } from "../../store/dashboardStore";
// import { useAuthStore } from "../../store/authStore";

// export default function Dashboard() {
//   const { stats, loading, error, fetchStats } = useDashboardStore();
//   const { role } = useAuthStore();

//   useEffect(() => {
//     if (role) fetchStats(role);
//   }, [role, fetchStats]);

//   if (loading)
//     return <p className="text-center text-gray-500 mt-6">Loading stats...</p>;
//   if (error)
//     return (
//       <p className="text-center text-red-500 mt-6">
//         Failed to load stats: {error}
//       </p>
//     );

//   if (!stats) return null;

//   return (
//     <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       <StatCard title="Total Coaches" value={stats.totalCoaches ?? 0} />
//       <StatCard title="Sessions Booked" value={stats.sessionsBooked ?? 0} />
//       <StatCard title="Satisfaction" value={`${stats.satisfaction ?? 0}%`} />

//       {role === "coach" && (
//         <>
//           <StatCard title="Active Clients" value={stats.activeClients ?? 0} />
//           <StatCard
//             title="Pending Requests"
//             value={stats.pendingRequests ?? 0}
//           />
//           <StatCard title="Total Reviews" value={stats.totalReviews ?? 0} />
//         </>
//       )}
//     </section>
//   );
// }

// function StatCard({ title, value }: { title: string; value: string | number }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-center text-center">
//       <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
//       <p className="text-2xl font-semibold text-blue-600">{value}</p>
//     </div>
//   );
// }
