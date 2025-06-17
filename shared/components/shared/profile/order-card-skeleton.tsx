import React from "react";
import { OrderItemCardSkeleton } from "./order-item-cart-skeleton";

interface Props {
  className?: string;
}

export const OrderCardSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* Шапка */}
      <div className="relative overflow-hidden border-b border-gray-100 p-6">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mt-2 animate-pulse"></div>
          </div>
          <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Содержимое */}
      <div className="p-6">
        <div className="flex flex-col gap-10">
          {/* Состав заказа */}
          <div className="space-y-4 rounded-xl bg-gray-50 p-4">
            <div className="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>

            {...Array(5).map((_, i) => <OrderItemCardSkeleton key={i} />)}
          </div>

          {/* Информация о доставке */}
          <div className="space-y-4 rounded-xl bg-gray-50 p-4">
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Итого */}
        <div className="mt-6 flex items-center justify-between rounded-xl bg-orange-50 p-4">
          <div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-200 rounded mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
