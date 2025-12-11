import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/authGuard";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth Guard
    const { ok, response } = await authGuard(req, [UserRole.ADMIN]);
    if (!ok) return response;

    // Get school ID from params
    const { id } = await params;

    // Parse body
    const body = await req.json();
    console.log(body);

    const updatedSubject = await prisma.subject.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(
      { message: "Subject updated successfully", subject: updatedSubject },
      { status: 200 }
    );
  } catch (error) {
    console.error("SCHOOL UPDATE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update school" },
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

    const { id } = await params;

    await prisma.subject.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Subject deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("SUBJECT DELETE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete subject" },
      { status: 500 }
    );
  }
}
