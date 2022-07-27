
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
    if (userdata != undefined) {
      resData = {
        userid: userdata?.id,
        name: userdata?.profile?.name,
        avatar: userdata?.images?.avatar,      
        username: userdata?.username,
        email: userdata?.email,
        state: userdata?.state,
        permissions: userdata?.permissions,
      }
    }
    res.status(200).json(resData)
  }