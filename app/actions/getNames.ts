import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

interface QueryParams {
    q?: string; 
    eventId?: string;
}

export const getNames = async (queryParams: QueryParams) => {

    const { q, eventId } = queryParams;
    //@ts-ignore
    const eventIdInt = parseInt(eventId, 10);
        if (isNaN(eventIdInt)) {
            throw new Error('Invalid event ID');
        }

    try{
        const users = await prisma.registration.findMany({
            where: {
                AND: [
                    { 
                        member1: {
                            contains: q
                        }
                    },
                    { 
                        eventId: eventIdInt
                    }
                ]
            },
            select: {
                member1: true,
                member2: true,
                member3: true,
                phone: true,
                semester: true,
                userId: true,
            },
        });
        console.log(users)
        return users;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error; 
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}