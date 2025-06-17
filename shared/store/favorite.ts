// store/useFavoriteStore.ts
import { create } from "zustand";
import { Api } from "../services/api-client";
import { FavoriteItem } from "../services/favorite";

export interface FavoriteState {
  loading: boolean;
  error: boolean;
  items: FavoriteItem[];
  fetchFavorite: () => Promise<void>;
  addFavorite: (id: number) => Promise<void>;
  deleteFavorite: (id: number) => Promise<void>;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  items: [],
  error: false,
  loading: true,

  fetchFavorite: async () => {
    try {
      set({ loading: true, error: false });

      const data = await Api.favorite.fetchFavorites();

      if (data) {
        set({ items: data });
      }
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addFavorite: async (productId: number) => {
    try {
      set({ loading: true, error: false });
      await Api.favorite.addFavorite(productId);

      const updatedData = await Api.favorite.fetchFavorites();

      if (updatedData) {
        set({ items: Array.isArray(updatedData) ? updatedData : [updatedData] });
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  deleteFavorite: async (productId: number) => {
    try {
      set((state) => ({
        error: false,
        items: state.items.map((item) =>
          item.id === productId ? { ...item, disabled: true } : item
        ),
      }));
      await Api.favorite.deleteFavorite(productId);
      const updatedData = await Api.favorite.fetchFavorites();

      if (updatedData) {
        set({ items: Array.isArray(updatedData) ? updatedData : [updatedData] });
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },
}));
