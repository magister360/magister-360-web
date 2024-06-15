import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function main(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    if (req.method === 'POST') {
        const { grupo, idUsuario, estatus } = req.body;
        if (idUsuario <= 0
            || !grupo
            || grupo.length < 1
            || grupo.length >= 5) {
            return res.status(401).json(null);
        }
        const response = await prisma.grupo.create({
            data: {
                grupo,
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
            const grupos = await prisma.grupo.findMany({
                where: {
                    AND: [
                        { idUsuario: idUsuarioNum },
                        { estatus: estatusNum }
                    ]
                }
            }).catch(async (e) => {
                await prisma.$disconnect()
                process.exit(1)

            });
            //   console.log(grupos);
            return res.status(200).json(grupos);
        } else {
            return res.status(401).json(null);
        }
    }
}