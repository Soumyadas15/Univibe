import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { sendMail } from "@/app/utils/mailSender";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activationCode } = body;

    const user = await prisma.user.findFirst({
        where: {
            tokens: {
                some: {
                    activationCode,
                }
            }
        }
    })

    if (!user) {
        return NextResponse.json({ error: 'Incorrect token' }, { status: 400 });
    }

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            isVerified: true,
        }
    })

    return NextResponse.json(user);
  } catch (error) {
    console.log(error)
  } 
}
