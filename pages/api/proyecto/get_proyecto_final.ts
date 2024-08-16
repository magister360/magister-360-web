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
    rangos,
  } = req.query;

  type QueryParam = string | string[] | undefined;

  const parseQueryParam = (param: QueryParam): number => {
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

  const parseRangos = (param: string | string[] | undefined): number[] => {
    if (param === undefined) return [];
    return Array.isArray(param)
      ? param.map((p) => parseInt(p, 10))
      : [parseInt(param, 10)];
  };

  const idUsuarioNum = parseQueryParam(idUsuario);
  const idMateriaNum = parseQueryParam(idMateria);
  const estatusNum = parseQueryParam(estatus);
  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);
  const fechaInicialDate = parseDateParam(fechaInicial);
  const fechaFinalDate = parseDateParam(fechaFinal);
  const rangosArray = parseRangos(rangos);

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

    if (fechaInicialDate) {
      whereClause.fecha = { ...whereClause.fecha, gte: fechaInicialDate };
    }
    if (fechaFinalDate) {
      whereClause.fecha = { ...whereClause.fecha, lte: fechaFinalDate };
    }

    const proyectos = await prisma.proyectos.findMany({
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

    const formattedProyectos = proyectos.map(
      ({ id, fecha, calificacion, alumno }) => ({
        id,
        fecha: fecha.toISOString().split("T")[0],
        calificacion,
        noLista: alumno.noLista,
      })
    );

    const proyectosFiltradas =
      rangosArray.length > 0
        ? formattedProyectos.filter((p) =>
            rangosArray.some(
              (rango) => p.calificacion >= rango && p.calificacion < rango + 1
            )
          )
        : formattedProyectos;

    return res.status(200).json(proyectosFiltradas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default cors(main);
