import prisma from '@/app/libs/prismadb';
import { Event, User } from '@prisma/client'; // Assuming this import path is correct

interface IParams {
    eventId?: string;
}

export default async function getEventById(params: IParams) {
    try {
        const { eventId } = params;
        
        if (!eventId) {
            return null;
        }
        const eventIdInt = parseInt(eventId, 10); // Convert eventId to an integer

        const event = await prisma.event.findUnique({
            where: {
                id: eventIdInt
            },
            include: {
                user: true
            }
        });

        if (!event) {
            return null;
        }

        // Assuming 'event' is of type 'Event & { user: User }'
        const typedEvent = event as Event & { user: User }; // Adjust 'User' type as necessary

        return {
            ...typedEvent,
            createdAt: typedEvent.createdAt.toISOString(),
            user: {
                ...typedEvent.user,
                createdAt: typedEvent.user.createdAt.toISOString(),
                updatedAt: typedEvent.user.updatedAt.toISOString(),
                emailVerified: typedEvent.user.emailVerified?.toISOString() || null,
            }
        };
    } catch (error) {
        if (error instanceof Error) {
            throw error; // Re-throw if it's an Error instance
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
