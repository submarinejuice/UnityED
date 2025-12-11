import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/authGuard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { ok, response } = await authGuard(req);
    if (!ok) return response;

    const body = await req.json();

    const subject = await prisma.subject.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(
      { message: "Subject created successfully", subject },
      { status: 201 }
    );
  } catch (error) {
    console.error("SUBJECT CREATE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create subject" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        teachers: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ subjects }, { status: 200 });
  } catch (error) {
    console.error("SUBJECT GET ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}
