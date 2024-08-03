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
async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { fecha, idMateria, estatus, idGrado, idGrupo } = req.query;
 

  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const idMateriaNum = parseQueryParam(idMateria);
  const estatusNum = parseQueryParam(estatus);
  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);

  if (
    isNaN(idMateriaNum) ||
    isNaN(estatusNum) ||
    isNaN(idGradoNum) ||
    isNaN(idGrupoNum) ||
    fecha === undefined
  ) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  const fechaStr = Array.isArray(fecha) ? fecha[0] : fecha;

  try {
    const count = await prisma.asistencias.count({
      where: {
        fecha: new Date(fechaStr),
        idMateria: idMateriaNum,
        estatus: estatusNum,
        alumno: {
          idGrado: idGradoNum,
          idGrupo: idGrupoNum,
        },
      },
    });

    return res
      .status(200)
      .json({ count, message: "Asistencias" });
  } catch (error) {
    console.error("Error al contar asistencias:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default cors(main);
