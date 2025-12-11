import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to handle BigInt serialization
function serializeBigInt(data: any) {
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession();

        let whereClause = {};
        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email } // Assuming email is unique and available
            });
            if (user) {
                whereClause = { userId: user.id };
            }
        }

        const result = await prisma.userAssessmentResult.findFirst({
            where: whereClause,
            orderBy: {
                lastUpdatedAt: 'desc'
            }
        });

        const safeResult = serializeBigInt(result);

        return NextResponse.json(safeResult || {});
    } catch (error) {
        console.error("Error fetching assessment results:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
