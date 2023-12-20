import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new Response("User not authenticated", { status: 401 });
    }

    const body = await request.json();
    const { semester, member1, member2, member3, phone, name, eventId } = body;

    const ticket = await prisma.ticket.create({
        data: {
            userId: currentUser?.id,
            name,
            eventId,
            semester,
            member1,
            member2,
            member3,
            phone,
        }
    });

    return new Response(JSON.stringify(ticket), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Ticket creation error:", error.message);
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

        // Find the registration
        const ticket = await prisma.ticket.findFirst({
            where: {
                eventId: parseInt(eventId),
                userId: parseInt(userId),
            },
        });

        if (!ticket) {
            return new Response("Ticket not found", { status: 404 });
        }

        // Delete the ticket
        await prisma.ticket.delete({
            where: { id: ticket.id },
        });

        return new Response("Ticket deleted successfully", { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Deletion error:", error.message);
            return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
        } else {
            console.error("Unexpected error:", error);
            return new Response("Internal Server Error", { status: 500 });
        }
    }
}