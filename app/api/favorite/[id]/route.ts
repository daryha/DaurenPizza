import { prisma } from "@/prisma/prisma-cient";
import { getUserSession } from "@/shared/lib/get-user-session";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Преобразуем params.id в число и сразу проверяем
    const rawId = params.id;
    const id = Number(rawId);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid id parameter" }, { status: 400 });
    }

    const userSession = await getUserSession();
    if (!userSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favoriteItem = await prisma.favorite.findFirst({
      where: {
        productId: id,
        userId: Number(userSession.id),
      },
    });

    if (!favoriteItem) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 });
    }

    await prisma.favorite.delete({ where: { id: favoriteItem.id } });

    return NextResponse.json({ message: "Favorite deleted" }, { status: 200 });
  } catch (error) {
    console.error("[FAVORITE_DELETE] Server error:", error);
    return NextResponse.json({ message: "Не удалось удалить favorite" }, { status: 500 });
  }
}
