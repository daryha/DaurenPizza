import { cn } from "@/shared/lib/utils";
import React from "react";
import { Categories } from "./categories";
import { SortPopap } from "./sort-popap";
import { Container } from "./container";
import { Category } from "@prisma/client";

interface Props {
  className?: string;
  categories: Category[];
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 rounded-2xl px-4",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        {/* <SortPopap /> */}
      </Container>
    </div>
  );
};
