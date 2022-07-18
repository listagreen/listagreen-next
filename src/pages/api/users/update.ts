import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma_client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //Update de dados que chegarem
    const { id, username, name, surname, main_name } = req.body;
    const update = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        profile: {
          name,
          surname,
          main_name,
        },
        state: 'ACTIVE',
      },
    });
    res.status(200).json(update);
  } else {
    res.status(200).json({ message: "No data available" });
  }
};
