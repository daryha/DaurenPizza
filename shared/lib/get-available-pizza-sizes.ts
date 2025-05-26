import { Variation } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaSizes = (
  pizzaType: PizzaType,
  variation: Variation[]
): Variant[] => {
  const filteredPizzasByType = variation.filter(
    (Item) => Item.pizzaType === pizzaType
  );

  return pizzaSizes.map((Item) => ({
    name: Item.name,
    value: Item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(Item.value)
    ),
  }));
};
