import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { sendMail } from "@/app/utils/mailSender";

function generateCode(): string {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
}

let userEmail: string;

const code: string = generateCode();

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    email,
    institute,
    password,
    name,
   } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    userEmail = email;

    const user = await prisma.user.create({
      data: {
        email,
        institute,
        hashedPassword,
        name,
      }
    });

    const token = await prisma.token.create({
      data: {
        activationCode: code,
        userId: user.id,
      }
    });

    const emailSubject = 'Welcome to Univibe';
    const emailText = `Hello ${name}! I'm very happy to have you onboard! 
                        Your activation code is ${code}`

    await sendMail(emailSubject, email, emailText);

    const responsePayload = {
      user: user,
      token: token,
    };
  
    return NextResponse.json(responsePayload);
}