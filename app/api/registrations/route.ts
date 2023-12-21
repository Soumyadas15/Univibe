import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { sendMail } from "@/app/utils/mailSender";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new Response("User not authenticated", { status: 401 });
    }

    const body = await request.json();
    const { semester, member1, member2, member3, phone, name, eventId } = body;

    const registration = await prisma.registration.create({

        data: {
            userId: currentUser.id,
            eventId: parseInt(eventId),
            phone: phone.toString(),
            semester: semester,     
            member1: member1,      
            member2: member2,      
            member3: member3,  
        }
    });

    let userEmail: string;
    //@ts-ignore
    userEmail = currentUser?.email;
    const emailSubject = 'Thanks for registering';
    const emailText = `You have successfully registerd for the event! On the next steps, if the event is paid, you might have to verify your payment at the designated place to get access to the ticket. Otherwise you can download the tiket from the event page itself. We can't wait to see you have fun there.`
    await sendMail(emailSubject, userEmail, emailText);

    return new Response(JSON.stringify(registration), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        if (error instanceof Error) {
            console.error("Event creation error:", error.message);
            return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
        } else {
            console.error("Unexpected error:", error);
            return new Response("Internal Server Error", { status: 500 });
        }
    }
}

export async function DELETE(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new Response("User not authenticated", { status: 401 });
        }
        
        const body = await request.json();
        const { eventId, userId } = body;

        if (currentUser.id !== userId) {
            return new Response("Unauthorized", { status: 403 });
        }
        const event = await prisma.event.findUnique({
            where: {
                id: parseInt(eventId),
            },
        });
        if (!event?.cancellable){
            return new Response("Cancellation unavailable", { status: 403 });
        }

        const registration = await prisma.registration.findFirst({
            where: {
                eventId: parseInt(eventId),
                userId: parseInt(userId),
            },
        });

        if (!registration) {
            return new Response("Registration not found", { status: 404 });
        }


        await prisma.registration.delete({
            where: { id: registration.id },
        });

        return new Response("Registration cancelled successfully", { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Cancellation error:", error.message);
            return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
        } else {
            console.error("Unexpected error:", error);
            return new Response("Internal Server Error", { status: 500 });
        }
    }
}