import { authGuard } from "@/lib/authGuard";
import { PrismaClient, UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { ok, response, session } = await authGuard(req, [UserRole.ADMIN]);
  if (!ok) return response;

  const schools = await prisma.school.findMany({
    include: {
      _count: {
        select: {
          students: true,
        },
      },
    },
  });
  console.log(schools);
  return NextResponse.json({
    schools,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { ok, response } = await authGuard(req);
    if (!ok) return response;

    const body = await req.json();

    const school = await prisma.school.create({
      data: {
        name: body.name,
        address: body.address,
        contactNumber: body.contactNumber,
      },
    });

    return NextResponse.json(
      { message: "School created", school },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create school" },
      { status: 500 }
    );
  }
}
