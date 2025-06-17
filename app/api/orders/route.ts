import { prisma } from "@/prisma/prisma-cient";
import { getUserSession } from "@/shared/lib/get-user-session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const useSession = await getUserSession();
    const userId = Number(useSession?.id);

    if (!useSession) {
      return NextResponse.json({ error: "Not auth" }, { status: 401 });
    }

    const userOrders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },

      where: {
        userId,
      },
    });

    if (!userOrders) {
      return NextResponse.json({ error: "orders not found" }, { status: 404 });
    }

    return NextResponse.json({ userOrders }, { status: 200 });
  } catch (error) {
    console.error("Server ERROR_GET_ORDERS");
    return NextResponse.json({ error: "Server ERROR_GET_ORDERS" }, { status: 500 });
  }
}
