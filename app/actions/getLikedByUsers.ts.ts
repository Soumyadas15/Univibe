import prisma from '@/app/libs/prismadb';
import { Prisma, Event, FavoriteEvent } from '@prisma/client';
import { endOfDay, startOfDay } from 'date-fns';

interface IParams {
    eventId?: string;
}

export const getTotalLikes = async (params: IParams): Promise<number> => {
    try {
        const { eventId } = params;
        //@ts-ignore
        const eventIdInt = parseInt(eventId, 10);
        if (isNaN(eventIdInt)) {
        throw new Error('Invalid event ID');
        }

        const totalLikes = await prisma.favoriteEvent.count({
            where: { eventId: eventIdInt },
        });

        return totalLikes;
    } catch (error) {
        console.error('Error retrieving total likes:', error);
        throw error;
    }
};

export const getTodayLikes = async (params: IParams): Promise<number> => {
    try {
        const { eventId } = params;
        //@ts-ignore
        const eventIdInt = parseInt(eventId, 10);
        if (isNaN(eventIdInt)) {
        throw new Error('Invalid event ID');
        }

        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());

        const totalLikes = await prisma.favoriteEvent.count({
            where: {
                AND: [
                  { eventId: eventIdInt },
                  {
                    createdAt: {
                      gte: todayStart,
                      lte: todayEnd,
                    },
                  },
                ],
              },
        });

        return totalLikes;
    } catch (error) {
        console.error('Error retrieving total likes:', error);
        throw error;
    }
};