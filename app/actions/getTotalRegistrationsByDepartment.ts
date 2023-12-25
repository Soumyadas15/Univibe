import prisma from '@/app/libs/prismadb';
import colleges from '@/public/assets/colleges.json';

export interface IParams {
    eventId?: string;
}

export default async function getTotalRegistrationsByDepartment(params: IParams) {
    try{
        const { eventId } = params;
        //@ts-ignore
        const eventIdInt = parseInt(eventId, 10);
        if (isNaN(eventIdInt)) {
            throw new Error('Invalid event ID');
        }

        const event = await prisma.event.findUnique({
            where: { id: eventIdInt },
            include: { registrations: true }
        });

        if (!event) {
            throw new Error(`Event with ID ${eventId} not found`);
        }

        const college = colleges.colleges.find(c => c.name === event.college);
        if (!college) {
            throw new Error(`College for event ID ${eventId} not found`);
        }

        const departmentRegistrations: { [key: string]: number } = {};

        for (const department of college.departments) {
            departmentRegistrations[department] = 0;
        }

        for (const registration of event.registrations) {
            if (registration.department && college.departments.includes(registration.department)) {
            if (!departmentRegistrations[registration.department]) {
                departmentRegistrations[registration.department] = 0;
            }
            departmentRegistrations[registration.department]++;
            }
        }
        console.log(departmentRegistrations)
        return departmentRegistrations;
    } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          throw new Error('Failed to fetch today\'s registrations');
        } else {
          throw new Error('An unknown error occurred');
        }
      }

    
}