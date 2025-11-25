//pages/dashboard/FindCoach.tsx
import { useNavigate } from "react-router-dom";
import { useCoachData } from "../../hooks/useCoachData";
import { Coach } from "../../models/coach";
import { useAuthStore } from "../../store/authStore";
import { TriangleAlertIcon } from "lucide-react";
import AlertMessage from "../../components/ui/AlertMessage";

export default function FindCoach() {
  const { isLoading, error, filteredCoaches, setExpertise } = useCoachData();
  const userInfo = useAuthStore((s) => s.userInfo);
  const isCoach = userInfo?.role === "coach";
  const navigate = useNavigate();

  const isFound = (): boolean => {
    let result: boolean;

    if (!isCoach) return (result = true); //don't bother if not a coach
    const fullname = userInfo?.firstName + " " + userInfo?.lastName;
    console.log("first+last name ->", fullname);

    const found = filteredCoaches.find((c) => c.name === fullname.trim());
    console.log("found coach ->", found);
    if (found === undefined || found === null) return (result = false);

    return (result = true);
  };

  if (isLoading)
    return <p className="mt-4 text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 mt-4">{error}</p>;

  return (
    <section className="flex flex-col p-6 gap-6">
      {/* If details not found in DB, role upgraded but hasn't fill out coach form */}
      {isFound() === false && (
        <AlertMessage
          textHeader="Your Account needs attention. Please "
          redirectPath="/coaches/new"
          text="to finish your coach registration "
        />
      )}

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 tracking-tight">
        <span className="text-blue-600">Find</span> a Coach Based on Your Goals
      </h2>

      {/* Search input */}
      <input
        type="search"
        placeholder="Type in here to search Coaches by expertise..."
        className="w-full pl-10 pr-4 py-2 mb-6 rounded-xl border border-gray-600 shadow-sm 
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none 
               transition duration-200 ease-in-out"
        onChange={(e) => setExpertise(e.target.value)}
      />

      {/* All coaches */}
      <ul className="space-y-3">
        {filteredCoaches.map((c: Coach) => (
          <li
            key={c.id}
            className="border p-3 rounded bg-white shadow-sm flex justify-between"
          >
            <div className="space-y-2">
              <h3
                className="font-normal text-orange-600 underline decoration-orange-300 hover:cursor-pointer"
                onClick={() => navigate(`/coach/${c.id}`)}
              >
                {c.name}
              </h3>
              <p className="text-sm text-gray-600">{c.expertise}</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-500">
                {c.averageRating?.toFixed(1)
                  ? "★".repeat(c.averageRating) +
                    "☆".repeat(5 - c.averageRating)
                  : "N/A"}
              </p>
              <p className="text-xs text-gray-500">
                {c.totalReviews > 1
                  ? c.totalReviews + " reviews"
                  : c.totalReviews + " review"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
