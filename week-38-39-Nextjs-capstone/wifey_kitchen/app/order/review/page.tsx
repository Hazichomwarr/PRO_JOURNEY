//order/review/page.tsx
import { OrderDraftType } from "@/app/_models/order";
import Button from "@/app/_components/ui/Button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ReviewPage() {
  //Get OrderDraft from cookies
  const cookieStore = await cookies();

  const cookie = cookieStore.get("order_draft");
  if (!cookie) redirect("/order");

  const orderDraft: OrderDraftType = JSON.parse(cookie.value);
  if (!orderDraft.menuItems.length) redirect("/order");

  return (
    <div className="max-w-2xl mx-auto my-2 p-6 space-y-4 shadow-md bg-stone-50">
      <h1 className="text-2xl font-bold">Review Your Order</h1>

      <ul className="space-y-2">
        {orderDraft.menuItems.map((item) => (
          <li
            key={item.productId}
            className=" grid grid-cols-2 border-b border-gray-300 p-4"
          >
            <span>{item.productId?.toUpperCase()}</span>
            <span className="font-bold">QTY: {item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2">
        <a
          href="/order"
          className="bg-blue-700 px-3 py-2 text-lg rounded-md text-white hover:bg-blue-600 w-[40%]"
        >
          Edit Order
        </a>

        <form action="/order/confirm" method="post">
          <Button variant="tertiary">Send Order</Button>
        </form>
      </div>
    </div>
  );
}
