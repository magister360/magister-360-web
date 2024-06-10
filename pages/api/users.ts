
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function main(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    if (req.method === 'GET') {
        const users = await prisma.users.findMany()
            .then(async () => {
                await prisma.$disconnect()
            }).catch(async (e) => {
                await prisma.$disconnect()
                process.exit(1)
            });
        res.status(200).json(users);
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}