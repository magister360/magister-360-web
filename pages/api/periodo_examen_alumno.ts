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
  const { idUsuario, idMateria, idAlumno, noPeriodo, estatus } = req.query;

  type QueryParam = string | string[] | undefined;
  const parseQueryParam = (param: QueryParam): string | number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? param[0] : param;
  };

  const parseQueryParamInt = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const idUsuarioNum = parseQueryParamInt(idUsuario);
  const idMateriaNum = parseQueryParamInt(idMateria);
  const idAlumnoStr = parseQueryParam(idAlumno) as string;
  const estatusNum = parseQueryParamInt(estatus);
  const noPeriodoNum = parseQueryParamInt(noPeriodo);

  if (
    isNaN(idUsuarioNum) ||
    isNaN(idMateriaNum) ||
    !idAlumnoStr ||
    isNaN(estatusNum) ||
    isNaN(noPeriodoNum)
  ) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  try {
    const whereClause: any = {
      idUsuario: idUsuarioNum,
      idMateria: idMateriaNum,
      idAlumno: idAlumnoStr,
      estatus: estatusNum,
      noPeriodo: noPeriodoNum,
    };

    const examenes = await prisma.examenes.findMany({
      where: whereClause,
      select: {
        id: true,
        noPeriodo: true,
        calificacion: true,
      },

      orderBy: {
        noPeriodo: "desc",
      },
    });

    return res.status(200).json(examenes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default cors(main);
