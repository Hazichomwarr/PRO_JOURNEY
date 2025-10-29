//components/layout/dashboard/Overview.tsx
import { useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useDashboardStore } from "../../../store/dashboardStore";
import StatCard from "../../ui/StatCard";

export default function Overview() {
  const { user } = useAuthStore();
  const { stats, fetchStats, loading, error } = useDashboardStore();

  useEffect(() => {
    if (user?.role === "seeker") fetchStats("seeker");
  }, [user]);

  if (loading) return <p className="text-center">Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Coaches" value={stats.totalCoaches ?? 0} />
        <StatCard label="Sessions Booked" value={stats.sessionsBooked ?? 0} />
        <StatCard
          label="Satisfaction"
          value={
            stats.satisfaction ? `${stats.satisfaction}%` : "No rating yet"
          }
        />
      </div>
    </div>
  );
}
