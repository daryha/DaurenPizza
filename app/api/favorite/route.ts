import { prisma } from "@/prisma/prisma-cient";
import { getUserSession } from "@/shared/lib/get-user-session";
import { CreateFavoriteItem } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userSession = await getUserSession();

    if (!userSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(userSession?.id);

    const body = (await req.json()) as CreateFavoriteItem;
    const productId = body.productId;

    if (!productId) {
      return NextResponse.json({ error: "productID not found" }, { status: 400 });
    }

    const existing = await prisma.favorite.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existing) {
      return NextResponse.json({ error: "favorite product has been" }, { status: 400 });
    }

    const newFavorite = await prisma.favorite.create({
      data: {
        productId,
        userId,
      },
    });

    return NextResponse.json(newFavorite, { status: 201 });
  } catch (error) {
    console.error("POST /api/favorite error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const userSession = await getUserSession();
  const userId = Number(userSession?.id);

  if (!userSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favorite = await prisma.favorite.findMany({
    where: {
      userId,
    },

    include: {
      product: true,
    },
    
  });

  return NextResponse.json(favorite, { status: 200 });
}
