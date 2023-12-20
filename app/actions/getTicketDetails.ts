import prisma from '@/app/libs/prismadb'; // Adjust this import according to your file structure

interface TicketDetails {
  userId: number;
  eventId: number;
  name?: string | null;
  member1?: string | null;
  member2?: string | null;
  member3?: string | null;
}

export async function getTicketDetails(userId: number, eventId: number): Promise<TicketDetails | null> {
  try {
    const ticket = await prisma.ticket.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      }
    });

    if (!ticket) {
      console.log(`Ticket not found for userId: ${userId} and eventId: ${eventId}`);
      return null;
    }

    return {
      userId: ticket.userId,
      eventId: ticket.eventId,
      name: ticket.name,
      member1: ticket.member1,
      member2: ticket.member2,
      member3: ticket.member3,
      
    };
  } catch (error) {
    console.error('Error retrieving ticket details:', error);
    throw error;
  }
}
