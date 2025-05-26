import { Ingridient } from "@prisma/client";
import { ApiRoutes } from "./constans";
import { axiosInstance } from "./instance";

export const getAll = async (): Promise<Ingridient[]> => {
  return (await axiosInstance.get<Ingridient[]>(ApiRoutes.INGREDIENTS)).data;
};
