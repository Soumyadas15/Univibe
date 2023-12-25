// getRegistrations.ts
import prisma from '@/app/libs/prismadb'; // Ensure this path is correct for your prisma instance
import { endOfDay, startOfDay } from 'date-fns';
import colleges from '@/public/assets/colleges.json';

interface IParams {
    eventId?: string;
}

interface DepartmentCounts {
  [departmentName: string]: number;
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

export async function getTodayRegistrations(params: IParams) {
  try {
    const { eventId } = params;
    //@ts-ignore
    const eventIdInt = parseInt(eventId, 10);
    if (isNaN(eventIdInt)) {
      throw new Error('Invalid event ID');
    }

    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const registrations = await prisma.registration.findMany({
      where: {
        AND: [
          { eventId: eventIdInt },
          {
            createdAt: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
        ],
      },
      include: {
        user: true,
        event: true,
      },
    });

    return registrations.length;
  } catch (error) {
    
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to fetch today\'s registrations');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
function initializeDepartmentCounts() {
  const departmentCounts: DepartmentCounts = {};
  for (const college of colleges.colleges) {
    for (const department of college.departments) {
      departmentCounts[department] = 0;
    }
  }
  return departmentCounts;
}