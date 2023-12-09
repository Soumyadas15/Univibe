import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

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

        return Boolean(hasRegistered);;
    } catch (error) {
        if (error instanceof Error) {
            throw error; // Re-throw if it's an Error instance
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
