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

        const progress = await prisma.progress.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        userBadges: {
                            include: {
                                badge: true,
                            },
                        },
                    },
                },
            },
        });

        if (!progress) {
            return NextResponse.json(
                { error: 'Progress not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            progress: {
                userId: progress.userId,
                userName: progress.user.name,
                level: progress.level,
                xp: progress.xp,
                completedLessons: progress.completedLessons,
                currentStreak: progress.currentStreak,
                longestStreak: progress.longestStreak,
                lastPlayed: progress.lastPlayed,
                badges: progress.user.userBadges.map((ub) => ({
                    id: ub.badge.id,
                    name: ub.badge.name,
                    description: ub.badge.description,
                    icon: ub.badge.icon,
                    earnedAt: ub.earnedAt,
                })),
            },
        });
    } catch (error) {
        console.error('Get progress error:', error);
        return NextResponse.json(
            { error: 'Failed to get progress' },
            { status: 500 }
        );
    }
}
