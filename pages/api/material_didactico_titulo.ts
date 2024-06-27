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

function separateWords(texto: string | undefined): string[] {
  if (texto === undefined) {
    return [];
  }
  return texto.split(" ");
}

function getQueryParamAsString(
  param: string | string[] | undefined
): string | undefined {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param;
}

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { idGrado, idGrupo, idMateria, limit, titulo } = req.query;
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
    isNaN(limitNum) ||
    titulo === undefined ||
    titulo === ""
  ) {
    return res.status(401).json({ error: "Invalido" });
  }

  const tituloString = getQueryParamAsString(titulo);
  const arrayTitulo: string[] = separateWords(tituloString);
  const materialDidacticos = await prisma.materialDidactico
    .findMany({
      where: {
        AND: [
          { idGrado: idGradoNum },
          { idGrupo: idGrupoNum },
          { idMateria: idMateriaNum },
          ...(arrayTitulo.length > 0
            ? [
                {
                  OR: arrayTitulo.map((word) => ({
                    titulo: {
                      contains: word.toLowerCase(),
                    },
                  })),
                },
              ]
            : []),
        ],
      },
      take: limitNum,
    })
    .catch(async (e) => {
      console.log(e);
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
