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

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { idGrado, idGrupo, idMateria, limit } = req.query;
  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);
  const idMateriaNum = parseQueryParam(idMateria);
  const limitNum = parseQueryParam(limit);

  if (
    isNaN(idGradoNum) ||
    isNaN(idGrupoNum) ||
    isNaN(idMateriaNum) ||
    isNaN(limitNum)
  ) {
    return res.status(401).json({ error: "Invalido" });
  }
  const materialDidacticos = await prisma.materialDidactico
    .findMany({
      where: {
        AND: [
          { idGrado: idGradoNum },
          { idGrupo: idGrupoNum },
          { idMateria: idMateriaNum },
        ],
      },
      take: limitNum,
    })
    .catch(async (e) => {
      res.status(500).json({ error: "Error en material didactico" });
    });

  const materialesWithBase64Image = (materialDidacticos || []).map(
    (materialDidactico: {
      miniatura: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>;
    }) => ({
      ...materialDidactico,
      miniatura: Buffer.from(materialDidactico.miniatura).toString("base64"),
    })
  );
  return res.status(200).json(materialesWithBase64Image);
}

export default cors(main);
