"use client";

import React, { useEffect } from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";

interface Props {
  className?: string;
  title: string;
  categoryId: number;
  listClassName?: string;
  items: any[];
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

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      console.log(setActiveCategoryId(categoryId));
    }
  }, [categoryId, intersection?.isIntersecting, title]);
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title
        text={title}
        size="sm"
        className="font font-extrabold mt-5 mb-5"
      ></Title>
      <div className={cn("grid grid-cols-3 gap-[100px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};
