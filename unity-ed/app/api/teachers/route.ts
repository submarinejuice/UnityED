import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/authGuard";
import { UserRole } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { ok, response, session } = await authGuard(req);
    if (!ok) return response;
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    const teachers = await prisma.user.findMany({
      where: { id: Number(user?.id) },
      select: {
        id: true,
        email: true,
        _count: {
          select: {
            taughtStudents: true,
          },
        },
      },
    });

    return NextResponse.json({ teachers }, { status: 200 });
  } catch (error) {
    console.error("TEACHERS API ERROR:", error);
    return NextResponse.json(
      { message: "Failed to load teachers" },
      { status: 500 }
    );
  }
}
