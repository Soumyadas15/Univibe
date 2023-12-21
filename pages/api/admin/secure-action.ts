import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/app/libs/prismadb';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ message: 'You must be signed in.' });
  }

  const user = await prisma.user.findUnique({
    //@ts-ignore
    where: { email: session.user.email },
  });

  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: 'You do not have the necessary permissions.' });
  }

  res.status(200).json({ message: 'Action performed successfully.' });
}
