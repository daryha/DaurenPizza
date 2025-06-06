import React from "react";
import { Skeleton } from "../ui";

interface Props {
  title?: React.ReactNode;
  price?: React.ReactNode;
}

export const CheckoutCount: React.FC<Props> = ({ title, price }) => {
  return (
    <div className="flex my-4">
      <span className="flex flex-1 text-lg text-neutral-500">
        {title}:
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
      </span>
      <span className="font-bold text-lg flex items-center gap-2">{price} ₸</span>
    </div>
  );
};
