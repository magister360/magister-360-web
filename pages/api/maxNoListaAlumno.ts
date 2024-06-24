import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";
import { StudentType } from "@/app/types/types";

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
  const { idUsuario, estatus, idGrado, idGrupo } = req.query;

  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const idUsuarioNum = parseQueryParam(idUsuario);
  const estatusNum = parseQueryParam(estatus);

  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);

  if (
    isNaN(idUsuarioNum) ||
    isNaN(estatusNum) ||
    isNaN(idGradoNum) ||
    isNaN(idGrupoNum)
  ) {
    return res.status(401).json({ error: "Invalido" });
  }
  try {
    const result: { noLista: number }[] = await prisma.alumno.findMany({
      where: {
        AND: [
          { estatus: estatusNum },
          { idUsuario: idUsuarioNum },
          { idGrado: idGradoNum },
          { idGrupo: idGrupoNum },
        ],
      },
      orderBy: {
        noLista: "desc",
      },
      take: 1,
      select: {
        noLista: true,
      },
    });

    const maxNoLista = result.length > 0 ? result[0].noLista : null;

    return res.status(200).json({ maxNoLista: maxNoLista });

  } catch (error) {
    return res.status(500).json({ error: "Error max no lista alumno" });
  }
}

export default cors(main);
