import { create } from "zustand";
import { Api } from "../services/api-client";
import { UserOrder } from "../services/order";

export interface OrderState {
  loading: boolean;
  error: boolean;
  errorMessage?: string;
  items: UserOrder[];
  fetchOrders: () => Promise<void>;
  clearErrors: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  items: [],
  error: false,
  errorMessage: undefined,
  loading: false,

  fetchOrders: async () => {
    try {
      set({ loading: true, error: false, errorMessage: undefined });

      const data = await Api.order.getUserOrders();

      if (data) {
        set({ items: data });
      } else {
        set({
          error: true,
          errorMessage: "Не удалось получить список заказов",
        });
      }
    } catch (error) {
      console.error("Ошибка при получении заказов:", error);
      const errorMessage = error instanceof Error ? error.message : "Произошла неизвестная ошибка";

      set({
        error: true,
        errorMessage,
      });
    } finally {
      set({ loading: false });
    }
  },

  clearErrors: () => set({ error: false, errorMessage: undefined }),
}));
