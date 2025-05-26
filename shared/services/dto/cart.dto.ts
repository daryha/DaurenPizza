import { Cart, CartItem, Ingridient, Product, Variation } from "@prisma/client";

export type CartItemDTO = CartItem & {
  Variation: Variation & {
    product: Product;
  };

  ingridients: Ingridient[];
};

export interface CartDTO {
  userCart: Cart & {
    cartItem: CartItemDTO[];
  };
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients: number[];
}
