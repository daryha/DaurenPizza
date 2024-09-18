import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Props {
  className?: string;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const ProductCard: React.FC<Props> = ({
  className,
  id,
  name,
  price,
  imageUrl,
}) => {
  return (
    <div className={className}>
      <Link href="/product/1">
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src="imgUrl" alt="Logo" />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold"></Title>
        <p className="text-sm text-gray-400">
          томатный соус, моцарелла, пармезан, пепперони, грибы, болгарский
          перец, лук, оливки, артишоки, базилик, оливковое масло, чеснок,
          итальянские травы, специи.
        </p>

        <div className="flex justify-between">
          <span className="text-[20px]">
            от <b>{price} тнг</b>
          </span>

          <Button>
            <Plus size={20} className="mr-1"/>
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
