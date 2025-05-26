import React from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { Variation } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";
import { Item } from "@radix-ui/react-select";

interface ReturnProps {
  pizzaSize: PizzaSize;
  pizzaType: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;
  setPizzaSize: (pizzaSize: PizzaSize) => void;
  setPizzaType: (pizzaType: PizzaType) => void;
  addIngredients: (id: number) => void;
}

export const usePizzaOptions = (variation: Variation[]): ReturnProps => {
  const [pizzaSize, setPizzaSize] = React.useState<PizzaSize>(20);
  const [pizzaType, setPizzaType] = React.useState<PizzaType>(1);

  const availableSizes = getAvailablePizzaSizes(pizzaType, variation);

  const currentItemId = variation.find(
    (Item) => Item.pizzaType === pizzaType && Item.size === pizzaSize
  )?.id;

  const [selectedIngredients, { toggle: addIngredients }] = useSet(
    new Set<number>([])
  );

  React.useEffect(() => {
    const availableSize = availableSizes?.find((Item) => !Item.disabled);
    const isAvailableSize = availableSizes?.find(
      (Item) => Number(Item.value) === pizzaSize && !Item.disabled
    );

    if (!isAvailableSize && availableSize) {
      setPizzaSize(Number(availableSize.value) as PizzaSize);
    }
  }, [pizzaType]);

  return {
    pizzaSize,
    pizzaType,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setPizzaSize,
    setPizzaType,
    addIngredients,
  };
};
