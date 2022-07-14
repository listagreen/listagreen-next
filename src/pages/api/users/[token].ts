
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma_client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.query
    const userdata = await prisma.user.findUnique({
        where: {
          auth0id: token,
        },
      });
    res.status(200).json(userdata)
}