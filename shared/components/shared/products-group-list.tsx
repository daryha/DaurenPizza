"use client";

import React, { useEffect } from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store/category";
import { Product } from "@prisma/client";
import { ProductWithRelations } from "@/types/prisma";
import { useFavoriteStore } from "@/shared/store";

interface Props {
  className?: string;
  title: string;
  categoryId: number;
  listClassName?: string;
  items: ProductWithRelations[];
}

export const ProductGroupList: React.FC<Props> = ({
  title,
  categoryId,
  items,
  className,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  const fetchFavorite = useFavoriteStore((s) => s.fetchFavorite);

  React.useEffect(() => {
    fetchFavorite();
  }, [fetchFavorite]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="sm" className="font font-extrabold mt-5 mb-5"></Title>
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variation[0].price}
            ingredients={product.ingridient}
          />
        ))}
      </div>
    </div>
  );
};
