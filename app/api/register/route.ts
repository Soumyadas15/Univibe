import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import prisma from "@/app/libs/prismadb";
import { sendMail } from "@/app/utils/mailSender";


async function generateCode(): Promise<string> {
  const randomBytes = crypto.randomBytes(3);
  const randomString = randomBytes.toString("hex");
  return randomString.substring(0, 6).toUpperCase();
}

let userEmail: string;

const code = await (async () => {
  return await generateCode();
})();

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