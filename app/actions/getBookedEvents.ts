import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getBookedEvents() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const bookedEvents = await prisma.registration.findMany({
            where: {
                userId: currentUser.id
            },
            include: {
                event: true
            }
        });

        const safebookedEvents = bookedEvents.map(({ event }) => ({
            ...event,
            createdAt: event.createdAt.toISOString()
        }));

        return safebookedEvents;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
