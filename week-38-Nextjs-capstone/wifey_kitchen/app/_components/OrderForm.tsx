//_components/OrderForm.tsx
import { submitOrder } from "../order/action";
import { FormOrderItem } from "./_models/order";
import MenuItem from "./MenuItem";
import Button from "./ui/Button";
import { Input } from "./ui/Input";

export const orderItems: FormOrderItem[] = [
  { name: "dibi", label: "Grilled Goat (DIBI)", price: 14 },
  { name: "chicken", label: "Grilled Chicken (Pintade)", price: 14 },
  { name: "jollof-rice", label: "Jollof Rice (Riz gras)", price: 5.99 },
  { name: "jollof-chicken", label: "Jollof Rice + Chicken", price: 14 },
  { name: "jollof-dibi", label: "Jollof Rice + Goat", price: 14 },
];

export default function OrderForm() {
  return (
    <form
      action={submitOrder}
      className="w-full max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-2xl shadow-md"
    >
      {/* Name + Phone Number */}
      <div className="grid grid-cols-2 items-start gap-3 p-2 border rounded-md border-gray-300">
        <Input
          type="text"
          name="name"
          placeholder="Enter your Name"
          className="ui-input focus:ui-input-focus"
          required
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone number"
          className="ui-input focus:ui-input-focus"
          required
        />
      </div>

      {/* MENU ITEMS */}
      <div className="flex flex-col items-start gap-2 border p-2 rounded-md border-gray-300">
        <h3 className="text-center mb-4 text-2xl text-green-700">
          Select dishes
        </h3>

        {orderItems.map((item) => (
          <MenuItem
            key={item.name}
            item={item.name}
            label={item.label}
            price={item.price}
          />
        ))}
      </div>

      {/* Delivery Option */}
      <div className="flex flex-col items-start gap-2 border p-2 rounded-md border-gray-300">
        <h3 className="text-center mb-4 text-2xl text-green-700">
          Delivery Options
        </h3>
        <label className="flex items-center gap-2">
          Pickup
          <input type="radio" name="delivery-option" value="pickup" />
        </label>
        <label className="flex items-center gap-2">
          Delivery
          <div className="flex items-center gap-6">
            <input type="radio" name="delivery-option" value="delivery" />
            <Input
              type="text"
              name="address"
              placeholder="Delivery Address here"
              className="ui-input focus:ui-input-focus"
            />
          </div>
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

      <Button className="w-full" variant="secondary" type="submit">
        Submit Order
      </Button>
    </form>
  );
}
