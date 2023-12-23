import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


interface IParams {
  eventId?: string;
}
export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    const { eventId } = params;
    if (!eventId || typeof eventId !== 'string') {
      return new Response('Invalid ID', { status: 400 });
    }

    const eventIdNumber = parseInt(eventId, 10);
    if (isNaN(eventIdNumber)) {
      throw new Error('Invalid Event ID');
    }

    const existingLog = await prisma.clickLog.upsert({
      where: {
        userId_eventId: {
          userId: currentUser.id,
          eventId: eventIdNumber,
        },
      },
      update: {
        clickedAt: new Date(),
      },
      create: {
        userId: currentUser.id,
        eventId: eventIdNumber,
        clickedAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'Event clicked successfully', log: existingLog })

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}

