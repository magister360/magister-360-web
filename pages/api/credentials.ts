
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { ResponseCredentials } from "@/app/login/services/ResponseCredentials";

export default async function main(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    if (req.method === 'POST') {
        const { userName } = req.body;
        const user = await prisma.users.findFirst({
            where: {
                user: {
                    contains: String(userName)
                }
            }
        });

        if (!user) {
            return res.status(401).json(null);
        } else {
            const responseCreddentials = new ResponseCredentials(
                user.id,
                user.password == null ? '' : user.password,
                user.user == null ? '' : user.user);
            // console.log('responseCreddentials ' + responseCreddentials.toString())
            return res.status(200).json(responseCreddentials.toString());
        }
    }

    if (req.method === 'GET') {
        console.log('req ')
        const { userName } = req.query;
        console.log('req.bodyuser ' + userName)
        const users = await prisma.users.findMany({
            where: {
                user: {
                    contains: String(userName)
                }
            }
        })
            .catch(async (e) => {
                await prisma.$disconnect()
                process.exit(1)
            });

        res.status(200).json(users);
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}