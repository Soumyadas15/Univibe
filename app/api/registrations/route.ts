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
