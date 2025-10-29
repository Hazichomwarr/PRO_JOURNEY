// pages/dashboard/CoachDashboard.tsx
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useDashboardStore } from "../../store/dashboardStore";
import StatCard from "../../components/ui/StatCard";

export default function CoachDashboard() {
  const { user } = useAuthStore();
  const { stats, fetchStats, loading, error } = useDashboardStore();

  useEffect(() => {
    if (user?.role === "coach") fetchStats("coach");
  }, [user]);

  if (loading) return <p className="text-center">Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">Coach Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Active Clients" value={stats.activeClients ?? 0} />
        <StatCard
          label="Sessions Completed"
          value={stats.sessionsBooked ?? 0}
        />
        <StatCard
          label="Clients Satisfaction"
          value={
            stats.satisfaction ? `${stats.satisfaction}%` : "No rating yet"
          }
        />
      </div>
    </section>
  );
}
