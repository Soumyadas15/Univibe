import prisma from '@/app/libs/prismadb'

export default async function getEvents() {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeEvents = events.map((event) => ({
            ...event,
            createdAt: event.createdAt.toISOString(),

        }));

        return safeEvents;
    }
    catch (error: any){
        throw new Error(error);
    }
}