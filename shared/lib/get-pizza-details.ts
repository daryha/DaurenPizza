import { Ingridient, Variation } from "@prisma/client";
import { mapPizzaTypeIncline, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  variation: Variation[],
  ingredients: Ingridient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    pizzaType,
    pizzaSize,
    variation,
    ingredients,
    selectedIngredients
  );

  const textDetails = `${pizzaSize} см, ${mapPizzaTypeIncline[pizzaType]} пицца`;

  return { totalPrice, textDetails };
};
