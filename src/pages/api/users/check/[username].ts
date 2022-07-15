
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../prisma/prisma_client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username } = req.query
    const userdata = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
    res.status(200).json(userdata)
}