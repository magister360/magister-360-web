import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";
async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case "PUT":
      return await put(req, res);

    default:
      res.status(405).json({ error: "Método no permitido" });
      return;
  }
}

async function put(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id, estatus } = req.body;

  if (!id) {
    return res.status(401).json({ error: "Parametros invalidos" });
  }

  try {
    const response = await prisma.periodosEvaluacion.update({
      where: { id },
      data: {
        estatus,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al actualizar" });
  }
}

export default cors(main);
