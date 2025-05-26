"use client";

import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";
import { list } from "postcss";

type item = FilterChecboxProps;

interface Props {
  title: string;
  items: item[];
  limit?: number;
  loading: boolean;
  searchInputPlaceholder?: string;
  onClickCheckBox?: (id: string) => void;
  selected: Set<string>;
  defValue?: string[];
  className?: string;
  name: string;
}

export const CheckboxFiltersGroups: React.FC<Props> = ({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  loading,
  selected,
  onClickCheckBox,
  name,
}) => {
  const [showAll, setShowall] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-3 rounded-[8px]" />
          ))}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((items) =>
        items.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : items.slice(0, limit);

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
            name={name}
            endAdornment={Item.endAdornment}
            checked={selected?.has(Item.value)}
            onCheckedChange={() => onClickCheckBox?.(Item.value)}
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
