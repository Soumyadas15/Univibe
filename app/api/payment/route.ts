import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    const body = await request.json();
    const { registrationId } = body;
    console.log(registrationId)


    if (isNaN(registrationId)) {
      return new Response('Invalid Registration ID', { status: 400 });
    }
    const registration = await prisma.registration.findUnique({
      where: {
        id: registrationId,
      },
    });

    if (!registration) {
      return new Response('Registration not found', { status: 404 });
    }
    await prisma.registration.update({
      where: {
        id: registrationId,
      },
      data: {
        hasPaid: !registration.hasPaid, // Toggle the hasPaid status
      },
    });


    return new Response('Registration payment status updated successfully', { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}