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
    console.log(user);
    // Ensure only teacher sees
    // their classes
    if (session.user.role !== UserRole.TEACHER) {
      return NextResponse.json(
        { message: "Only teachers can view their classes." },
        { status: 403 }
      );
    }

    // 1️⃣ Find the teacher profile for the logged-in user
    const teacherProfile = await prisma.teacherProfile.findFirst({
      where: { userId: user?.id },
    });
    console.log("this is the teacher ", teacherProfile);
    if (!teacherProfile) {
      return NextResponse.json(
        { message: "Teacher profile not found." },
        { status: 404 }
      );
    }

    // 2️⃣ Fetch only classes belonging to this teacher
    const classes = await prisma.class.findMany({
      where: {
        teacherId: Number(user?.id),
      },
      include: {
        teacher: {
          select: {
            id: true,
            email: true,
          },
        },
        _count: {
          select: { students: true },
        },
      },
      orderBy: { id: "desc" },
    });
    console.log(classes);
    return NextResponse.json(
      {
        message: "Classes fetched successfully",
        classes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("LIST CLASSES API ERROR:", error);

    return NextResponse.json(
      { message: "Failed to load classes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { ok, response, session } = await authGuard(req);
    if (!ok) return response;
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const body = await req.json();
    const { className } = body;

    if (!className) {
      return NextResponse.json(
        { message: "className is required" },
        { status: 400 }
      );
    }

    // 1️⃣ Find the teacher profile for the logged-in user
    const teacherProfile = await prisma.teacherProfile.findFirst({
      where: { userId: user?.id },
    });
    console.log("this is the teacher ", teacherProfile);
    if (!teacherProfile) {
      return NextResponse.json(
        { message: "Teacher profile not found." },
        { status: 404 }
      );
    }

    if (!teacherProfile.schoolId) {
      return NextResponse.json(
        { message: "Teacher is not assigned to a school." },
        { status: 400 }
      );
    }

    // 2. Create class with teacherId + schoolId fetched from teacher profile
    const newClass = await prisma.class.create({
      data: {
        className,
        teacherId: user?.id,
        schoolId: teacherProfile.schoolId,
      },
    });

    return NextResponse.json(
      {
        message: "Class created successfully",
        class: newClass,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE CLASS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create class" },
      { status: 500 }
    );
  }
}
