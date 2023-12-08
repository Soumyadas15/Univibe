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
        const { category, department, venue, college, imageSrc, team, memberCount, title, description, date } = body;

        // Validate required fields
        if (!title || !description || !date || !category || !department || !venue || !imageSrc) {
            return new Response("Missing required fields", { status: 400 });
        }

        // Create the event
        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date), // Ensure proper date format
                category,
                department,
                venue,
                college: college || currentUser.institute, // Use provided college or fallback to user's institute
                imageSrc,
                team: team || false, // Default to false if not provided
                memberCount,
                userId: currentUser.id,
            }
        });

        return new Response(JSON.stringify(event), { status: 200, headers: { 'Content-Type': 'application/json' } });
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
