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
        const { level, xp, completedLessons } = body;

        // Get current progress
        let progress = await prisma.progress.findUnique({
            where: { userId: user.id },
        });

        if (!progress) {
            progress = await prisma.progress.create({
                data: {
                    userId: user.id,
                    level: 1,
                    xp: 0,
                    completedLessons: [],
                },
            });
        }

        // Update progress
        const updatedProgress = await prisma.progress.update({
            where: { userId: user.id },
            data: {
                level: level !== undefined ? level : undefined,
                xp: xp !== undefined ? xp : undefined,
                completedLessons:
                    completedLessons !== undefined ? completedLessons : undefined,
                lastPlayed: new Date(),
            },
        });

        // Check and award badges based on progress
        const newBadges = await checkAndAwardBadges(user.id, updatedProgress);

        return NextResponse.json({
            success: true,
            progress: {
                level: updatedProgress.level,
                xp: updatedProgress.xp,
                completedLessons: updatedProgress.completedLessons,
                currentStreak: updatedProgress.currentStreak,
                longestStreak: updatedProgress.longestStreak,
            },
            newBadges,
        });
    } catch (error) {
        console.error('Progress update error:', error);
        return NextResponse.json(
            { error: 'Failed to update progress' },
            { status: 500 }
        );
    }
}

async function checkAndAwardBadges(userId: number, progress: any) {
    const newBadges = [];

    // Check for level-based badges
    if (progress.level >= 10) {
        const badge = await prisma.badge.findUnique({
            where: { name: 'Level 10' },
        });
        if (badge) {
            const awarded = await awardBadge(userId, badge.id);
            if (awarded) newBadges.push(badge);
        }
    }

    if (progress.level >= 25) {
        const badge = await prisma.badge.findUnique({
            where: { name: 'Level 25' },
        });
        if (badge) {
            const awarded = await awardBadge(userId, badge.id);
            if (awarded) newBadges.push(badge);
        }
    }

    // Check for lesson completion badges
    const completedCount = Array.isArray(progress.completedLessons)
        ? progress.completedLessons.length
        : 0;

    if (completedCount >= 1) {
        const badge = await prisma.badge.findUnique({
            where: { name: 'First Steps' },
        });
        if (badge) {
            const awarded = await awardBadge(userId, badge.id);
            if (awarded) newBadges.push(badge);
        }
    }

    if (completedCount >= 10) {
        const badge = await prisma.badge.findUnique({
            where: { name: 'Quick Learner' },
        });
        if (badge) {
            const awarded = await awardBadge(userId, badge.id);
            if (awarded) newBadges.push(badge);
        }
    }

    if (completedCount >= 50) {
        const badge = await prisma.badge.findUnique({
            where: { name: 'Scholar' },
        });
        if (badge) {
            const awarded = await awardBadge(userId, badge.id);
            if (awarded) newBadges.push(badge);
        }
    }

    return newBadges;
}

async function awardBadge(userId: number, badgeId: number): Promise<boolean> {
    try {
        await prisma.userBadge.create({
            data: {
                userId,
                badgeId,
            },
        });
        return true;
    } catch (error) {
        // Badge already awarded or error
        return false;
    }
}
