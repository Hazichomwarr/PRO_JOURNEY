//app/order/review/action.ts
"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { OrderDraftType } from "@/app/_models/order";
import { MENU } from "@/app/_menuConfig/menu";

export default async function reviewOrder() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("order_draft");
  if (!cookie) redirect("/order/review");

  const orderDraft: OrderDraftType = JSON.parse(cookie.value);
  if (!orderDraft.menuItems.length) redirect("/order/review");

  const { name, phone, deliveryOption, address, notes } = orderDraft.userInfos;
  const isDelivery = deliveryOption === "delivery";

  //Concat all items into a string
  let els = [];
  for (const item of orderDraft.menuItems) {
    els.push(`- ${MENU[item.productId].label} x${item.quantity}`);
  }

  //Order-ID timestamp & ETA
  const orderId = `DK-${Date.now().toString().slice(-6)}`;
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const ETA = isDelivery ? "45–60 minutes" : "25–35 minutes";

  const receipt = `🍽️ NEW ORDER - DIDI'S CUISINE
  Order ID: ${orderId}
  Placed: ${timestamp}
  ETA: ${ETA}

  Customer:
  👤 Name: ${name}
  📞 Phone: ${phone}
  ${deliveryOption === "delivery" ? "🚚 Delivery" : "📦 Pickup"}
  ${isDelivery ? `📍 Address: ${address}` : ""}

  🧾Order: \n${els.join("\n")}
  ${notes ? `📝 NOTES: ${notes}` : ""}

  💰 Subtotal: ${orderDraft.total}
  ${isDelivery ? `🚚 Delivery: +5.00` : "\t\t------------"}
  💵 Total: ${isDelivery ? orderDraft.total + 5 : orderDraft.total}
  
  Thank you for your order 🙏`;

  console.log("Receipt:", receipt);

  //TODO: encodeURI
  const encodedMessage = encodeURIComponent(receipt);

  //Delete the cookie
  cookieStore.delete("order_draft");

  //TODO: Send it via whatsAPP
  const BUSINESS_PHONE = "19294537790";
  redirect(`https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`);

  //confirm user that his order has been sent
  //edirect("/order/confirm");
}
