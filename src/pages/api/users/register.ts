
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma_client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
        const { auth0id, email, avatar } = JSON.parse(req.body)
        console.log(auth0id, email)
        const registry = await prisma.user.create({
            data: {
              auth0id: auth0id,
              email: email,
              images: {
                avatar: avatar
              }
            },
          });
        res.status(200).json(registry)

    } else {
        res.status(200).json({ message: 'No data available' })
    }
}