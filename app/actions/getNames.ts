import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

interface QueryParams {
    q?: string; 
    eventId?: string;
}

export const getNames = async (queryParams: QueryParams) => {

    const { q, eventId } = queryParams;
    //@ts-ignore
    const eventIdInt = parseInt(eventId, 10);
    
    if (isNaN(eventIdInt)) {
        throw new Error('Invalid event ID');
    }

    try {
        const registrations = await prisma.registration.findMany({
            where: {
                AND: [
                    { member1: { contains: q } },
                    { eventId: eventIdInt }
                ]
            },
            include: {
                event: {
                    select: {
                        id: true,
                        title: true,
                        // ... include other fields required for SafeEvent
                        createdAt: true // Ensure this is formatted as a string
                    }
                }
            }
        });

        // Transform the data to match SafeRegistration type
        return registrations.map(reg => ({
            ...reg,
            createdAt: reg.createdAt.toISOString(), // Format createdAt as a string
            event: {
                ...reg.event,
                createdAt: reg.event.createdAt.toISOString() // Format event's createdAt as a string
            }
        }));
    } catch (error) {
        if (error instanceof Error) {
            throw error; 
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}