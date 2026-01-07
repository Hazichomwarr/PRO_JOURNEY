//app/_models/order.ts
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

export type UserInfoSanitized = {
  name: string;
  phone: string;
  deliveryOption: string;
  address: string;
  notes: string;
};

export type OrderDraftType = {
  userInfos: UserInfoSanitized;
  menuItems: SanitizedOrderItem[];
  createdAt: number;
};
