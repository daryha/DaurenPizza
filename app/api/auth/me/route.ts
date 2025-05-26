import { prisma } from "@/prisma/prisma-cient";
import { authOptions } from "@/shared/constants/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getServerSession(authOptions);

    if (!user) {
      throw new Error("Вы не авторизованы");
    }

    const data = await prisma.user.findFirst({
      where: {
        id: Number(user.user.id),
      },

      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "[USER_GET] ServerError" }, { status: 500 });
  }
}
