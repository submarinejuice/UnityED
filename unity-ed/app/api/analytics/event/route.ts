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
        const { eventType, eventData, sessionId } = body;

        if (!eventType) {
            return NextResponse.json(
                { error: 'Event type is required' },
                { status: 400 }
            );
        }

        // Create analytics event
        const event = await prisma.analyticsEvent.create({
            data: {
                userId: user.id,
                sessionId: sessionId ? parseInt(sessionId) : null,
                eventType,
                eventData: eventData || {},
                timestamp: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            event: {
                id: event.id,
                eventType: event.eventType,
                timestamp: event.timestamp,
            },
        });
    } catch (error) {
        console.error('Analytics event error:', error);
        return NextResponse.json(
            { error: 'Failed to log analytics event' },
            { status: 500 }
        );
    }
}
