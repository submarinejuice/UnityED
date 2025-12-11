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

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const body = await req.json();
        const { deviceType = 'unity' } = body;

        // Create new game session
        const gameSession = await prisma.gameSession.create({
            data: {
                userId: user.id,
                deviceType,
                startTime: new Date(),
                totalScore: 0,
                levelReached: 1,
            },
        });

        return NextResponse.json({
            success: true,
            session: {
                sessionId: gameSession.id,
                userId: user.id,
                startTime: gameSession.startTime,
                deviceType: gameSession.deviceType,
            },
        });
    } catch (error) {
        console.error('Game start error:', error);
        return NextResponse.json(
            { error: 'Failed to start game session' },
            { status: 500 }
        );
    }
}
