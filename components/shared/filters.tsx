import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Brush } from "lucide-react";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { text } from "stream/consumers";
import { Value } from "@radix-ui/react-select";
import { CheckboxFiltersGroups } from "./checkbox-filters-groups";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold"></Title>

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-120 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-8">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={5000}
            defaultValue={0}
          />
          <Input type="number" min={0} max={5000} placeholder="1000" />
        </div>
        <RangeSlider
          min={0}
          max={5000}
          step={10}
          value={[0, 5000]}
        ></RangeSlider>
      </div>

      <CheckboxFiltersGroups
        className="mt-5"
        title="Ингредиенты:"
        limit={6}
        defItems={[
          {
            text: "Сырный соус",
            value: "1",
          },

          {
            text: "Моцарелла",
            value: "2",
          },
          {
            text: "Чеснок",
            value: "3",
          },
          {
            text: "Солённые огурчики",
            value: "4",
          },
          {
            text: "Помидоры",
            value: "5",
          },
          {
            text: "Острый соус",
            value: "6",
          },
        ]}
        items={[
          {
            text: "Сырный соус",
            value: "1",
          },

          {
            text: "Моцарелла",
            value: "2",
          },
          {
            text: "Чеснок",
            value: "3",
          },
          {
            text: "Солённые огурчики",
            value: "4",
          },
          {
            text: "Помидоры",
            value: "5",
          },
          {
            text: "Острый соус",
            value: "6",
          },

          {
            text: "Сырный соус",
            value: "1",
          },

          {
            text: "Моццарелла",
            value: "2",
          },
          {
            text: "Чеснок",
            value: "3",
          },
          {
            text: "Солённые огурчики",
            value: "4",
          },
          {
            text: "Помидоры",
            value: "5",
          },
          {
            text: "Острый соус",
            value: "6",
          },

          {
            text: "Сырный соус",
            value: "1",
          },

          {
            text: "Моццарелла",
            value: "2",
          },
          {
            text: "Чеснок",
            value: "3",
          },
          {
            text: "Солённые огурчики",
            value: "4",
          },
          {
            text: "Помидоры",
            value: "5",
          },
          {
            text: "Острый соус",
            value: "6",
          },
          {
            text: "Сырный соус",
            value: "1",
          },

          {
            text: "Моццарелла",
            value: "2",
          },
          {
            text: "Чеснок",
            value: "3",
          },
          {
            text: "Солённые огурчики",
            value: "4",
          },
          {
            text: "Помидоры",
            value: "5",
          },
          {
            text: "Острый соус",
            value: "6",
          },
        ]}
      />
    </div>
  );
};
