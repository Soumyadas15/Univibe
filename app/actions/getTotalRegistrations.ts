// getRegistrations.ts
import prisma from '@/app/libs/prismadb'; // Ensure this path is correct for your prisma instance

interface IParams {
    eventId?: string;
}

export default async function getTotalRegistrations(params: IParams) {
  try {
    const { eventId } = params;
    //@ts-ignore
    const eventIdInt = parseInt(eventId, 10);
    if (isNaN(eventIdInt)) {
      throw new Error('Invalid event ID');
    }

    
    const registrations = await prisma.registration.findMany({
      where: {
        eventId: eventIdInt,
      },
      
      include: {
        user: true,
        event: true,
      },
    });

    return registrations;
  } catch (error) {
    
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to fetch registrations');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
