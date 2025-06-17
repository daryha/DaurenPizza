import { getUserOrders } from "@/shared/services/order";
import React, { useEffect } from "react";
import { OrderCardItem } from "./order-card-item";
import { useOrderStore } from "@/shared/store/order";
import { OrderCardSkeleton } from "./order-card-skeleton";

interface Props {
  className?: string;
}

export const OrderCard: React.FC<Props> = ({ className }) => {
  const fetchOrders = useOrderStore((s) => s.fetchOrders);
  const orders = useOrderStore((s) => s.items);
  const loading = useOrderStore((s) => s.loading);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div>
      {loading
        ? Array(5).fill({length: 5}).map((_, i) => <OrderCardSkeleton key={i} />)
        : orders.map((order) => <OrderCardItem key={order.id} order={order} />)}
    </div>
  );
};
