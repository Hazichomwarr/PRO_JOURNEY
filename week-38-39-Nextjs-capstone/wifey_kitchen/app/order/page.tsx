//app/order/page.tsx
import OrderForm from "../_components/OrderForm";

export default function OrderPage() {
  return (
    <div className="space-y-2 flex flex-col items-center p-4 max-w-3xl">
      <h3 className="text-3xl">Enter your Order</h3>
      <OrderForm />
    </div>
  );
}
