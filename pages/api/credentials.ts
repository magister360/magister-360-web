
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function main(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    if (req.method === 'POST') {
        const { user, password } = req.body;
        console.log('user ' + user + ' password ' + password)
        if (!user || !password) {
            res.status(400).json({ error: 'User and password are required.' });
            return;
        }

        const foundUser = await prisma.users.findUnique({
            where: {
                user: user
            }
        });

        // Verificar si se encontró al usuario y si la contraseña coincide
        if (!foundUser || foundUser.password !== password) {
            res.status(401).json({ error: 'Invalid username or password.' });
            return;
        }

        // Si el usuario y la contraseña son correctos, puedes responder con éxito
        res.status(200).json({ message: 'Login successful!' });
    } else {
        console.log('No detecto metodo Post user ' + user + ' password ' + password)
        res.status(405).json({ error: 'Method not allowed.' });
    }
}