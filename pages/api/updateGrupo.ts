import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function main(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    if (req.method === 'POST') {
        const { id, grupo } = req.body;
        if (id <= 0) {
            return res.status(401).json(null);
        }
        const response = await prisma.grupo.update({
            where: { id: id },
            data: { grupo: grupo }
        }).catch((err) => {
            console.error(err)
            return res.status(500).json(null);
        });

        if (!response) {
            return res.status(401).json(null);
        } else {

            return res.status(200).json(response);
        }
    } else {
        return res.status(401).json(null);
    }

}