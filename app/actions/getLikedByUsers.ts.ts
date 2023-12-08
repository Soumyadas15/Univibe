import prisma from '@/app/libs/prismadb';
import { Prisma, Event, FavoriteEvent } from '@prisma/client';

// Assuming your Prisma client is generated and available

export const getLikedByUsers = async (eventId: number): Promise<FavoriteEvent[]> => {
    try {
        const likedByUsers = await prisma.favoriteEvent.findMany({
            where: { eventId },
            include: { user: true },
        });

        return likedByUsers;
    } catch (error) {
        console.error('Error retrieving likedByUsers:', error);
        throw error;
    }
};