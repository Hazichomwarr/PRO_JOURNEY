//app/utils/formConfig.ts
import { FormOrderItem, SanitizedOrderItem } from "../_models/order";

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const parts = digits.match(/(\d{0,3})(\d{0,3})(\d{0,4})/) || [];
  return [parts[1], parts[2], parts[3]].filter(Boolean).join("-");
}

export const ORDER_ITEMS: FormOrderItem[] = [
  {
    name: "dibi",
    label: "Grilled Goat (DIBI)",
    price: 14,
  },
  {
    name: "chicken",
    label: "Grilled Chicken (Pintade)",
    price: 15,
  },
  {
    name: "jollof-rice",
    label: "Jollof Rice (Riz gras)",
    price: 5.99,
  },
  {
    name: "jollof-chicken",
    label: "Jollof Rice + Chicken",
    price: 15,
  },
  {
    name: "jollof-dibi",
    label: "Jollof Rice + Goat (DIBI)",
    price: 15,
  },
  { name: "alloco", label: "Fried Plantain (Alloco)", price: 4.99 },
];

//app/_utils/formConfig.ts
export function orderTotalPrice(selected: SanitizedOrderItem[]): number {
  const price = {
    dibi: 15,
    "jollof-rice": 5.99,
    alloco: 4.99,
    chicken: 15,
    "jollof-chicken": 15,
    "jollof-dibi": 15,
  };
  let total = 0;

  for (const item of selected) {
    const { productId, quantity } = item;
    if (productId === "dibi") total += quantity * price.dibi;
    if (productId === "chicken") total += quantity * price.chicken;
    if (productId === "jollof-rice") total += quantity * price["jollof-rice"];
    if (productId === "jollof-chicken")
      total += quantity * price["jollof-chicken"];
    if (productId === "jollof-dibi") total += quantity * price["jollof-dibi"];
    if (productId === "alloco") total += quantity * price.alloco;
  }

  return Math.round(total * 100) / 100;
}
