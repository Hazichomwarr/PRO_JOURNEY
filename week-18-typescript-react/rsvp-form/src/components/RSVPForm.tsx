import { useState } from "react";
import type { Guest } from "../models/guest";
import type { FormErrors } from "../models/errors";

interface RSVPFormProps {
  onAddGuest: (guest: Guest) => void;
}

export default function RSVPForm({ onAddGuest }: RSVPFormProps) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(false);
  const [email, setEmail] = useState("");
  const [meal, setMeal] = useState<Guest["meal"]>("chicken");

  const [errors, setErrors] = useState<FormErrors>({});

  function getNewErrors(): FormErrors {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.includes("@") && !email.includes("."))
      newErrors.email = "Valid email is required.";
    if (!meal) newErrors.meal = "Meal choice is required.";

    return newErrors;
  }

  function resetForm() {
    setName("");
    setEmail("");
    setMeal("chicken");
    setAttending(false);
    setErrors({});
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = getNewErrors();
    setErrors(validationErrors);

    //stop if errors exist
    if (Object.keys(validationErrors).length > 0) return;

    const newGuest: Guest = { id: Date.now(), name, attending, email, meal };
    onAddGuest(newGuest);

    //reset form
    resetForm();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border p-4 rounded-lg shadow-md"
    >
      {/* NAME */}
      <input
        className="input"
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      {/* EMAIL */}
      <input
        type="email"
        className="input"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      {/* SELECT */}
      <select
        id="meal"
        className="input"
        value={meal}
        onChange={(e) => setMeal(e.target.value as Guest["meal"])}
      >
        <option value="chicken">Chicken</option>
        <option value="beef">Beef</option>
        <option value="vegetarian">Vegetarian</option>
      </select>
      {errors.meal && <p className="text-red-500 text-sm">{errors.meal}</p>}

      {/* CHECKBOX */}
      <label className="flex items-center gap-2 text-xl">
        <input
          type="checkbox"
          checked={attending}
          onChange={(e) => setAttending(e.target.checked)}
        />{" "}
        Attending?
      </label>

      {/* BUTTON */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-500"
      >
        Add Guest
      </button>
    </form>
  );
}
