import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function main(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    if (req.method === 'POST') {
        const { materia, idUsuario, estatus } = req.body;
        if (idUsuario <= 0
            || !materia
            || materia.length < 1
            || materia.length >= 60) {
            return res.status(401).json(null);
        }
        const response = await prisma.materia.create({
            data: {
                materia,
                estatus,
                idUsuario
            }
        });

        if (!response) {
            return res.status(401).json(null);
        } else {

            return res.status(200).json(response);
        }
    } else if (req.method === 'GET') {

        const { idUsuario } = req.query;

        let idUsuarioStr;
        if (Array.isArray(idUsuario)) {
            idUsuarioStr = idUsuario.join();
        } else {
            idUsuarioStr = String(idUsuario);
        }

        const idUsuarioNum = parseInt(idUsuarioStr, 10) || NaN;

        if (!isNaN(idUsuarioNum)) {
            const materias = await prisma.materia.findMany({
                where: {
                    idUsuario: idUsuarioNum
                }
            }).catch(async (e) => {
                await prisma.$disconnect()
                process.exit(1)

            });
            //  console.log(materias);
            return res.status(200).json(materias);
        } else {
            return res.status(401).json(null);
        }
    }
}