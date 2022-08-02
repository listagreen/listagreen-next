import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma_client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { companyName, fieldOfWork, members, category, info, contact } =
      JSON.parse(req.body);
    const registry = await prisma.companyData.create({
      data: {
        companyName,
        members,
        companyProfile: {
          category,
          info,
          contact,
          fieldOfWork,
        },
      },
    });
    res.status(200).json(registry);
  } else {
    res.status(200).json({ message: "No data available" });
  }
};
