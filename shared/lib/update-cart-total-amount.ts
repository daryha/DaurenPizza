import { prisma } from "@/prisma/prisma-cient";
import { calcCartTotalPrice } from "./calc-cart-total-price";

export const updateCartTotalAmount = async (token: string) => {
  try {
    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        cartItem: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            Variation: {
              include: {
                product: true,
              },
            },
            ingridients: true,
          },
        },
      },
    });

    if (!userCart) {
      return;
    }

    const totalAmount = userCart?.cartItem.reduce((acc, item) => acc + calcCartTotalPrice(item), 0);

    return await prisma.cart.update({
      where: {
        id: userCart.id,
      },

      data: {
        totalAmount,
      },

      include: {
        cartItem: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            Variation: {
              include: {
                product: true,
              },
            },
            ingridients: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
