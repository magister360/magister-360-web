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

        const { idUsuario, estatus } = req.query;

        let idUsuarioNum = NaN;
        if (idUsuario !== undefined) {
            idUsuarioNum = Array.isArray(idUsuario) ? parseInt(idUsuario[0], 10) : parseInt(idUsuario, 10);
        }


        let estatusNum = NaN;
        if (estatus !== undefined) {
            estatusNum = Array.isArray(estatus) ? parseInt(estatus[0], 10) : parseInt(estatus, 10);
        }

        if (!isNaN(idUsuarioNum) && !isNaN(estatusNum)) {
            const materias = await prisma.materia.findMany({
                where: {
                    AND: [
                        { idUsuario: idUsuarioNum },
                        { estatus: estatusNum }
                    ]
                }
            }).catch(async (e) => {
                console.log("Error en prisma " + e)
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