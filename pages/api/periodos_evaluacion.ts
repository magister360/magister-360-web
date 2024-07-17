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
    noPeriodo,
    fechaInicial,
    fechaFinal,
    actividad,
    estatus,
    idUsuario,
  } = req.body;
  if (
    actividad === undefined ||
    noPeriodo <= 0 ||
    idUsuario === undefined ||
    idUsuario <= 0
  ) {
    return res.status(401).json({ error: "Parametros invalidos" });
  }
  const response = await prisma.periodosEvaluacion
    .create({
      data: {
        id,
        noPeriodo,
        fechaInicial,
        fechaFinal,
        actividad,
        estatus,
        idUsuario,
      },
    })
    .catch((error) => {
      console.log(error);

      return res.status(401).json({ error: "Error al guardar " });
    });

  return res.status(200).json(response);
}

async function put(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id, fechaInicial, fechaFinal } = req.body;

  if (!id || !fechaInicial || !fechaFinal) {
    return res.status(401).json({ error: "Parametros invalidos" });
  }

  try {
    const response = await prisma.periodosEvaluacion.update({
      where: { id },
      data: {
        fechaInicial,
        fechaFinal,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al actualizar" });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { idUsuario, estatus } = req.query;

  if (!idUsuario || typeof idUsuario !== "string") {
    return res.status(400).json({ error: "idUsuario inválido" });
  }
  if (!estatus || typeof estatus !== "string") {
    return res.status(400).json({ error: "estatus inválido" });
  }

  const idUsuarioInt = parseInt(idUsuario, 10);
  const estatusInt = parseInt(estatus, 10);

  if (isNaN(idUsuarioInt) || isNaN(estatusInt)) {
    return res
      .status(400)
      .json({ error: "idUsuario o estatus no son números válidos" });
  }

  try {
    const periodos = await prisma.periodosEvaluacion.findMany({
      where: {
        idUsuario: idUsuarioInt,
        estatus: estatusInt,
      },
      orderBy: {
        noPeriodo: "asc",
      },
    });

    return res.status(200).json(periodos);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener los periodos de evaluación" });
  }
}

export default cors(main);
