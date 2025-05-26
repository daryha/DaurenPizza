import { useRouter } from "next/navigation";
import React from "react";
import qs from "qs";
import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, { arrayFormat: "comma" });
      router.push(`?${query}`, { scroll: false });
    }
    isMounted.current = true;
  }, [filters.pizzaTypes, filters.prices, filters.sizes, filters.selectedIngredients, router]);
};
