import { PizzaSize, PizzaType } from "../constants/pizza";
import { CartDTO } from "../services/dto/cart.dto";
import { calcCartTotalPrice } from "./calc-cart-total-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: PizzaSize;
  pizzaType?: PizzaType;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  cartItems: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const cartItems = data.userCart.cartItem.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.Variation.product.name,
    imageUrl: item.Variation.product.imageUrl,
    disabled: false,
    price: calcCartTotalPrice(item),
    pizzaSize: item.Variation.size as PizzaSize,
    pizzaType: item.Variation.pizzaType as PizzaType,
    ingredients: item.ingridients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];

  return {
    cartItems,
    totalAmount: data.userCart.totalAmount,
  };
};
