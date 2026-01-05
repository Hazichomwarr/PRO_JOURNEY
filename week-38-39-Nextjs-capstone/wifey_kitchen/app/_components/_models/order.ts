export interface FormOrderItem {
  name: MenuType;
  label: string;
  price: number;
}

export type MenuType =
  | "dibi"
  | "chicken"
  | "jollof-rice"
  | "jollof-chicken"
  | "jollof-dibi";

export type SanitizedOrderItem = {
  productId: string | undefined;
  quantity: number;
};
export type OrderDraftType = { items: SanitizedOrderItem[]; createdAt: number };
