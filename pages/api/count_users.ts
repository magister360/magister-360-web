import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";

async function main(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    
    if (req.method === 'GET') {
        try {
            const userCount = await prisma.users.count();
            res.status(200).json({ count: userCount });
        } catch (e) {
            console.error('Error al contar usuarios:', e);
       
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido.' });
    }
}

export default cors(main);