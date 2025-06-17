import { cn } from "@/shared/lib/utils";
import { OrderItem } from "@/shared/services/order";
import { Ingridient } from "@prisma/client";
import React, { useState } from "react";

interface Props {
  className?: string;
  items: OrderItem;
  ingredients: Ingridient[];
}

export const OrderItemCard: React.FC<Props> = ({ className, items, ingredients }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Форматирование цены
  const formatPrice = (price: number) => price.toLocaleString();

  return (
    <div
      className={`border-b border-gray-100 pb-3 mb-3 last:border-0 last:mb-0 last:pb-0  ${className || ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex h-16 w-16 items-center justify-center rounded-xl bg-orange-100 overflow-hidden shadow-sm">
            <img
              src={items.Variation.product.imageUrl}
              alt={items.Variation.product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-base font-medium text-gray-800">
                {items.Variation.product.name}
              </span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <span>{items.Variation.size} см</span>
              {items.Variation.pizzaType === 1 && (
                <span className="ml-2">• Традиционное тесто</span>
              )}
              {items.Variation.pizzaType === 2 && <span className="ml-2">• Тонкое тесто</span>}
              <span className="mx-2">•</span>
              <span>{items.quantity} шт</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-orange-500">
            {formatPrice(items.Variation.price * items.quantity)} ₸
          </div>
        </div>
      </div>

      {(ingredients.length > 0 || items.comment) && (
        <div className="mt-2 ">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-primary flex items-center transition-transform "
          >
            {isExpanded ? "Скрыть детали" : "Показать детали"}
            <svg
              className={`ml-1 w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ",
              isExpanded
                ? `overflow-hidden transform scale-y-100 opacity-100 `
                : "transform scale-y-0 opacity-0 -mt-10"
            )}
          >
            {ingredients.length > 0 && (
              <div className="mt-2 pl-2 border-l-2 border-gray-200 ">
                <div className={`mb-1 transition-transform 4{}`}>
                  <span className="text-xs font-medium text-gray-700">Ингредиенты: </span>
                  <span className="text-xs text-gray-600">
                    {ingredients.map((ing) => ing.name).join(", ")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
