import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/authGuard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth Guard
    const { ok, response } = await authGuard(req);
    if (!ok) return response;

    // Get school ID from params
    const { id } = await params;

    // Parse body
    const body = await req.json();

    const updatedSchool = await prisma.school.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        address: body.address,
        contactNumber: body.contactNumber,
      },
    });

    return NextResponse.json(
      { message: "School updated successfully", school: updatedSchool },
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

    // Get school ID from params
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    //  First disconnect teachers to avoid foreign key constraint
    await prisma.teacherProfile.updateMany({
      where: { schoolId: Number(id) },
      data: { schoolId: null },
    });

    //  Now safely delete the school
    await prisma.school.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "School deleted" }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
