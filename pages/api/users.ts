
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function main(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    console.log('Prisma +++++')
    if (req.method === 'GET') {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}