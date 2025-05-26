import { Ingridient, Product, Variation } from "@prisma/client";

export type ProductWithRelations = Product & {
  variation: Variation[];
  ingridient: Ingridient[];
};
