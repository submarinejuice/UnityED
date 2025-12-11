import { PrismaClient } from "@prisma/client";
import { authGuard } from "@/lib/authGuard";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { ok, response, session } = await authGuard(req);
    if (!ok) return response;
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    // 1. Find the teacher profile
    const teacherProfile = await prisma.teacherProfile.findFirst({
      where: { userId: user?.id },
    });

    if (!teacherProfile) {
      return NextResponse.json(
        { message: "Teacher profile not found" },
        { status: 404 }
      );
    }
    // Fetch all schools
    const schools = await prisma.school.findMany({
      where: { id: teacherProfile.schoolId || undefined }, //  Filter by teacher's school
      orderBy: { createdAt: "desc" }, // optional sorting
    });

    return NextResponse.json(
      {
        schools,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("LIST SCHOOLS API ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
