//app/order/page.tsx
import { cookies } from "next/headers";
import OrderForm from "../_components/OrderForm";
import { OrderDraftType, UserInfoSanitized } from "../_models/order";

export default async function OrderPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("order_draft");

  const initialState = cookie ? {errors: {}, values: JSON.parse(cookie.value)} 
  : { 
    errors: {},
    values: {
      userInfos: {name: "", phone: "", deliveryOption: "delivery", address: "", notes: ""},
      menuItems: []
    }
  }

  const headerString = cookie ? "Edit Order" : "Enter your Order"

  return (
    <div className="space-y-2 flex flex-col items-center p-4 max-w-3xl">
      <h3 className="text-3xl">{headerString}</h3>
      <OrderForm  initialState={initialState}/>
    </div>
  );
}
