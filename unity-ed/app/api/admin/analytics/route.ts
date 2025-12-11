import { NextResponse } from "next/server";
import { PrismaClient, UserRole } from "@prisma/client";
import { authGuard } from "@/lib/authGuard";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { ok, response } = await authGuard(req as any, [UserRole.ADMIN]);
    if (!ok) return response;

    try {
        // 1. KPIs
        const totalSchools = await prisma.school.count();
        const totalTeachers = await prisma.user.count({
            where: { role: UserRole.TEACHER },
        });
        const totalStudents = await prisma.student.count();

        // 2. Top Schools (by student count)
        // Prisma doesn't support complex aggregations easily in one go for "top 3 schools by student count" without raw query or separate logic
        // We'll simplistic approach: fetch all schools with select _count
const schools = await prisma.school.findMany({
  select: {
    id: true,
    name: true,
    students: {
      select: { id: true }, // just fetch IDs to count
    },
  },
});

// Compute count manually
const schoolsWithCounts = schools.map(s => ({
  id: s.id,
  name: s.name,
  studentCount: s.students.length, // count students manually
}));

        const topSchools = schoolsWithCounts
            .map((s) => ({
                name: s.name,
                count: s.studentCount,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .map((s, index) => ({
                rank: index + 1,
                name: s.name,
                metric: `${s.count} Students`,
                detail: "Total Enrollment",
                color: index === 0 ? "bg-amber-500" : index === 1 ? "bg-slate-400" : "bg-orange-400",
            }));

        // 3. System Activity (Recent Users)
        const recentUsers = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        const systemActivity = recentUsers.map((u) => ({
            time: new Date(u.createdAt).toLocaleDateString(),
            action: `New ${u.role.toLowerCase()} joined`,
            name: u.name || u.email,
            color: "text-green-600",
        }));

        return NextResponse.json({
            kpis: {
                totalSchools,
                totalTeachers,
                totalStudents,
            },
            topSchools,
            systemActivity,
        });
    } catch (error) {
        console.error("ADMIN ANALYTICS ERROR:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
