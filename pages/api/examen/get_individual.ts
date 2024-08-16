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
    noPeriodo,
    estatus,
    idAlumno,
  } = req.query;

  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const idUsuarioNum = parseQueryParam(idUsuario);
  const idMateriaNum = parseQueryParam(idMateria);
  const estatusNum = parseQueryParam(estatus);
  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);
  const noPeriodoNum = parseQueryParam(noPeriodo);

  if (
    isNaN(idUsuarioNum) ||
    isNaN(idMateriaNum) ||
    isNaN(estatusNum) ||
    isNaN(noPeriodoNum)
  ) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  try {
    const whereClause: any = {
      idUsuario: idUsuarioNum,
      idMateria: idMateriaNum,
      estatus: estatusNum,
      idAlumno: idAlumno,
      noPeriodo: noPeriodoNum,
      alumno: {
        idGrado: idGradoNum,
        idGrupo: idGrupoNum,
      },
    };

    const examenes = await prisma.examenes.findMany({
      where: whereClause,
      select: {
        id: true,
        noPeriodo: true,
        calificacion: true,
        alumno: {
          select: {
            noLista: true,
          },
        },
      },
    });

    return res.status(200).json(examenes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default cors(main);
