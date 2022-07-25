
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma_client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.query
    let resData = {}
    const userdata = await prisma.user.findUnique({
        where: {
          auth0id: token,
        },
      });
    if (userdata) {
      resData = {
        userid: userdata.id,
        name: userdata.profile.name,
        username: userdata.username,
        email: userdata.email,
        avatar: userdata.images.avatar,
        state: userdata.state,
      }
    }
    res.status(200).json(resData)
}