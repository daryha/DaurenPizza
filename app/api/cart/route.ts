import { prisma } from "@/prisma/prisma-cient";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";

export async function GET(req: NextRequest) {
  const userSession = await getUserSession();
  const userId = Number(userSession?.id);
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token && !userId) {
      return NextResponse.json({ totalAmount: 0, Items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: userId ? { userId } : { token },
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

    return NextResponse.json({ userCart });
  } catch (error) {
    console.log(`[CART_GET]  Server error`, error);
    return NextResponse.json({ message: "Не удалось получить корзину" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userSession = await getUserSession();
  const userId = Number(userSession?.id);
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    if (token === null && userId) {
      const newToken = crypto.randomUUID();
      await prisma.cart.update({
        where: {
          userId,
        },

        data: {
          token: newToken,
        },
      });
    }

    const userCart = await findOrCreateCart(token, userId);

    const data = (await req.json()) as CreateCartItemValues;
    const ingredientsCount = data.ingredients?.length || 0;

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart?.id,
        productItemId: data.productItemId,
      },
      include: {
        ingridients: true,
      },
    });

    let findCartItem = null;
    for (const item of cartItems) {
      if (item.ingridients.length !== ingredientsCount) {
        continue;
      }

      if (ingredientsCount === 0) {
        findCartItem = item;
        break;
      }

      let allMatch = true;
      const itemIngredientIds = item.ingridients.map((ing) => ing.id);

      for (const ingredientId of data.ingredients || []) {
        if (!itemIngredientIds.includes(ingredientId)) {
          allMatch = false;
          break;
        }
      }

      if (allMatch) {
        findCartItem = item;
        break;
      }
    }

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: Number(userCart?.id),
          productItemId: data.productItemId,
          quantity: 1,
          ingridients:
            data.ingredients && data.ingredients.length > 0
              ? { connect: data.ingredients.map((id) => ({ id })) }
              : undefined,
        },
      });
    }

    const updateUserCart = await updateCartTotalAmount(String(userCart?.token));
    const response = NextResponse.json({ userCart: updateUserCart });
    response.cookies.set("cartToken", String(userCart?.token));
    return response;
  } catch (error) {
    console.log(`[CART_POST]  Server error`, error);
    return NextResponse.json({ message: "Не удалось создать корзину" }, { status: 500 });
  }
}
