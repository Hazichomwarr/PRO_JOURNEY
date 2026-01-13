//app/order/page.tsx
import { cookies } from "next/headers";
import OrderForm from "../_components/OrderForm";
import { OrderDraftType } from "../_models/order";
import PageTransition from "../_components/ui/PageTransition";

export type InitialStateType = {
  errors: Record<string, string>;
  values: Omit<OrderDraftType, "createdAt">;
};

export default async function OrderPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("order_draft");

  const initialState: InitialStateType = cookie
    ? {
        errors: {},
        values: JSON.parse(cookie.value) as Omit<OrderDraftType, "createdAt">,
      }
    : {
        errors: {},
        values: {
          userInfos: {
            name: "",
            phone: "",
            deliveryOption: "pickup",
            address: "",
            notes: "",
          },
          menuItems: [],
          total: 0,
        },
      };

  const headerString = cookie ? "Edit Order" : "Enter your Order";

  return (
    <PageTransition>
      <div className="space-y-2 flex flex-col items-center p-4 max-w-3xl">
        <h3 className="text-3xl">{headerString}</h3>
        <OrderForm initialState={initialState} />
      </div>
    </PageTransition>
  );
}
