import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getDayName(date: Date) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userId = user.id;

        // 1. SKILLS DATA (from UserAssessmentResult)
        const assessment = await prisma.userAssessmentResult.findFirst({
            where: { userId },
            orderBy: { lastUpdatedAt: "desc" },
        });

        const skillsData = [
            { skill: "Awareness", level: assessment?.awarenessSensitivity || 0 },
            { skill: "Empathy", level: assessment?.empathyAndSupport || 0 },
            { skill: "Safety", level: assessment?.safeResponseCapability || 0 },
            { skill: "Courage", level: assessment?.moralCourage || 0 },
            { skill: "Conflict", level: assessment?.conflictEscalationRisk || 0 }, // Maybe invert this one?
        ];

        // 2. ACTIVITY DATA (from GameSession)
        // Get sessions from last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentSessions = await prisma.gameSession.findMany({
            where: {
                userId,
                startTime: { gte: sevenDaysAgo },
            },
        });

        // Group by day of week
        const activityMap: Record<string, number> = {};
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        // Initialize
        days.forEach(d => activityMap[d] = 0);

        recentSessions.forEach((session) => {
            const day = getDayName(session.startTime); // e.g. "Mon"
            let durationMinutes = 0;
            if (session.endTime && session.startTime) {
                durationMinutes = (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60);
            }
            if (activityMap[day] !== undefined) {
                activityMap[day] += Math.round(durationMinutes);
            }
        });

        // Reorder to show Mon -> Sun or just present data
        const activityData = Object.entries(activityMap).map(([day, minutes]) => ({
            day,
            minutes,
        }));

        // Sort activityData roughly to be Mon-Sun or just whatever
        const sorter: Record<string, number> = { "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6, "Sun": 7 };
        activityData.sort((a, b) => sorter[a.day] - sorter[b.day]);


        // 3. PROGRESS DATA (Score over time)
        // Get last 6 game sessions with scores
        const sessionsWithScore = await prisma.gameSession.findMany({
            where: { userId, totalScore: { not: null } },
            orderBy: { startTime: "asc" },
            take: 6, // Just last 6 sessions as points
        });

        const progressData = sessionsWithScore.map((s, index) => ({
            week: `Session ${index + 1}`, // Labeling as Session X for simplicity
            score: s.totalScore || 0,
        }));

        // 4. METRICS
        const totalScore = assessment?.totalScore || 0;

        const timePlayedMinutes = await prisma.gameSession.findMany({
            where: { userId },
            select: { startTime: true, endTime: true }
        }).then(sessions => {
            return sessions.reduce((acc, s) => {
                if (s.endTime && s.startTime) {
                    return acc + (s.endTime.getTime() - s.startTime.getTime()) / (1000 * 60);
                }
                return acc;
            }, 0);
        });

        const totalHours = (timePlayedMinutes / 60).toFixed(1);

        const completedMissions = await prisma.progress.findUnique({
            where: { userId },
            select: { completedLessons: true }
        });
        // Check if completedLessons is an array or object
        const missionsCount = Array.isArray(completedMissions?.completedLessons)
            ? completedMissions.completedLessons.length
            : 0;

        const streak = await prisma.progress.findUnique({
            where: { userId },
            select: { currentStreak: true }
        });


        return NextResponse.json({
            skillsData,
            activityData,
            progressData,
            metrics: {
                totalScore,
                timePlayed: `${totalHours}h`,
                missions: `${missionsCount}`,
                streak: `${streak?.currentStreak || 0} days`
            }
        });

    } catch (error) {
        console.error("INSIGHTS API ERROR:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
