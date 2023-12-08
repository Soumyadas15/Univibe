import prisma from '@/app/libs/prismadb';

interface IParams {
    userId?: number;  // Assuming 'id' is an integer in SQL
}

export default async function getUserById(params: IParams) {
    try {
        const { userId } = params;

        // Query the user with the given ID
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                // Including related data if needed
                accounts: true,
                events: true,
                registrations: true,
                tokens: true,
                favoriteEvents: true,
            }
        });

        if (!user) {
            return null;
        }

        return {
            ...user,
            name: user.name,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            emailVerified: user.emailVerified?.toISOString() || null,
            // Add any other fields you need to format or modify
        };
    } catch (error) {
        if (error instanceof Error) {
            throw error; // Re-throw if it's an Error instance
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
