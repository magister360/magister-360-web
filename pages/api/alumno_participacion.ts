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
  const { idUsuario, estatus, idGrado, idGrupo, busqueda, idMateria } =
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
    return res.status(401).json({ error: "Parámetros inválidos" });
  }

  try {
    let busquedaCondition: any = {};

    if (busqueda) {
      const palabras = (busqueda as string)
        .split(" ")
        .filter((word) => word.trim() !== "");

      if (
        palabras.length === 1 &&
        palabras[0].length < 2 &&
        !isNaN(parseInt(palabras[0]))
      ) {
        busquedaCondition = {
          noLista: { equals: parseInt(palabras[0], 10) },
        };
      } else {
        busquedaCondition = {
          OR: [
            { codigoBarras: { contains: palabras[0] } },
            { nombre: { contains: palabras[0] } },
            { apellidoPaterno: { contains: palabras[0] } },
            { apellidoMaterno: { contains: palabras[0] } },
            { noLista: { equals: parseInt(palabras[0], 10) || undefined } },
          ],
        };

        if (palabras.length === 2) {
          busquedaCondition.OR.push({
            AND: [
              { nombre: { contains: palabras[0] } },
              { apellidoPaterno: { contains: palabras[1] } },
            ],
          });
        } else if (palabras.length === 3) {
          busquedaCondition.OR.push({
            AND: [
              { nombre: { contains: palabras[0] } },
              { apellidoPaterno: { contains: palabras[1] } },
              { apellidoMaterno: { contains: palabras[2] } },
            ],
          });
        } else if (palabras.length >= 4) {
          busquedaCondition = {
            AND: [
              { nombre: { contains: `${palabras[0]} ${palabras[1]}` } },
              { apellidoPaterno: { contains: palabras[2] } },
              { apellidoMaterno: { contains: palabras[3] } },
            ],
          };
        }
      }
    }

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
          busquedaCondition,
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
        apellidoPaterno: "asc",
      },
    });

    return res.status(200).json(alumnos);
  } catch (error) {
    console.error("Error al buscar alumnos:", error);
    return res.status(500).json({ error: "Error al buscar alumnos" });
  }
}

export default cors(main);
