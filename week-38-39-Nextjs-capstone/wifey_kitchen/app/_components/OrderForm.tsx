//_components/OrderForm.tsx

"use client";

import { useActionState } from "react";
import { submitOrder } from "../order/action";
import { ORDER_ITEMS } from "../_utils/formConfig";
import MenuItem from "./MenuItem";
import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { InitialStateType } from "../order/page";

type Props = { initialState: InitialStateType };

export default function OrderForm({ initialState }: Props) {
  const [state, action] = useActionState(submitOrder, initialState);

  const { errors, values } = state;

  return (
    <form
      action={action}
      className="w-full max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-2xl shadow-md"
    >
      {/* Name + Phone Number */}
      <div className="grid grid-cols-2 items-start gap-3 p-2 border rounded-md border-gray-300">
        <Input
          type="text"
          name="name"
          defaultValue={values.userInfos.name}
          placeholder="Enter your Name"
          className="ui-input focus:ui-input-focus"
          inputError={errors.name}
          error={Boolean(errors.name)}
          required
        />

        <Input
          type="tel"
          name="phone"
          defaultValue={values.userInfos.phone}
          placeholder="Phone number"
          className="ui-input focus:ui-input-focus"
          inputError={errors.phone}
          error={Boolean(errors.phone)}
          required
        />
      </div>

      {/* MENU ITEMS */}
      <div
        className={`flex flex-col items-start gap-2 border p-2 rounded-md border-gray-300 ${
          Boolean(errors.menuItems) && "border-red-800"
        }`}
      >
        <h3 className="text-center mb-4 text-2xl text-green-700">
          Select dishes
        </h3>
        {ORDER_ITEMS.map((item) => (
          <MenuItem
            key={item.name}
            item={item.name}
            label={item.label}
            price={item.price}
            defaultQty={
              values.menuItems.find((i) => i.productId === item.name)
                ?.quantity ?? 0
            }
          />
        ))}
        {errors.menuItems && <p className="text-red-600">{errors.menuItems}</p>}
      </div>

      {/* Delivery Option */}
      <div className="flex flex-col items-start gap-2 border p-2 rounded-md border-gray-300">
        <h3 className="text-center mb-4 text-2xl text-green-700">
          Delivery Options
        </h3>
        <label className="flex items-center gap-2">
          Pickup
          <input
            type="radio"
            name="deliveryOption"
            value="pickup"
            defaultChecked={values.userInfos.deliveryOption === "pickup"}
          />
        </label>
        <label className="flex items-center gap-2">
          Delivery
          <div className="flex items-center gap-6">
            <input
              type="radio"
              name="deliveryOption"
              value="delivery"
              defaultChecked={values.userInfos.deliveryOption === "delivery"}
            />
            <Input
              type="text"
              name="address"
              defaultValue={values.userInfos.address}
              placeholder="Delivery Address here"
              className="ui-input focus:ui-input-focus"
              inputError={errors.address}
              error={Boolean(errors.address)}
            />
          </div>
        </label>
      </div>

      <div className="text-2xl text-green-800">
        Special instructions or notes ? (optional)
      </div>
      <textarea
        name="notes"
        defaultValue={values.userInfos.notes}
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
