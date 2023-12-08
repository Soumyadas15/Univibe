import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    // Prisma's query for finding a unique record
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        accounts: true, // Include related accounts
        events: true, // Include related events
        registrations: true, // Include related registrations
        tokens: true, // Include related tokens
        favoriteEvents: true, // Include related favorite events
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: 
        currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    console.error("Error fetching current user:", error.message);
    return null;
  }
}
