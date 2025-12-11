import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/authGuard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { ok, response } = await authGuard(req);
    if (!ok) return response;

    const { id: classId } = await params;

    const body = await req.json();

    const updated = await prisma.class.update({
      where: { id: Number(classId) },
      data: {
        className: body.className,
        teacherId: body.teacherId,
        schoolId: body.schoolId,
      },
    });

    return NextResponse.json(
      { message: "Class updated successfully", class: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update class" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { ok, response, session } = await authGuard(req);
    if (!ok) return response;

    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    // Find teacher profile
    const teacherProfile = await prisma.teacherProfile.findFirst({
      where: { userId: user?.id },
    });

    if (!teacherProfile) {
      return NextResponse.json(
        { message: "Teacher profile not found." },
        { status: 404 }
      );
    }
    await prisma.class.deleteMany({
      where: {
        className: String(id),
        teacherId: Number(user?.id),
      },
    });

    return NextResponse.json(
      { message: "Class deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE CLASS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete class" },
      { status: 500 }
    );
  }
}
