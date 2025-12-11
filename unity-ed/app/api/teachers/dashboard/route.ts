import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/authGuard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { ok, response, session } = await authGuard(req);
    if (!ok) return response;

    // Get logged-in user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get teacher stats
    const teacherStats = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        _count: {
          select: {
            taughtStudents: true, // returns number
            classes: true, // total classes taught
          },
        },
      },
    });
    console.log(teacherStats);
    return NextResponse.json(
      {
        taughtStudents: teacherStats?._count.taughtStudents || 0,
        totalClasses: teacherStats?._count.classes || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("TEACHER DASHBOARD API ERROR:", error);
    return NextResponse.json(
      { message: "Failed to load data" },
      { status: 500 }
    );
  }
}
