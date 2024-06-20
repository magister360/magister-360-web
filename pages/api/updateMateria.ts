import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";

async function main(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    if (req.method === 'POST') {
        const { id, materia } = req.body;
        if (id <= 0) {
            return res.status(401).json(null);
        }
        const response = await prisma.materia.update({
            where: { id: id },
            data: { materia: materia }
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

export default cors(main);