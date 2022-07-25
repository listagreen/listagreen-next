import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/prisma_client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query;
  if(username) {
    const userdata = await prisma.user.findUnique({
      where: {
        username: username as string
      },
    });
    userdata ? res.status(200).json(userdata.username) : res.status(206).json(null);
  } else {
    res.status(404).json({message: "No username provided"});
  }
};
