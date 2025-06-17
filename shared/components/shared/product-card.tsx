import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Heart, icons, Plus } from "lucide-react";
import { Ingridient } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { useFavoriteStore } from "@/shared/store";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingridient[];
}

export const ProductCard: React.FC<Props> = ({
  className,
  id,
  name,
  price,
  imageUrl,
  ingredients,
}) => {
  const favorites = useFavoriteStore((s) => s.items);
  const isLiked = favorites.some((f) => f.product.id === id);

  const addFavorite = useFavoriteStore((s) => s.addFavorite);

  const deleteFavoriteState = useFavoriteStore((state) => state.deleteFavorite);

  const deleteOrAddFavorite = (favId: number) => {
    if (isLiked) {
      deleteFavoriteState(favId);
    } else {
      addFavorite(favId);
      toast.success(`${name}, добавлен в любимые товары!`);
    }
  };

  return (
    <div className="w-[290px] relative">
      <div
        className="absolute top-3 left-4 hover:cursor-pointer"
        onClick={() => deleteOrAddFavorite(id)}
      >
        <Heart className={cn(isLiked ? "fill-primary" : "", "text-primary")} />
      </div>

      <div className="flex justify-center p-6 bg-secondary rounded-lg  ">
        <img className="w-[215px] h-[215px]" src={imageUrl} alt="Logo" />
      </div>
      <Title
        text={name}
        size="sm"
        className={cn(ingredients.length > 0 ? "font-bold " : "font-bold h-[100px] ", "mt-4")}
      ></Title>

      {ingredients.length > 0 && (
        <p className="text-sm text-gray-400 h-[80px] mt-4">
          {ingredients.length > 6
            ? `${ingredients
                .slice(0, 6)
                .map((ing) => ing.name)
                .join(", ")}…`
            : ingredients.map((ing) => ing.name).join(", ")}
        </p>
      )}

      <div className="flex justify-between items-center mt-5">
        <span className="text-[20px] ">
          от <b>{price} ₸</b>
        </span>

        <Link href={`/product/${id}`} className="flex flex-col space-y-3">
          <Button variant={"secondary"}>
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </Link>
      </div>
    </div>
  );
};
