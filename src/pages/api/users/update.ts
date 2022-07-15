
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma_client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
        //Update de dados que chegarem
        const updateData = JSON.parse(req.body)
        const update = await prisma.user.update({
            where: {
                id: updateData.id
            },
            data: {
              //dados do formulario (p/ completar cadastro)
              
            },
          });
        res.status(200).json(update)

    } else {
        res.status(200).json({ message: 'No data available' })
    }
}