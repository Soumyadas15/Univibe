import prisma from '@/app/libs/prismadb';

interface IParams {
    eventId?: string;
}

export default async function getEventById (
    params: IParams
) {
    try {
        const { eventId } = params;

        const event = await prisma.event.findUnique({
            where: {
                id: eventId
            },
            include: {
                user: true
            }
        });

        if (!event){
            return null;
        }

        return {
            ... event,
            createdAt: event.createdAt.toISOString(),
            user: {
                ... event.user,
                createdAt: event.user.createdAt.toISOString(),
                updatedAt: event.user.updatedAt.toISOString(),
                emailVerified: event.user.emailVerified?.toISOString() || null,
            }
        };
    } catch(error: any){
        throw new Error(error);
    }
}