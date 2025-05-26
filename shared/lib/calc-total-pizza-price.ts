import { Ingridient, Variation } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const calcTotalPizzaPrice = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  variations: Variation[] | null | undefined,
  ingredients: Ingridient[] | null | undefined,
  selected: Set<number> | null | undefined
): number => {
  // 1. Страховки на случай кривого ответа бекенда
  const vars = variations ?? [];
  const ings = ingredients ?? [];
  const sel = selected ?? new Set<number>();

  // 2. Базовая цена пиццы
  const base =
    vars.find((v) => v.pizzaType === pizzaType && v.size === pizzaSize)
      ?.price ?? 0;

  // 3. Цена за выбранные ингредиенты
  const extra = ings.reduce(
    (sum, ing) => (sel.has(ing.id) ? sum + ing.price : sum),
    0
  );

  return base + extra;
};
