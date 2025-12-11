import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/authGuard";
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { ok, response, session } = await authGuard(req);
    if (!ok) return response;
    // Get logged-in teacher
    const email = session?.user?.email;
    console.log(email);
    // 1️⃣ Find teacher profile based on logged-in user's email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }
    const profiles = await prisma.teacherProfile.findMany();
    console.log("All profiles:", profiles);
    const teacher = await prisma.teacherProfile.findFirst({
      where: { userId: user.id },
    });
    console.log("TeacherProfile →", teacher);
    if (!teacher) {
      return NextResponse.json({ message: "Teacher profile not found" }, { status: 404 });
    }
    const students = await prisma.student.findMany({
      where: {
        schoolId: Number(teacher.schoolId), // 🟢 Only students from teacher's school
      },
      include: {
        class: {
          select: { id: true, className: true },
        },
        user: {
          select: { id: true, email: true },
        },
        school: {
          select: { id: true, name: true },
        },
        teacher: {
          select: { id: true, email: true },
        },
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(
      {
        message: "Students fetched successfully",
        students,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("FETCH STUDENTS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { ok, response, session } = await authGuard(req);
    if (!ok) return response;

    const body = await req.json();
    const { alias, playerId, schoolId, classId, teacherId } = body;

    // Required fields check
    if (!alias || !schoolId) {
      return NextResponse.json(
        { message: "alias and schoolId are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: playerId },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(playerId, 10);

    const newUser = await prisma.user.create({
      data: {
        email: playerId,
        password: hashedPassword,
        role: UserRole.STUDENT,
      },
    });

    const newStudent = await prisma.student.create({
      data: {
        alias,

        schoolId,
        classId,
        teacherId,
        userId: newUser.id,
      },
    });

    return NextResponse.json(
      {
        message: "Student created successfully",
        student: newStudent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
