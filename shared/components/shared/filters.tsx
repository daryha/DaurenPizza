"use client";

import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroups } from "./checkbox-filters-groups";
import { useFilters, useIngredients, useQueryFilters } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices(`priceFrom`, prices[0]);
    filters.setPrices(`priceTo`, prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold"></Title>

      <CheckboxFiltersGroups
        title="Тип теста"
        className="mb-5"
        name="pizzaTypes"
        onClickCheckBox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "2" },
          { text: "Традицинонное", value: "1" },
        ]}
        loading={false}
      />

      <CheckboxFiltersGroups
        title="Размеры"
        className="mb-5"
        name="sizes"
        onClickCheckBox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
        loading={false}
      />



      <div className="mt-5 border-y border-y-neutral-120 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-8">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={7500}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            min={0}
            max={7500}
            placeholder="7500"
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={7500}
          step={10}
          value={[filters.prices.priceFrom ?? 0, filters.prices.priceTo ?? 7500]}
          onValueChange={updatePrices}
        ></RangeSlider>
      </div>

      <CheckboxFiltersGroups
        className="mt-5"
        title="Ингредиенты:"
        limit={6}
        items={items}
        loading={loading}
        onClickCheckBox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
        name={"ingredients"}
      />
    </div>
  );
};
