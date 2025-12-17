import BuddyCard from "../components/buddy/BuddyCard";
import BuddyFilters from "../components/buddy/BuddyFilters";
import { useFindBuddy } from "../hooks/useFindBuddy";

export default function FindBuddy() {
  const { results, isLoading, setFilters } = useFindBuddy();

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-4 gap-6">
      <aside className="md:col-span-1">
        <BuddyFilters onChange={setFilters} />
      </aside>

      <section className="md:col-span-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((b) => (
              <BuddyCard key={b._id} buddy={b} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
