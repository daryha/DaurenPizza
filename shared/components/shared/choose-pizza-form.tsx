import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, PizzaTypes } from "@/shared/constants/pizza";
import { Ingridient, Variation } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingridient[];
  variation: Variation[];
  loading?: boolean;
  onSubmit: (variationId: number, ingredients: number[]) => void;
}
export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  variation,
  ingredients,
  loading,
  onSubmit,
}) => {
  const {
    pizzaSize,
    pizzaType,
    availableSizes,
    selectedIngredients,
    currentItemId,
    setPizzaSize,
    setPizzaType,
    addIngredients,
  } = usePizzaOptions(variation);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  const { textDetails, totalPrice } = getPizzaDetails(
    pizzaType,
    pizzaSize,
    variation,
    ingredients,
    selectedIngredients
  );
  return (
    <div className={cn(className, "flex justify-between  h-[700px] ")}>
      <PizzaImage imageUrl={imageUrl} size={pizzaSize}></PizzaImage>
      <div className="flex flex-col w-[490px] bg-[#f7f6f5]  justify-between p-7">
        <div>
          <Title text={name} size="md" className="font-extrabold mb-1"></Title>
          <p className="text-gray-400">{textDetails}</p>
        </div>

        <div className="flex flex-col justify-between  ">
          <GroupVariants
            items={availableSizes}
            value={String(pizzaSize)}
            onClick={(value) => setPizzaSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={PizzaTypes}
            value={String(pizzaType)}
            onClick={(value) => setPizzaType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[400px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3 box-border ">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredients(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full  "
        >
          Добавь в корзину за {totalPrice} ₸
        </Button>
      </div>
    </div>
  );
};
