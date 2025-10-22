//pages/dashboard/FindCoach.tsx
import { useCoachData } from "../../hooks/useCoachData";
import { Coach } from "../../models/coach";

export default function FindCoach() {
  const { isLoading, error, coaches, setExpertise } = useCoachData();

  if (isLoading)
    return <p className="mt-4 text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 mt-4">{error}</p>;

  return (
    <section className="p-6">
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
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {coaches.map((c: Coach) => (
          <li key={c.id} className="p-4 bg-white rounded-lg shadow-md border">
            <span className="font-medium">{c.bio}</span>
            <span className="text-sm text-gray-600">
              Expertise: {c.expertise}
            </span>
            <span className="text-sm">Rate: ${c.hourlyRate}/hr</span>
            <span className="text-sm text-gray-600">
              Availability: {c.avaibility}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
