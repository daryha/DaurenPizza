"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { gerCartItemDetails } from "./../../lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";


interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const { totalAmount, updateItemQuantity, items, loading, removeCartItem } =
    useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const [redirecting, setRedirecting] = React.useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        {totalAmount > 0 ? (
          <>
            <SheetHeader>
              <SheetTrigger>
                в корзине <span className="font-bold ">{items.length}</span>
              </SheetTrigger>
            </SheetHeader>
            <SheetTitle />
            <div className="-mx-6 mt-5 flex-1 overflow-auto  ">
              {items.map((item) => (
                <div className="mb-2">
                  <CartDrawerItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    details={gerCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize
                    )}
                    price={item.price}
                    quantity={item.quantity}
                    disabled={item.disabled}
                    onClickCountButton={(type) =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onClickDeleteButton={() => removeCartItem(item.id)}
                  />
                </div>
              ))}
            </div>
            <SheetFooter className="-mx-6 bg-white p-8 flex flex-col ">
              <div className="flex flex-col w-full gap-2">
                <div>
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount}₸</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button
                    onClick={() => setRedirecting(true)}
                    loading={redirecting}
                    className="w-full h-12 text-base"
                  >
                    Оформить заказ
                    <ArrowRight />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        ) : (
          <>
            <div className="text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              <img src="/empty.png" alt="" />
              <b>
                <p className="text-2xl">Пока тут пусто</p>
              </b>
              <p className="text-sm">Добавьте пиццу. Или две!</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
