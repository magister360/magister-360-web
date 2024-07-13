import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";
async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case "POST":
      return await post(req, res);
    case "GET":
      return await get(req, res);
    case "PUT":
      return await put(req, res);

    default:
      res.status(405).json({ error: "Método no permitido" });
      return;
  }
}

async function post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const {
    id,
    json,
    puntosExtra,
    estatus,
    idUsuario,
    idGrado,
    idGrupo,
    idMateria,
  } = req.body;

  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const idUsuarioNum = parseQueryParam(idUsuario);
  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);
  const idMateriaNum = parseQueryParam(idMateria);
  const estatusNum = parseQueryParam(estatus);

  if (
    json === undefined ||
    puntosExtra === undefined ||
    isNaN(idUsuarioNum) ||
    idUsuarioNum <= 0 ||
    isNaN(idGradoNum) ||
    idGradoNum <= 0 ||
    isNaN(idGrupoNum) ||
    idGrupoNum <= 0 ||
    isNaN(idMateriaNum) ||
    idMateriaNum <= 0
  ) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  try {
    const response = await prisma.encuadreCalificacion.create({
      data: {
        id,
        json,
        puntosExtra,
        estatus: isNaN(estatusNum) ? 0 : estatusNum,
        idUsuario: idUsuarioNum,
        idGrado: idGradoNum,
        idGrupo: idGrupoNum,
        idMateria: idMateriaNum,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al guardar" });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { idGrado, idGrupo, idMateria, idUsuario } = req.query;

  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);
  const idMateriaNum = parseQueryParam(idMateria);
  const idUsuarioNum = parseQueryParam(idUsuario);

  if (
    isNaN(idGradoNum) ||
    isNaN(idGrupoNum) ||
    isNaN(idMateriaNum) ||
    isNaN(idUsuarioNum)
  ) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  try {
    const encuadreCalificacion = await prisma.encuadreCalificacion.findFirst({
      where: {
        AND: [
          { idGrado: idGradoNum },
          { idGrupo: idGrupoNum },
          { idMateria: idMateriaNum },
          { idUsuario: idUsuarioNum },
        ],
      },
    });

    if (encuadreCalificacion) {
      return res.status(200).json(encuadreCalificacion);
    }

    return res
      .status(404)
      .json({ error: "No se encontró el encuadre de calificación" });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function put(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id, json, puntosExtra } = req.body;

  if (id === undefined || json === undefined || puntosExtra === undefined) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  try {
    const response = await prisma.encuadreCalificacion.update({
      where: { id: id },
      data: {
        json,
        puntosExtra,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar" });
  }
}

export default cors(main);
