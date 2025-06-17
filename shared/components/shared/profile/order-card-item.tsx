import { OrderItem, UserOrder } from "@/shared/services/order";
import React, { useState } from "react";
import { OrderItemCard } from "./order-item-card";
import { Button } from "../../ui";

interface Props {
  className?: string;
  order: UserOrder;
}

export const OrderCardItem: React.FC<Props> = ({ className, order }) => {
  const clean = String(order.createdAt).split(".")[0].replace("T", " ");
  const jsonStringItems = order.items;
  const arrayOrderItems = JSON.parse(String(jsonStringItems)) as OrderItem[];
  console.log(arrayOrderItems);

  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  return (
    <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden border-b border-gray-100 p-6">
        <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-orange-500/10"></div>
        <div className="absolute -left-4 -top-4 h-12 w-12 rounded-full bg-orange-500/5"></div>

        <div className="flex flex-wrap items-center justify-between">
          <div>
            <div className="mb-1 flex items-center">
              <div className={`mr-2 h-2.5 w-2.5 rounded-full ${"order.statusColor"}`}></div>
              <p className="text-lg font-bold text-gray-900">Заказ #{order.id}</p>
            </div>
            <p className="text-sm text-gray-600">{clean} ·</p>
          </div>

          <div className="mt-2 flex flex-col items-end sm:mt-0">
            {order.status === "PENDING" ? (
              <div
                className={`mb-1 rounded-full bg-orange-500 px-3 py-1 text-sm font-medium text-white animate-pulse`}
              >
                {order.status}
              </div>
            ) : (
              <div
                className={`mb-1 rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white `}
              >
                {order.status}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex  flex-col-reverse  gap-10">
          <div className="space-y-4 rounded-xl bg-gray-50 p-4">
            <h4 className="font-medium text-gray-900">Состав заказа</h4>

            {showAllItems
              ? arrayOrderItems.map((item) => (
                  <OrderItemCard key={item.id} items={item} ingredients={item.ingridients} />
                ))
              : arrayOrderItems
                  .slice(0, 4)
                  .map((item) => (
                    <OrderItemCard key={item.id} items={item} ingredients={item.ingridients} />
                  ))}

            {!showAllItems && arrayOrderItems.length > 4 ? (
              <Button onClick={() => setShowAllItems(true)}>
                Еще {arrayOrderItems.length - 4}{" "}
              </Button>
            ) : (
              ""
            )}

            {showAllItems && arrayOrderItems.length > 5 && (
              <Button onClick={() => setShowAllItems(false)}>Скрыть</Button>
            )}
          </div>

          <div className="space-y-4 rounded-xl bg-gray-50 p-4">
            <h4 className="font-medium text-gray-900">Информация о доставке</h4>
            <div className="space-y-2">
              <div className="flex justify-between"></div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Адрес:</span>
                <span className="text-sm font-medium text-gray-900">{order.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl bg-orange-50 p-4">
          <div>
            <p className="text-sm text-gray-600">Итого:</p>
            <p className="text-2xl font-bold text-orange-500">{order.totalAmount} ₸</p>
          </div>
        </div>
      </div>
    </div>
  );
};
