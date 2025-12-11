import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authGuard } from "@/lib/authGuard";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { ok, response, session } = await authGuard(req);
    if (!ok) return response;

    const email = session?.user?.email;

    if (!email) {
        return NextResponse.json({ message: "User email not found" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const teacherProfile = await prisma.teacherProfile.findFirst({
        where: { userId: user.id },
    });

    if (!teacherProfile) {
        return NextResponse.json({ sessions: [] });
    }

    // 1. Get all students for this teacher
    // We need the User ID of the students to check game sessions
    const students = await prisma.student.findMany({
        where: { teacherId: teacherProfile.id },
        select: {
            userId: true,
            alias: true,
            class: {
                select: {
                    className: true,
                },
            },
            user: {
                select: {
                    name: true
                }
            }
        },
    });

    const studentUserIds = students.map((s) => s.userId);

    if (studentUserIds.length === 0) {
        return NextResponse.json({ sessions: [] });
    }

    // 2. Find active game sessions for these students
    const activeSessions = await prisma.gameSession.findMany({
        where: {
            userId: { in: studentUserIds },
            endTime: null, // Active sessions have no end time
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    student: {
                        select: {
                            class: {
                                select: { className: true }
                            },
                            alias: true
                        }
                    }
                }
            }
        },
        orderBy: {
            startTime: "desc",
        },
    });

    // 3. Format the response
    const formattedSessions = activeSessions.map((session) => {
        // Determine game name based on logic or default (schema has default deviceType, levelReached)
        const gameName = `Level ${session.levelReached ?? 1} Adventure`;

        return {
            id: session.id.toString(),
            game: gameName,
            class: session.user.student?.class.className || "Unknown Class",
            studentName: session.user.student?.alias || session.user.name || "Unknown Student",
            started: new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "Active",
        };
    });

    return NextResponse.json({ sessions: formattedSessions });
}
