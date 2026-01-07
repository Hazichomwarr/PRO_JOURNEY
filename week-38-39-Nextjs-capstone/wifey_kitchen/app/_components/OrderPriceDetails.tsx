//app/_components/OrderPriceDetails.tsx
"use client";

type Props = {
  delivery: boolean;
  total: number;
  taxes?: number;
};

export default function OrderPriceDetails({
  delivery,
  total,
  taxes = 0.0,
}: Props) {
  return (
    <div className="p-2 grid grid-cols-2 gap-2">
      <p>Items total:</p>
      <span>${total}</span>
      {delivery && (
        <>
          <p>Delivery fees: </p> <span>+ $5</span>
        </>
      )}
      <p>Taxes:</p> <span> + ${taxes}</span>
      <p className="mt-2 font-bold">Net To Pay: </p>
      <span className="font-bold">
        ${delivery ? total + 5 + taxes : total + taxes}
      </span>
    </div>
  );
}
