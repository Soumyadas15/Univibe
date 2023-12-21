import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getAdminStatus() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        accounts: true, 
        events: true, 
        registrations: true, 
        tokens: true, 
        favoriteEvents: true, 
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser.isAdmin === true;
  } catch (error: any) {
    console.error("Error fetching admin user:", error.message);
    return null;
  }
}
