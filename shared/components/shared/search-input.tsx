"use client";
import { useClickAway, useDebounce } from "react-use";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";
import { Item } from "@radix-ui/react-select";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (err) {
        console.log(err);
      }
    },
    250,
    [searchQuery]
  );

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}

      <div
        className="flex relative rounded-2xl flex-1 justify-between h-11 z-30"
        ref={ref}
      >
        <Search className="absolute  translate-y-[50%] left-3 h-5 text-gray-400" />

        <input
          type="text"
          placeholder="Найти пиццу"
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-2xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30 ",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={onClickItem}
              >
                <div className="px-3 py-2 hover:bg-primary/10 cursor-pointer flex items-center gap-3">
                  <img
                    className="rounded-sm"
                    src={product.imageUrl}
                    alt={product.name}
                    width={42}
                    height={42}
                  />
                  <span>{product.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
