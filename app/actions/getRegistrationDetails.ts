import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

interface SearchParams {
    q?: string;
}

interface IParams {
    eventId?: string;
    searchParams?: SearchParams; 
}

//@ts-ignore
export async function getRegistrations(params: IParams) {
    try {

        const { eventId, searchParams } = params; 
        //@ts-ignore
        const eventIdInt = parseInt(eventId, 10);
        if (isNaN(eventIdInt)) {
            throw new Error('Invalid event ID');
        }
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        let queryConditions = {
            where: {
                eventId: eventIdInt,
                ...(searchParams?.q && {
                    member1: {
                        contains: searchParams.q,
                    },
                }),
            },
            include: {
                event: true
            }
        };

        const registrations = await prisma.registration.findMany(queryConditions);
        return registrations;
    } catch (error) {
        if (error instanceof Error) {
            throw error; 
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

//@ts-ignore
export default async function getRegistrationData(eventId) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const hasRegistered = await prisma.registration.findFirst({
            where: {
                userId: currentUser.id,
                eventId: eventId
            },
            include: {
                event: true
            }
        });

        return Boolean(hasRegistered);
    } catch (error) {
        if (error instanceof Error) {
            throw error; // Re-throw if it's an Error instance
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
