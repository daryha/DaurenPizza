import { Product } from "@prisma/client";
import { axiosInstance } from "./instance";
import { prisma } from "@/prisma/prisma-cient";

export type FavoriteItem = {
  id: number;
  product: Product;
  disabled?: boolean;
};

export async function fetchFavorites(): Promise<FavoriteItem[] | undefined> {
  try {
    const res = await axiosInstance.get<FavoriteItem[]>("/favorite", {
      withCredentials: true,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      console.error("Ошибка, статус:", res.status);
    }
  } catch (error: any) {
    console.error("Запрос упал:", error.response?.status, error.message);
  }
}

export async function addFavorite(productId: number): Promise<FavoriteItem[] | undefined> {
  try {
    const res = await axiosInstance.post<FavoriteItem[]>("/favorite", { productId: productId });

    if (res.status === 201) {
      return res.data;
    } else {
      console.error("Не удалось добавить в избранное, статус:", res.status);
      return;
    }
  } catch (error: any) {
    console.error("Ошибка при добавлении в избранное:", error.response?.status, error.message);
    return;
  }
}

export async function deleteFavorite(productId: number): Promise<FavoriteItem[] | undefined> {
  try {
    const res = await axiosInstance.delete<FavoriteItem[]>("/favorite/" + productId);

    if (res.status === 200) {
      return res.data;
    } else {
      console.error("Не удалось добавить в избранное, статус:", res.status);
      return;
    }
  } catch (error: any) {
    console.error("Ошибка при добавлении в избранное:", error.response?.status, error.message);
    return;
  }
}
