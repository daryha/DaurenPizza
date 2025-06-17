import { prisma } from "@/prisma/prisma-cient";
import crypto from "crypto";

export const findOrCreateCart = async (
  token: string | null,
  userId: number | null
): Promise<{ id: number; token: string } | null> => {
  if (token && userId) {
    const userCart = await prisma.cart.findFirst({
      where: { userId },
    });

    const anonCart = await prisma.cart.findFirst({
      where: {
        token,
        userId: null,
      },
    });

    if (userCart && anonCart) {
      await prisma.cartItem.updateMany({
        where: { cartId: anonCart.id },
        data: { cartId: userCart.id },
      });
      await prisma.cart.delete({
        where: { id: anonCart.id },
      });
      return { id: userCart.id, token: String(userCart.token) };
    }

    if (!userCart && anonCart) {
      const updated = await prisma.cart.update({
        where: { id: anonCart.id },
        data: { userId },
      });
      return { id: updated.id, token: String(updated.token) };
    }

    if (userCart && !anonCart) {
      return { id: userCart.id, token: String(userCart.token) };
    }

    const newToken = crypto.randomUUID();
    const newCart = await prisma.cart.create({
      data: {
        userId,
        token: newToken,
      },
    });
    return { id: newCart.id, token: String(newCart.token) };
  }

  if (!token && userId) {
    const userCart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (userCart) {
      return { id: userCart.id, token: String(userCart.token) };
    }

    const newToken = crypto.randomUUID();
    const newCart = await prisma.cart.create({
      data: {
        userId,
        token: newToken,
      },
    });
    return { id: newCart.id, token: String(newCart.token) };
  }

  if (token && !userId) {
    const anonCart = await prisma.cart.findFirst({
      where: {
        token,
        userId: null,
      },
    });

    if (anonCart) {
      return { id: anonCart.id, token: String(anonCart.token) };
    }

    const newCart = await prisma.cart.create({
      data: {
        userId: null,
        token,
      },
    });
    return { id: newCart.id, token: String(newCart.token) };
  }

  throw new Error("Невозможно определить корзину: нет token и userId");
};
