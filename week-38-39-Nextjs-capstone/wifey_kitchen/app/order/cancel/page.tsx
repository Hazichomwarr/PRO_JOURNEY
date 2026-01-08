import { cookies } from "next/headers";

//app/order/cancel/page.tsx
export default async function cancelPage() {
  const cookieStore = await cookies();
  cookieStore.delete("order_draft");
  return <div>Order Canceled.</div>;
}
