// app/order/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  OrderDraftType,
  SanitizedOrderItem,
} from "../_components/_models/order";

export async function submitOrder(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  // console.log("raw:", raw);

  const items: SanitizedOrderItem[] = Object.entries(raw)
    .filter(([key]) => key.startsWith("items["))
    .map(([key, value]) => {
      const productId = key.match(/items\[(.*)\]/)?.[1];
      return { productId, quantity: Number(value) };
    })
    .filter((item) => item.quantity > 0);

  console.log("items selected:", items);

  if (items.length === 0) {
    throw new Error("No items selected");
  }
  //create OrderDraft
  const OrderDraft: OrderDraftType = { items, createdAt: Date.now() };

  //Persist draft (temporary)
  const cookieStore = await cookies();
  cookieStore.set("order_draft", JSON.stringify(OrderDraft), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 10, //10mins
  });

  //Move flow forward
  redirect("order/review");
}
