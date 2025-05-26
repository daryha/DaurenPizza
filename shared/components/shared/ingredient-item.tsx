import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  price,
  imageUrl,
  name,
  active,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white  transition duration-500 ",
        { " ring-1 ring-primary ": active },
        className
      )}
      onClick={onClick}
    >
      <CircleCheck
        className={cn(
          "absolute top-2 right-2 text-primary transition duration-500 transform ",
          active ? " opacity-100" : " opacity-0"
        )}
      />

      <img src={imageUrl} width={110} height={110} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₸</span>
    </div>
  );
};
