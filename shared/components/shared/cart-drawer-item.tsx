import { cn } from "@/shared/lib/utils";
import React from "react";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";
interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickDeleteButton?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  className,
  details,
  imageUrl,
  name,
  price,
  quantity,
  disabled,
  onClickCountButton,
  onClickDeleteButton,
}) => {
  return (
    <div
      className={cn(
        "flex bg-white p-5 gap-6",
        {
          "opacity-50 pointer-events-none": disabled,
        },
        className
      )}
    >
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info details={details} name={name} />
        <hr className="my-3" />

        <div className="flex justify-between items-center">
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-2">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={15}
              onClick={onClickDeleteButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
