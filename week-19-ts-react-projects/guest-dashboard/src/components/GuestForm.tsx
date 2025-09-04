import { useGuestContext } from "../context/useGuestContext";
import { formInitialValues, validateForm } from "../forms/formConfig";
import useForm from "../hooks/useGuestForm";
import type { Guest } from "../models/guest";

interface GuestFormProps {
  onAddGuest: (guest: Guest) => void;
}

export default function GuestForm({ onAddGuest }: GuestFormProps) {
  const { addGuest, setGuests, guests } = useGuestContext();
  const { values, errors, setErrors, handleChange, handleSubmit } =
    useForm<Guest>({
      initialValues: formInitialValues,
      validate: validateForm,
      onSubmit: (values) => {
        onAddGuest({ ...values, id: Date.now() });
      },
    });

  return (
    <form
      className="flex flex-col items-center gap-3 border p-4 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1 w-[25%]">
        {/* NAME */}
        <label htmlFor="name" className="font-medium">
          Name
        </label>
        <input
          className="input"
          id="name"
          type="text"
          value={values.name}
          onChange={handleChange}
        />

        {/* EMAIL */}
        <label htmlFor="name" className="font-medium">
          Email
        </label>
        <input
          className="input"
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />

        {/* PHONE */}
        <label htmlFor="phone" className="font-medium">
          Phone
        </label>
        <input
          className="input"
          id="phone"
          type="text"
          value={values.phone}
          onChange={handleChange}
        />

        {/* ATTENDING */}
        <label className="flex items-center justify-center gap-2 text-gray-700 input">
          <input
            type="checkbox"
            id="attending"
            checked={values.attending}
            onChange={handleChange}
            className="block"
          />
          Attending?
        </label>

        {/* CATEGORY */}
        <p className="font-medium">Category</p>
        <div className="flex justify-between input">
          <label
            htmlFor="hr"
            className="font-medium text-sm text-gray-700 block"
          >
            HR
          </label>
          <input
            type="radio"
            id="hr"
            name="category"
            value="HR"
            onChange={handleChange}
            className="block"
          />
          <label htmlFor="it" className="font-medium text-sm text-gray-700">
            IT
          </label>
          <input
            type="radio"
            id="it"
            name="category"
            value="IT"
            onChange={handleChange}
            className="block"
          />
          <label htmlFor="sales" className="font-medium text-sm text-gray-700">
            SALES
          </label>
          <input
            type="radio"
            id="sales"
            name="category"
            value="SALES"
            onChange={handleChange}
            className="block"
          />
        </div>

        {/* MEAL */}
        <label htmlFor="meal" className="font-medium text-sm text-gray-700">
          Meal Options
        </label>
        <select
          name="meal"
          id="meal"
          value={values.meal}
          onChange={handleChange}
          className="input"
        >
          <option value="chicken">Chicken</option>
          <option value="beef">Beef</option>
          <option value="vegetarian">vegetarian</option>
        </select>
      </div>

      <button
        type="submit"
        className=" w-[25%] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Guest
      </button>
    </form>
  );
}
