import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartTotalPrice = (item: CartItemDTO) => {
  const ingredientsPrice = item.ingridients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );
  return (ingredientsPrice + item.Variation.price) * item.quantity;
};


