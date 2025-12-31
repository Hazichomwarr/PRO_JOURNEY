// app/order/actions.ts
"use server";

export async function submitOrder(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  console.log("raw:", raw);

  const items = Object.entries(raw)
    .filter(([key]) => key.startsWith("items["))
    .map(([key, value]) => {
      const productId = key.match(/items\[(.*)\]/)?.[1];
      return { productId, quantity: Number(value) };
    })
    .filter((item) => item.quantity > 0);
  console.log("items:", items);
}
