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
  const { idUsuario, idMateria, idAlumno } = req.query;

  const parseQueryParam = (param: string | string[] | undefined): string | number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? param[0] : param;
  };

  const idUsuarioNum = parseInt(parseQueryParam(idUsuario) as string, 10);
  const idMateriaNum = parseInt(parseQueryParam(idMateria) as string, 10);
  const idAlumnoStr = parseQueryParam(idAlumno) as string;

  if (isNaN(idUsuarioNum) || isNaN(idMateriaNum) || !idAlumnoStr) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  try {
    const participaciones = await prisma.participaciones.findMany({
      where: {
        idUsuario: idUsuarioNum,
        idMateria: idMateriaNum,
        idAlumno: idAlumnoStr,
      },
      select: {
        fecha: true,
        id: true,
        calificacion: true,
      },
      orderBy: {
        fecha: 'asc',
      },
    });

    const formattedParticipaciones = participaciones.map(({ fecha, id, calificacion }) => ({
      fecha: fecha.toISOString().split('T')[0],
      id,
      calificacion,
    }));

    return res.status(200).json(formattedParticipaciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default cors(main);