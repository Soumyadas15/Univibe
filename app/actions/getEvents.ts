import prisma from '@/app/libs/prismadb'

export default async function getEvents() {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return events;
    }
    catch (error: any){
        throw new Error(error);
    }
}