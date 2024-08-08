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
  const { idUsuario, estatus, idGrado, idGrupo, idMateria, orderStudents } =
    req.query;

  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const idUsuarioNum = parseQueryParam(idUsuario);
  const estatusNum = parseQueryParam(estatus);
  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);
  const idMateriaNum = parseQueryParam(idMateria);

  if (
    isNaN(idUsuarioNum) ||
    isNaN(estatusNum) ||
    isNaN(idGradoNum) ||
    isNaN(idGrupoNum) ||
    isNaN(idMateriaNum)
  ) {
    return res.status(401).json({ error: "Invalido" });
  }
  const sortOrder =
    orderStudents === "asc" || orderStudents === "desc"
      ? orderStudents
      : undefined;

  try {
    const alumnos = await prisma.alumno.findMany({
      where: {
        AND: [
          { idUsuario: idUsuarioNum },
          { idGrado: idGradoNum },
          { idGrupo: idGrupoNum },
          { estatus: estatusNum },
          {
            materias: {
              some: {
                idMateria: idMateriaNum,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        noLista: true,
        nombre: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
      },
      orderBy: {
        noLista: sortOrder,
      },
    });

    return res.status(200).json(alumnos);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error de alumnos" });
  }
}

export default cors(main);
