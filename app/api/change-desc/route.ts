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
        const { desc, eventId } = body;

        if (!desc || !eventId) {
            return new Response("Missing imageSrc or eventId", { status: 400 });
        }

        const event = await prisma.event.update({
            where: { id: eventId },
            data: { description: desc },
        });

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
