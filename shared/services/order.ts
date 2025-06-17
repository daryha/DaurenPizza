import { axiosInstance } from "./instance";

export type OrderItem = {
  id: number;
  status: string;
  userId: number | null;
  token: string;
  totalAmount: number;
  quantity: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  comment: string | null;
  ingridients: [];
  Variation: {
    id: number;
    price: number;
    size: number;
    pizzaType: number;
    productId: number;
    product: {
      id: number;
      name: string;
      imageUrl: string;
      categoryId: number;
      createdAt: string;
      updatedAt: string;
    };
  };
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type UserOrder = {
  id: number;
  status: string;
  userId: number | null;
  token: string;
  totalAmount: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  comment: string | null;
  items: JSON;
  createdAt: Date;
  updatedAt: Date;
};

export const getUserOrders = async (): Promise<UserOrder[] | undefined> => {
  try {
    const response = await axiosInstance.get<{ userOrders: UserOrder[] }>("/orders");

    if (response.status === 200) {
      if (response.data && response.data.userOrders && Array.isArray(response.data.userOrders)) {
        return response.data.userOrders;
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.warn("Неожиданный формат данных:", response.data);
        return [];
      }
    } else {
      console.error("Ошибка, статус:", response.status);
      return undefined;
    }
  } catch (error: any) {
    console.error("Запрос упал:", error.response?.status, error.message);
    return undefined;
  }
};
