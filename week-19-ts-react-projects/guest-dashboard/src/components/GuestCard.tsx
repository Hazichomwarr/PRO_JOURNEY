import { useState } from "react";
import type { Guest } from "../models/guest";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // 👈 arrow icon
import DeleteButton from "./DeleteButton";

interface GuestCardProps {
  guest: Guest;
  onEdit?: (guest: Guest) => void;
  onDelete?: (id: number) => void;
}

export default function GuestCard({ guest, onDelete, onEdit }: GuestCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="mb-4 border rounded-lg shadow-md p-4 w-[90%] bg-stone-50">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="font-semibold text-gray-800">{guest.name}</h3>

        {/* Toggle Button */}
        <div className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          <span className="text-sm">{isOpen ? "Hide" : "View"} Details</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </div>

      {/* Accordion (animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 text-sm text-gray-600 space-y-2">
              <p>Email: {guest.email}</p>
              <p>Phone: {guest.phone}</p>
              <p>Attending: {guest.attending ? "✅ Yes" : "❌ No"}</p>
              <p>Category: {guest.category}</p>
              <p>Meal: {guest.meal}</p>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {onEdit && (
                  <button
                    className="text-sm rounded-md bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-2 py-1"
                    onClick={() => onEdit(guest)}
                  >
                    Edit
                  </button>
                )}

                {onDelete && <DeleteButton guest={guest} onDelete={onDelete} />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
