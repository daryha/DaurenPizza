import { prisma } from "@/prisma/prisma-cient";
import { NextResponse } from "next/server";

export async function GET() {
  const stories = await prisma.story.findMany({
    include: {
      items: true,
    },
  });

  return NextResponse.json(stories);
}
