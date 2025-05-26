import { prisma } from "@/prisma/prisma-cient";

export interface GerSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 7500;

export const findPizzas = async (paramsPromise: Promise<GerSearchParams>) => {
  const params = await paramsPromise;
  const sizes = params.sizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredientsIdArr = params.ingredients?.split(",").map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },

        where: {
          ingridient: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : undefined,

          variation: {
            some: {
              size: {
                in: sizes,
              },

              pizzaType: {
                in: pizzaTypes,
              },

              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },

        include: {
          ingridient: true,
          variation: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },

            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  return categories;
};
