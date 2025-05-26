"use client";

import React from "react";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/shared/store";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const cartPrice = useCartStore((state) => state.totalAmount);
  const cartQuantity = useCartStore((state) => state.items.length);
  const loading = useCartStore((state) => state.loading);

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn("group relative", { "w-[122px]": loading }, className)}
      >
        <b>{cartPrice} ₸</b>
        <span className="h-full w-[1px] bg-white/60 mx-3"></span>
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0 ">
          <ShoppingCart className="h-4 w-4" strokeWidth={2} />{" "}
          <b>{cartQuantity}</b>
        </div>
        <ArrowRight className="w-5 absolute right-7 transition duration-400 translate-x-2   opacity-0 group-hover:opacity-100 group-hover:translate-x-4"></ArrowRight>
      </Button>
    </CartDrawer>
  );
};
