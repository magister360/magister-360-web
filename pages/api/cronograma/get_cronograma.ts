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

  async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { idUsuario, idGrado, idGrupo, idMateria } = req.query;

    const parseQueryParam = (param: string | string[] | undefined): number => {
      if (param === undefined) return NaN;
      return Array.isArray(param)
        ? parseInt(param[0], 10)
        : parseInt(param, 10);
    };

    const idUsuarioNum = parseQueryParam(idUsuario);
    const idGradoNum = parseQueryParam(idGrado);
    const idGrupoNum = parseQueryParam(idGrupo);
    const idMateriaNum = parseQueryParam(idMateria);

    if (
      isNaN(idUsuarioNum) ||
      isNaN(idGradoNum) ||
      isNaN(idGrupoNum) ||
      isNaN(idMateriaNum)
    ) {
      return res.status(400).json({ error: "PARAMETRO INVALIDO" });
    }

    try {
      const cronograma = await prisma.cronograma.findFirst({
        where: {
          idUsuario: idUsuarioNum,
          idGrado: idGradoNum,
          idGrupo: idGrupoNum,
          idMateria: idMateriaNum
        }, 
        select:{
            id: true,
            fechaInicial: true,
            fechaFinal: true,
            contenido: true,
            estadoClase: true
        }
      });

      if (!cronograma) {
        return res
          .status(404)
          .json({ error: "No se encontró el registro de cronograma" });
      }

      return res.status(200).json(cronograma);
    } catch (error) {
      console.error("Error al buscar cronograma:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

export default cors(main);
