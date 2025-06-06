import { prisma } from "@/prisma/prisma-cient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const verificationCode = await prisma.varificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!verificationCode) {
      return NextResponse.json({ error: "invalid code" }, { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },

      data: {
        verified: new Date(),
      },
    });

    await prisma.varificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL("/?verified", req.url));
  } catch (err) {
    console.error(err);
    console.log("[VERIFY_GET] Server error ");
  }
}
