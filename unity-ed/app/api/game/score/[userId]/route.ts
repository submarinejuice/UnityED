import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    props: { params: Promise<{ userId: string }> }
) {
    const params = await props.params;
    try {
        const userId = parseInt(params.userId);

        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const score = await prisma.score.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!score) {
            return NextResponse.json({ error: 'Score not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            score: {
                userId: score.userId,
                userName: score.user.name,
                totalScore: score.totalScore,
                highestScore: score.highestScore,
                xp: score.xp,
                coins: score.coins,
                gems: score.gems,
                lastUpdated: score.lastUpdated,
            },
        });
    } catch (error) {
        console.error('Get score error:', error);
        return NextResponse.json(
            { error: 'Failed to get score' },
            { status: 500 }
        );
    }
}
