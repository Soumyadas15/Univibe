import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


interface IParams {
  eventId?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { eventId } = params;

  if (!eventId || typeof eventId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(eventId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  const event = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      likedBy: {
        push: currentUser.id,
      },
    },
  });

  return NextResponse.json({ event: event, user: user });
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { eventId } = params;

  if (!eventId || typeof eventId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== eventId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  let likedBy = [...(event?.likedBy || [])];
  likedBy = likedBy.filter((id) => id !== currentUser.id);
  
  const updatedEvent = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      likedBy,
    },
  });



  return NextResponse.json({ event: updatedEvent, user: user });
}