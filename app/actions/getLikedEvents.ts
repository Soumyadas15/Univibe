import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getLikedEvents() {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser){
            return [];
        }

    
    const likes = await prisma.event.findMany({
        where: {
            id: {
                in: [ ... (currentUser.favoriteIds || [])]
            }
        }
    });
    const safeLikes = likes.map((like) => ({
        ... like,
        createdAt: like.createdAt.toISOString()
    }));

    return safeLikes;
    } catch(error: any){
        throw new Error(error);
    }
}