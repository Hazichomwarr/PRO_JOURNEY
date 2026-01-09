//order/review/page.tsx
import { OrderDraftType } from "@/app/_models/order";
import Button from "@/app/_components/ui/Button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrderPriceDetails from "@/app/_components/OrderPriceDetails";
import reviewOrder from "./action";
import { MENU } from "@/app/_menuConfig/menu";

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
        {orderDraft.menuItems.map((item) => {
          const { productId, quantity } = item;
          const label = MENU[productId].label; //you said you label should be used
          return (
            <li
              key={productId}
              className=" grid grid-cols-2 border-b border-gray-300 p-4"
            >
              <span>{label}</span>
              <span className="font-bold">QTY: {quantity}</span>
            </li>
          );
        })}
      </ul>
      <OrderPriceDetails
        total={orderDraft.total}
        delivery={orderDraft.userInfos.deliveryOption === "delivery"}
      />
      <div className="grid grid-cols-2">
        <a
          href="/order"
          className="bg-blue-700 px-3 w-fit py-2 text-lg rounded-md text-white hover:bg-blue-600"
        >
          Edit Order
        </a>

        <form action={reviewOrder}>
          <Button variant="tertiary">Send Order</Button>
        </form>
      </div>
    </div>
  );
}
