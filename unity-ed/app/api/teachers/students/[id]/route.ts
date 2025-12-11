import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/authGuard";
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { ok, response } = await authGuard(req);
    if (!ok) return response;

    const { id: studentId } = await params;
    const body = await req.json();

    const {
      alias,
      playerId, // NEW playerId (email)
      schoolId,
      classId,
      teacherId,
    } = body;

    // Fetch current student + user
    const existingStudent = await prisma.student.findUnique({
      where: { id: Number(studentId) },
      include: { user: true },
    });

    if (!existingStudent) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const oldPlayerId = existingStudent.user.email;

    // If playerId/email is changed → check duplicate
    if (playerId && playerId !== oldPlayerId) {
      const existingUser = await prisma.user.findUnique({
        where: { email: String(playerId) },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: "Another user already exists with this playerId/email" },
          { status: 400 }
        );
      }

      // Update user email + password
      await prisma.user.update({
        where: { id: Number(existingStudent.userId) },
        data: {
          email: playerId,
          password: await bcrypt.hash(playerId, 10),
        },
      });
    }

    // Update student table
    const updatedStudent = await prisma.student.update({
      where: { id: Number(studentId) },
      data: {
        alias,

        schoolId,
        classId,
        teacherId,
      },
    });

    return NextResponse.json(
      {
        message: "Student updated successfully",
        student: updatedStudent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE STUDENT ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update student" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { ok, response } = await authGuard(req);
    if (!ok) return response;

    const { id: studentId } = await params;

    // 1. Find student and user info
    const student = await prisma.student.findUnique({
      where: { id: Number(studentId) },
      include: { user: true },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const userId = student.userId;

    // 2. Delete student first
    await prisma.student.delete({
      where: { id: Number(studentId) },
    });

    // 3. Delete user
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "Student & User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete student" },
      { status: 500 }
    );
  }
}
