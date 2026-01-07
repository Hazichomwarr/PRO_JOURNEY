//app/utils/formConfig.ts
import {FormOrderItem} from "../_models/order"

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const parts = digits.match(/(\d{0,3})(\d{0,3})(\d{0,4})/) || [];
  return [parts[1], parts[2], parts[3]].filter(Boolean).join("-");
}

//app/_utils/formConfig.ts
export const ORDER_ITEMS: FormOrderItem[] = [
    {
      name: "dibi",
      label: "Grilled Goat (DIBI)",
      price: 14,
     
    },
    {
      name: "chicken",
      label: "Grilled Chicken (Pintade)",
      price: 14,
      
    },
    {
      name: "jollof-rice",
      label: "Jollof Rice (Riz gras)",
      price: 5.99,
      
    },
    {
      name: "jollof-chicken",
      label: "Jollof Rice + Chicken",
      price: 14,
      
    },
    {
      name: "jollof-dibi",
      label: "Jollof Rice + Goat",
      price: 14,
      
    },
  ];