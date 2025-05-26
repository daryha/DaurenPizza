import { Api } from "@/shared/services/api-client";
import { Ingridient } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingridient[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return {
    ingredients,
    loading,
  };
};
