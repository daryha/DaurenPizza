"use client";

import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { list } from "postcss";

type item = FilterChecboxProps;

interface Props {
  title: string;
  items: item[];
  defItems: item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defValue?: string[];
  className?: string;
}

export const CheckboxFiltersGroups: React.FC<Props> = ({
  title,
  items,
  defItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  onChange,
  defValue,
}) => {
  const [showAll, setShowall] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const list = showAll
    ? items.filter((items) =>
        items.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : defItems.slice(0, limit);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          ></Input>
        </div>
      )}

      <div className=" flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((Item, i) => (
          <FilterCheckbox
            key={i}
            text={Item.text}
            value={Item.value}
            endAdornment={Item.endAdornment}
            checked={false}
            onCheckedChange={(ids) => console.log(ids)}
            
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-120 mt-4" : ""}>
          <button
            onClick={() => setShowall(!showAll)}
            className="text-primary mt-3"
          >
            {!showAll ? " + Показать всё" : " - Скрыть"}
          </button>
        </div>
      )}
    </div>
  );
};
