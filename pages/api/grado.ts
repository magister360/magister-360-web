import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function main(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    if (req.method === 'POST') {
        const { grado, idUsuario, estatus } = req.body;
        const response = await prisma.grado.create({
            data: {
                grado,
                estatus,
                idUsuario
            }
        });

        if (!response) {
            return res.status(401).json(null);
        } else {

            return res.status(200).json(response);
        }
    }
}