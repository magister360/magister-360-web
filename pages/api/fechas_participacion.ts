
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";
async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    switch (req.method) {
      case "GET":
        return await get(req, res);
  
      default:
        res.status(405).json({ error: "Método no permitido" });
        return;
    }
  }
export async function get(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const { idUsuario, idMateria } = req.query;
  
    const parseQueryParam = (param: string | string[] | undefined): number => {
      if (param === undefined) return NaN;
      return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
    };
  
    const idUsuarioNum = parseQueryParam(idUsuario);
    const idMateriaNum = parseQueryParam(idMateria);
  
    if (isNaN(idUsuarioNum) || isNaN(idMateriaNum)) {
      return res.status(400).json({ error: "Parámetros inválidos" });
    }
  
    try {
      const distinctDates = await prisma.participaciones.findMany({
        where: {
          idUsuario: idUsuarioNum,
          idMateria: idMateriaNum,
        },
        select: {
          fecha: true,
        },
        distinct: ['fecha'],
        orderBy: {
          fecha: 'asc',
        },
      });
  
      const formattedDates = distinctDates.map(({ fecha }) => 
        fecha.toISOString().split('T')[0]
      );
  
      return res.status(200).json(formattedDates);
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  export default cors(main);