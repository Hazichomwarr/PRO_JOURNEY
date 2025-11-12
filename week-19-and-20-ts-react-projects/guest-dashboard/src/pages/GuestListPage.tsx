// pages/GuestList.tsx
import type { Guest } from "../models/guest";
import { useNavigate } from "react-router-dom";
import { useGuestContext } from "../context/useGuestContext";
import GuestCard from "../components/GuestCard";
import GuestListEmpty from "../components/GuestListEmpty";
import { motion, AnimatePresence } from "framer-motion";
import FlashMessage from "../components/FlashMessage";

export default function GuestListPage() {
  const {
    processedGuests,
    removeGuest,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    setSearchQuery,
    flash,
    setFlash,
  } = useGuestContext();

  const navigateTo = useNavigate();

  function handleEdit(guest: Guest) {
    navigateTo(`/guests/${guest.id}/update`);
  }

  const hasSearch = Boolean(filterCategory || sortBy);

  return (
    <div className="">
      {/* Flash-Message Wrapper */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FlashMessage
              message={flash.message}
              type={flash.type}
              onClose={() => setFlash(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <h3 className="font-medium text-center text-2xl my-5 ">All Attendees</h3>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6 px-2">
        {/* Filter by Catgory */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-400"
        >
          <option value="">Filter By Category</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
        </select>

        {/* Button to clear search/filter/sort */}
        {hasSearch && processedGuests.length > 0 && (
          <button
            className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm bg-blue-600 text-white"
            onClick={() => {
              setFilterCategory("");
              setSortBy(null);
              setSearchQuery("");
            }}
          >
            Clear filters
          </button>
        )}

        {/* Sort */}
        <select
          value={sortBy ?? ""}
          onChange={(e) =>
            setSortBy(e.target.value as "name" | "email" | "category" | null)
          }
          className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-400"
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* if No guests */}
      <GuestListEmpty
        guests={processedGuests}
        onRegister={() => navigateTo("/guests/new")}
        hasSearch={hasSearch}
      />

      {/* if Guests */}
      <ul className="grid grid-cols-1 justify-items-center sm:grid-cols-1 lg:grid-cols-3 gap-4 ">
        {processedGuests.map((guest: Guest) => (
          <GuestCard
            key={guest.id}
            guest={guest}
            onEdit={() => handleEdit(guest)}
            onDelete={removeGuest}
          />
        ))}
      </ul>
    </div>
  );
}
