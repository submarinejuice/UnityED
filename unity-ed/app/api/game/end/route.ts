import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const body = await req.json();
        const { sessionId, totalScore, levelReached, rewardsEarned } = body;

        if (!sessionId) {
            return NextResponse.json(
                { error: 'Session ID is required' },
                { status: 400 }
            );
        }

        // Update game session
        const gameSession = await prisma.gameSession.update({
            where: {
                id: parseInt(sessionId),
                userId: user.id, // Ensure user owns this session
            },
            data: {
                endTime: new Date(),
                totalScore: totalScore || 0,
                levelReached: levelReached || 1,
                rewardsEarned: rewardsEarned || {},
            },
        });

        // Leaderboard logic removed


        // Update user's score if this is their highest
        const userScore = await prisma.score.findUnique({
            where: { userId: user.id },
        });

        if (userScore) {
            await prisma.score.update({
                where: { userId: user.id },
                data: {
                    totalScore: { increment: totalScore || 0 },
                    highestScore:
                        totalScore && totalScore > userScore.highestScore
                            ? totalScore
                            : undefined,
                },
            });
        }

        return NextResponse.json({
            success: true,
            session: {
                sessionId: gameSession.id,
                startTime: gameSession.startTime,
                endTime: gameSession.endTime,
                totalScore: gameSession.totalScore,
                levelReached: gameSession.levelReached,
                duration:
                    gameSession.endTime && gameSession.startTime
                        ? (gameSession.endTime.getTime() - gameSession.startTime.getTime()) /
                        1000
                        : 0,
            },
        });
    } catch (error) {
        console.error('Game end error:', error);
        return NextResponse.json(
            { error: 'Failed to end game session' },
            { status: 500 }
        );
    }
}
