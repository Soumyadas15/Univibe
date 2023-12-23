// getTotalClicks.ts
import prisma from '@/app/libs/prismadb'; // Ensure this path is correct for your prisma instance
import { startOfDay, endOfDay } from 'date-fns'; 

interface IParams {
    eventId?: string;
}

export default async function getTotalClicks(params: IParams) {
  try {
    const { eventId } = params;
    //@ts-ignore
    const eventIdInt = parseInt(eventId, 10);
    if (isNaN(eventIdInt)) {
      throw new Error('Invalid event ID');
    }

    const clickCount = await prisma.clickLog.count({
      where: {
        eventId: eventIdInt,
      },
    });

    return clickCount; 
  } catch (error) {
    
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to fetch click count');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function getTodayClicks(params: IParams) {
    try {
      const { eventId } = params;
      //@ts-ignore
      const eventIdInt = parseInt(eventId, 10);
      if (isNaN(eventIdInt)) {
        throw new Error('Invalid event ID');
      }
  
      // Get today's date range
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());
  
      // Count clicks for today
      const clickCount = await prisma.clickLog.count({
        where: {
          AND: [
            { eventId: eventIdInt },
            {
              clickedAt: {
                gte: todayStart,
                lte: todayEnd,
              },
            },
          ],
        },
      });
  
      return clickCount; 
    } catch (error) {
      
      if (error instanceof Error) {
        console.error(error.message);
        throw new Error('Failed to fetch today\'s click count');
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
