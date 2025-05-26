"use client";

import { DialogContent, Dialog } from "@/shared/components/ui/dialog";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { ProductForm } from "../product-form";

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();

  return (
    <div className={className}>
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent
          className={cn(
            "p-o w-[1060px] max-w-[1060px] min-w-[500px] bg-white overflow-hidden p-0"
          )}
        >
          <ProductForm product={product} onSubmit={() => router.back()} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
