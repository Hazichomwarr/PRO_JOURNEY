//app/order/review/action.ts
"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function reviewOrder() {
  const cookieStore = await cookies();
  cookieStore.delete("order_draft");

  redirect("/order/confirm");
}
