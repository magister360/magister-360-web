import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { cors } from "../../../lib/corsMiddleware";

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
  const {
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechas,
    estatus,
  } = req.query;

  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const parseDatesParam = (
    param: string | string[] | undefined
  ): Date[] => {
    if (param === undefined) return [];
    const dateStrings = Array.isArray(param) ? param : [param];
    return dateStrings.map(dateStr => new Date(dateStr));
  };

  const idUsuarioNum = parseQueryParam(idUsuario);
  const idMateriaNum = parseQueryParam(idMateria);
  const estatusNum = parseQueryParam(estatus);
  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);
  const fechasArray = parseDatesParam(fechas);

  if (isNaN(idUsuarioNum) || isNaN(idMateriaNum) || isNaN(estatusNum)) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  try {
    const whereClause: any = {
      idUsuario: idUsuarioNum,
      idMateria: idMateriaNum,
      estatus: estatusNum,
      alumno: {
        idGrado: idGradoNum,
        idGrupo: idGrupoNum,
      },
    };

    if (fechasArray.length > 0) {
      whereClause.fecha = { in: fechasArray };
    }

    const distinctDatesCount = await prisma.participaciones.groupBy({
      by: ['fecha'],
      where: whereClause,
      _count: {
        fecha: true
      },
    });

    const countDistinctDates = distinctDatesCount.length;

    return res.status(200).json(countDistinctDates);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default cors(main);