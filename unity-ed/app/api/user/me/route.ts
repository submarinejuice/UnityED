import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                score: true,
                progress: true,

                userBadges: {
                    include: {
                        badge: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                score: user.score
                    ? {
                        totalScore: user.score.totalScore,
                        highestScore: user.score.highestScore,
                        xp: user.score.xp,
                        coins: user.score.coins,
                        gems: user.score.gems,
                    }
                    : null,
                progress: user.progress
                    ? {
                        level: user.progress.level,
                        xp: user.progress.xp,
                        currentStreak: user.progress.currentStreak,
                        longestStreak: user.progress.longestStreak,
                        completedLessons: user.progress.completedLessons,
                    }
                    : null,

                badges: user.userBadges.map((ub) => ({
                    id: ub.badge.id,
                    name: ub.badge.name,
                    description: ub.badge.description,
                    icon: ub.badge.icon,
                    earnedAt: ub.earnedAt,
                })),
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Failed to get user data' },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
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
        const { name, avatar } = body;

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: name !== undefined ? name : undefined,
                avatar: avatar !== undefined ? avatar : undefined,
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                role: updatedUser.role,
            },
        });
    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}
