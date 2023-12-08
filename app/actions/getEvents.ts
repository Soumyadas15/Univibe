import prisma from '@/app/libs/prismadb';

export interface IEventParams {
    userId?: number;
}

export default async function getEvents(params: IEventParams) {
    try {
        const { userId } = params;

        let query: any = {};

        if (userId !== undefined) {
            query.userId = userId;
        }
        const events = await prisma.event.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeEvents = events.map((event) => ({
            ...event,
            createdAt: event.createdAt.toISOString(),
        }));

        return safeEvents;
    } catch (error: any) {
        throw new Error(error);
    }
}