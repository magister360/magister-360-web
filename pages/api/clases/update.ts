import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { cors } from "../../../lib/corsMiddleware";
async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case "PUT":
      return await update(req, res);

    default:
      res.status(405).json({ error: "Método no permitido" });
      return;
  }
}

async function update(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    id,
    fechaInicial,
    fechaFinal,

  } = req.body;

  if (
    fechaInicial === undefined ||
    fechaFinal === undefined 
 
  ) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  try {
    const response = await prisma.inicioFinClases.update({
      where: { id: id },
      data: {
        fechaInicial,
        fechaFinal
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error al actualizar:", error);
    return res.status(500).json({ error: "Error al actualizar el estatus" });
  }
}

export default cors(main);
