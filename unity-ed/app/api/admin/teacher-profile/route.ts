import { NextResponse, NextRequest } from "next/server";
import { authGuard } from "@/lib/authGuard";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

// ============================
// GET ALL TEACHERS
// ============================
export async function GET(req: NextRequest) {
  const { ok, response } = await authGuard(req);
  if (!ok) return response;

  const teachers = await prisma.teacherProfile.findMany({
    include: {
      user: {
        select: { email: true, role: true },
      },
      school: true, // subject removed as requested
    },
  });

  return NextResponse.json({ teachers }, { status: 200 });
}

// ============================
// CREATE NEW TEACHER
// ============================
export async function POST(req: NextRequest) {
  try {
    const { ok, response } = await authGuard(req);
    if (!ok) return response;

    const body = await req.json();
    const { name, email, password, schoolId } = body;

    if (!name || !email || !password || !schoolId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // store hashed password
        role: "TEACHER",
      },
    });

    // Create Teacher Profile
    const teacher = await prisma.teacherProfile.create({
      data: {
        name,
        schoolId: Number(schoolId), // <-- FIX
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Teacher created successfully", teacher },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating teacher:", err);
    return NextResponse.json(
      { message: "Failed to create teacher" },
      { status: 500 }
    );
  }
}
