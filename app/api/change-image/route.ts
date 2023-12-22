import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    try {
        // Authenticate the current user
        const currentUser = await getCurrentUser();

        // Check if the user is authenticated
        if (!currentUser) {
            return new Response("User not authenticated", { status: 401 });
        }
        

        // Parse the request body
        const body = await request.json();
        const { imageSrc, eventId } = body;

        // Ensure both imageSrc and eventId are provided
        if (!imageSrc || !eventId) {
            return new Response("Missing imageSrc or eventId", { status: 400 });
        }

        // Find the event by ID and update its imageSrc
        const event = await prisma.event.update({
            where: { id: eventId },
            data: { imageSrc: imageSrc },
        });

        // Return the updated event
        return new Response(JSON.stringify(event), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        if (error instanceof Error) {
            console.error("Event update error:", error.message);
            return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
        } else {
            console.error("Unexpected error:", error);
            return new Response("Internal Server Error", { status: 500 });
        }
    }
}
