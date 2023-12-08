import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getLikedEvents() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        // Fetching liked events using the relation in FavoriteEvent model
        const likedEvents = await prisma.favoriteEvent.findMany({
            where: {
                userId: currentUser.id
            },
            include: {
                event: true // Includes the event data in the result
            }
        });

        // Mapping to get only event data and converting createdAt to ISO string
        const safeLikedEvents = likedEvents.map(({ event }) => ({
            ...event,
            createdAt: event.createdAt.toISOString()
        }));

        return safeLikedEvents;
    } catch (error) {
        if (error instanceof Error) {
            throw error; // Re-throw if it's an Error instance
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
