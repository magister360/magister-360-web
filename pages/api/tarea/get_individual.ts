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
    fechaInicial,
    fechaFinal,
    estatus,
    idAlumno
  } = req.query;

  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const parseDateParam = (
    param: string | string[] | undefined
  ): Date | null => {
    if (param === undefined) return null;
    const dateStr = Array.isArray(param) ? param[0] : param;
    return new Date(dateStr);
  };

  const idUsuarioNum = parseQueryParam(idUsuario);
  const idMateriaNum = parseQueryParam(idMateria);
  const estatusNum = parseQueryParam(estatus);
  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);
  const fechaInicialDate = parseDateParam(fechaInicial);
  const fechaFinalDate = parseDateParam(fechaFinal);

  if (isNaN(idUsuarioNum) || isNaN(idMateriaNum) || isNaN(estatusNum)) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  try {
    const whereClause: any = {
      idUsuario: idUsuarioNum,
      idMateria: idMateriaNum,
      estatus: estatusNum,
      idAlumno:idAlumno,
      alumno: {
        idGrado: idGradoNum,
        idGrupo: idGrupoNum,
      },
    };

    if (fechaInicialDate) {
      whereClause.fecha = { ...whereClause.fecha, gte: fechaInicialDate };
    }
    if (fechaFinalDate) {
      whereClause.fecha = { ...whereClause.fecha, lte: fechaFinalDate };
    }

    const tareas = await prisma.tareas.findMany({
      where: whereClause,
      select: {
        id: true,
        fecha: true,
        calificacion: true,
        alumno: {
          select: {
            noLista: true,
          },
        },
      },
      orderBy: {
        fecha: "desc",
      },
    });

    const formattedTareas = tareas.map(
      ({ id, fecha, calificacion, alumno }) => ({
        id,
        fecha: fecha.toISOString().split("T")[0],
        calificacion,
        noLista: alumno.noLista,
      })
    );

    return res.status(200).json(formattedTareas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default cors(main);
