//pages/dashboard/FindCoach.tsx
import { useCoachData } from "../../hooks/useCoachData";
import { Coach } from "../../models/coach";

export default function FindCoach() {
  const { isLoading, error, filteredCoaches, setExpertise } = useCoachData();

  if (isLoading)
    return <p className="mt-4 text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 mt-4">{error}</p>;

  return (
    <section className="space-y-4 flex flex-col justify-around p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Search a coach based on your goals:
      </h2>

      {/* Search input */}
      <input
        type="search"
        placeholder="Coach Expert In..."
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        onChange={(e) => setExpertise(e.target.value)}
      />
      <ul className="space-y-3">
        {filteredCoaches.map((c: Coach) => (
          <li
            key={c.id}
            className="border p-3 rounded bg-white shadow-sm flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.expertise}</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-500">
                {c.averageRating?.toFixed(1)
                  ? "★".repeat(c.averageRating) +
                    "☆".repeat(5 - c.averageRating)
                  : "N/A"}
              </p>
              <p className="text-xs text-gray-500">{c.totalReviews} reviews</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
