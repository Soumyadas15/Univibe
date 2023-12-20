import prisma from '@/app/libs/prismadb';

export interface IEventParams {
    userId?: number;
}

export default async function getBookedEvents(params: IEventParams) {
    try {
        const { userId } = params;

        if (userId === undefined) {
            throw new Error("User ID is required");
        }

        const registrations = await prisma.registration.findMany({
            where: {
                userId: userId
            },
            include: {
                event: true
            }
        });
        const registeredEvents = registrations.map(registration => {
            const { event } = registration;
            return {
                ...event,
                createdAt: event.createdAt.toISOString(),
                date: event.date.toISOString()
            };
        });

        return registeredEvents;
    } catch (error: any) {
        throw new Error(error.message || "An error occurred while fetching events.");
    }
}
