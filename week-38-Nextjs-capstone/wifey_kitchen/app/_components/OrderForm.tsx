//_components/OrderForm.tsx
import Button from "./ui/Button";
import { Input } from "./ui/Input";
import PlusMinus from "./ui/PlusMinus";

export default function OrderForm() {
  return (
    <form
      action=""
      className="w-full max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-2xl shadow-md"
    >
      <Input
        type="text"
        name="name"
        placeholder="Enter your Name"
        className="ui-input focus:ui-input-focus"
      />

      {/* MENU ITEMS */}
      <div className="flex flex-col items-start gap-2 border p-2 rounded-md border-gray-300">
        <h3 className="text-center mb-4 text-2xl text-green-700">
          Select dishes
        </h3>

        <div className="w-full flex items-center justify-between">
          <label htmlFor="dibi" className="flex items-center gap-2">
            Grilled Goat (DIBI)
            <input type="checkbox" name="order" value="dibi" />
          </label>
          <PlusMinus />
        </div>

        <div className="w-full flex items-center justify-between">
          <label htmlFor="chicken" className="flex items-center gap-2">
            Grilled Chicken
            <input type="checkbox" name="order" value="chicken" />
          </label>
          <PlusMinus />
        </div>

        <div className="w-full flex items-center justify-between">
          <label htmlFor="jollof-rice" className="flex items-center gap-2">
            Jollof Rice (Riz gras)
            <input type="checkbox" name="order" value="jollof-rice" />
          </label>
          <PlusMinus />
        </div>
      </div>

      {/* Delivery Option */}
      <div className="flex flex-col items-start gap-2 border p-2 rounded-md border-gray-300">
        <h3 className="text-center mb-4 text-2xl text-green-700">
          Delivery Options
        </h3>
        <label className="flex items-center gap-2">
          Pickup
          <Input type="radio" name="delivery-option" value="pickup" />
        </label>
        <label className="flex items-center gap-2">
          Delivery
          <Input type="radio" name="delivery-option" value="delivery" />
        </label>
      </div>

      <div className="text-2xl text-green-800">
        Special insturctions or notes ? (optional)
      </div>
      <textarea
        name="notes"
        placeholder="Type any Instructions or food notes here..."
        rows={4}
        cols={24}
        className="border w-full p-2 text-md"
      ></textarea>

      <Button className="w-full">Submit Order</Button>
    </form>
  );
}
