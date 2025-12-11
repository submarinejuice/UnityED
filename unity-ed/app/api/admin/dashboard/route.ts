import { authGuard } from "@/lib/authGuard";
import { PrismaClient, UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { ok, response, session } = await authGuard(req, [UserRole.ADMIN]);
  if (!ok) return response;

  const totalSchools = await prisma.school.count();
  const totalTeachers = await prisma.user.count({
    where: { role: UserRole.TEACHER },
  });
  const totalClasses = await prisma.class.count();

  const recentSchools = await prisma.school.findMany({
    where: {},
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  // Extract the user name from the session
  const name = session?.user?.email || "Admin";
  console.log(name);
  return NextResponse.json({
    totalSchools,
    totalTeachers,
    totalClasses,
    recentSchools,
    name,
  });
}
