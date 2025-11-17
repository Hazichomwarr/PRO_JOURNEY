// pages/dashboard/CoachDashboard.tsx
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useDashboardStore } from "../../store/dashboardStore";
import StatCard from "../../components/ui/StatCard";
import { useNavigate } from "react-router-dom";

export default function CoachDashboard() {
  const { user } = useAuthStore();
  const { stats, fetchStats, loading, error } = useDashboardStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "coach") fetchStats("coach");
  }, [user]);

  if (loading) return <p className="text-center">Loading dashboard...</p>;
  if (error)
    return (
      <p>
        <span className="text-red-500">{error}</span>
        <span
          className=" cursor-pointer hover:underline hover:text-blue-800"
          onClick={() => navigate("/dashboard/find")}
        >
          (click here to check your coach profile)
        </span>
      </p>
    );
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
            stats.satisfaction ? `${stats.satisfaction}%` : "Not rated yet"
          }
        />
      </div>
    </section>
  );
}
