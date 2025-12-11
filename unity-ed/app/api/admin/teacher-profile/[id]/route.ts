import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/authGuard";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { ok, response } = await authGuard(req);
    if (!ok) return response;

    const { id } = await params;
    console.log(id);
    console.log("Teacher ID:", id);

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();

    const updated = await prisma.teacherProfile.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        school: {
          connect: { id: Number(body.schoolId) },
        },
        user: {
          update: {
            email: body.email,
          },
        },
      },
      include: {
        user: true,
        school: true,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
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
    console.log(id);
    console.log("Teacher ID:", id);
    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const deleted = await prisma.teacherProfile.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Teacher deleted", deleted });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
