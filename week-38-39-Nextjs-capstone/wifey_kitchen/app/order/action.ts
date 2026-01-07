// app/order/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserInfoSanitized } from "../_models/order";
import { InitialStateType } from "./page";
import { orderTotalPrice } from "../_utils/formConfig";

type OrderErrors = {
  name?: string;
  phone?: string;
  deliveryOption?: string;
  address?: string;
  menuItems?: string;
};

export async function submitOrder(
  prevState: InitialStateType,
  formData: FormData
) {
  const raw = Object.fromEntries(formData.entries());
  console.log("raw:", raw);

  const menuItems = Object.entries(raw)
    .filter(([key]) => key.startsWith("items["))
    .map(([key, value]) => {
      const productId = key.match(/items\[(.*)\]/)?.[1];
      return { productId, quantity: Number(value) };
    })
    .filter((item) => item.quantity > 0);

  //default values for name, phone, delivery options and notes
  const userInfos: UserInfoSanitized = {
    name: raw.name?.toString().trim(),
    phone: raw.phone?.toString().trim(),
    deliveryOption: raw.deliveryOption?.toString().trim(),
    address: raw.address?.toString().trim(),
    notes: raw.notes?.toString().trim(),
  };

  console.log("userInfos:", userInfos);
  console.log("items selected:", menuItems);

  //Error Array
  const missingInputs: OrderErrors = {};

  if (menuItems.length === 0)
    missingInputs.menuItems = "Select at least one menu item.";
  if (userInfos.name.length < 3) missingInputs.name = "Valid name required.";
  if (userInfos.phone.length !== 10)
    missingInputs.phone = "Invalid phone number.";
  if (!userInfos.deliveryOption)
    missingInputs.deliveryOption = "Delivery option is missi.";
  if (userInfos.deliveryOption === "delivery" && userInfos.address === "") {
    missingInputs.address = "Address is required for delivery.";
  }

  if (Object.keys(missingInputs).length > 0) {
    console.log("missings:", missingInputs);
    const total = 0;
    return { errors: missingInputs, values: { userInfos, menuItems, total } };
  }

  //Order Total Price
  const total = orderTotalPrice(menuItems);
  console.log("orderTotal price:", total);

  //create OrderDraft
  const orderDraft = {
    userInfos,
    menuItems,
    total,
    createdAt: Date.now(),
  };
  console.log("order-draft:", orderDraft);

  //Persist draft (temporary)
  const cookieStore = await cookies();
  cookieStore.set("order_draft", JSON.stringify(orderDraft), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 10, //10mins
  });

  //Move flow forward
  redirect("order/review");
}
