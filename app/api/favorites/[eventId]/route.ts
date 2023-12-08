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
      return new Response('Invalid Event ID', { status: 400 });
    }

    // Check if the favorite event already exists
    const existingFavorite = await prisma.favoriteEvent.findUnique({
      where: {
        userId_eventId: {
          userId: currentUser.id,
          eventId: eventIdNumber,
        },
      },
    });

    if (existingFavorite) {
      // If it already exists, delete it
      await prisma.favoriteEvent.delete({
        where: {
          userId_eventId: {
            userId: currentUser.id,
            eventId: eventIdNumber,
          },
        },
      });
      return new Response('Event unfavorited successfully', { status: 200 });
    } else {
      // If it doesn't exist, create a new favorite event
      const favoriteEvent = await prisma.favoriteEvent.create({
        data: {
          userId: currentUser.id,
          eventId: eventIdNumber,
        },
      });
      return new Response(JSON.stringify({ favoriteEvent }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}


export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    const { eventId } = params;

    if (!eventId || typeof eventId !== 'string') {
      throw new Error('Invalid ID');
    }

    const eventIdNumber = parseInt(eventId, 10);
    if (isNaN(eventIdNumber)) {
      throw new Error('Invalid Event ID');
    }

    // Deleting the favorite event
    const result = await prisma.favoriteEvent.deleteMany({
      where: {
        userId: currentUser.id,
        eventId: eventIdNumber,
    },
    });

    if (result.count === 0) {
      throw new Error('No favorite event found to delete');
    }

    return NextResponse.json({ message: 'Favorite event deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
        throw error; // Re-throw if it's an Error instance
    } else {
        throw new Error('An unknown error occurred');
    }
}
}
