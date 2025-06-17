import { create } from "zustand";
import { Api } from "../services/api-client";
import { CartStateItem, getCartDetails } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      const cartDetails = getCartDetails(data);

      set({
        items: cartDetails.cartItems,
        totalAmount: cartDetails.totalAmount,
      });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      const cartDetails = getCartDetails(data);
      set({
        items: cartDetails.cartItems,
        totalAmount: cartDetails.totalAmount,
      });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        error: false,
        items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
      }));
      const data = await Api.cart.deleteItem(id);
      const cartDetails = getCartDetails(data);
      set({
        items: cartDetails.cartItems,
        totalAmount: cartDetails.totalAmount,
      });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      const cartDetails = getCartDetails(data);
      set({
        items: cartDetails.cartItems,
        totalAmount: cartDetails.totalAmount,
      });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
