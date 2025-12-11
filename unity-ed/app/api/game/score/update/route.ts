import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Anti-cheat: Maximum score per second of gameplay
const MAX_SCORE_PER_SECOND = 1000;

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
        const { score, xp, coins, gems, level } = body;

        // Basic validation
        if (score === undefined || score < 0) {
            return NextResponse.json(
                { error: 'Invalid score value' },
                { status: 400 }
            );
        }

        // Get current user score
        let userScore = await prisma.score.findUnique({
            where: { userId: user.id },
        });

        // Create score record if doesn't exist
        if (!userScore) {
            userScore = await prisma.score.create({
                data: {
                    userId: user.id,
                    totalScore: 0,
                    highestScore: 0,
                    xp: 0,
                    coins: 0,
                    gems: 0,
                },
            });
        }

        // Anti-cheat validation (simple check)
        if (score > userScore.totalScore + MAX_SCORE_PER_SECOND * 60) {
            console.warn(`Suspicious score update for user ${user.id}: ${score}`);
            // You can choose to reject or flag this
            // For now, we'll allow but log it
        }

        // Update score
        const updatedScore = await prisma.score.update({
            where: { userId: user.id },
            data: {
                totalScore: score !== undefined ? score : undefined,
                highestScore:
                    score !== undefined && score > userScore.highestScore
                        ? score
                        : undefined,
                xp: xp !== undefined ? xp : undefined,
                coins: coins !== undefined ? coins : undefined,
                gems: gems !== undefined ? gems : undefined,
            },
        });

        // Update progress if level is provided
        if (level !== undefined) {
            await prisma.progress.upsert({
                where: { userId: user.id },
                update: {
                    level,
                    xp: xp !== undefined ? xp : undefined,
                },
                create: {
                    userId: user.id,
                    level,
                    xp: xp || 0,
                    completedLessons: [],
                },
            });
        }

        return NextResponse.json({
            success: true,
            score: {
                totalScore: updatedScore.totalScore,
                highestScore: updatedScore.highestScore,
                xp: updatedScore.xp,
                coins: updatedScore.coins,
                gems: updatedScore.gems,
            },
        });
    } catch (error) {
        console.error('Score update error:', error);
        return NextResponse.json(
            { error: 'Failed to update score' },
            { status: 500 }
        );
    }
}
