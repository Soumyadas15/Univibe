import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const body = await request.json();
        const {
            category,
            department,
            venue,
            imageSrc,
            title,
            description,
            date,
        } = body;

        if (!category || !department || !venue || !imageSrc || !title || !description) {
            return NextResponse.error();
        }

        const event = await prisma.event.create({
            data: {
                category,
                department,
                venue,
                imageSrc,
                title,
                description,
                date,
                userId: currentUser.id,
            }
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
