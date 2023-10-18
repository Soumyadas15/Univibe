import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { sendMail } from "@/app/utils/mailSender";

let generatedNumbers = new Set<string>();

function generateCode(): string {
    let randomNumber: number = Math.floor(Math.random() * 900000) + 100000;
    let randomString: string = randomNumber.toString();

    while (generatedNumbers.has(randomString)) {
        randomNumber = Math.floor(Math.random() * 900000) + 100000;
        randomString = randomNumber.toString();
    }

    generatedNumbers.add(randomString);

    if (generatedNumbers.size >= 900000) {
        generatedNumbers.clear();
    }
    
    return randomString;
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
    const emailText = `Hello ${name}! I'm very happy to have you onboard! Your activation code is ${code}`

    await sendMail(emailSubject, email, emailText);

    const responsePayload = {
      user: user,
      token: token,
    };
  
    return NextResponse.json(responsePayload);
}