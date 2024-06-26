import { NextApiRequest, NextApiResponse } from "next";
import { cors } from "../../lib/corsMiddleware";
import { prisma } from "../../lib/prisma";

async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case "DELETE":
      return await remove(req, res);

    default:
      res.status(405).json({ error: "Método no permitido" });
      return;
  }
}

async function remove(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id } = req.body;
  if (id === undefined || id <= 0) {
    return res.status(401).json({ error: "Parametros invalidos" });
  }
  const response = await prisma.materialDidactico.delete({
    where: { id: id },
  });

  if (!response) {
    return res.status(401).json({ error: "Error al eliminar" });
  } else {
    return res.status(200).json(response);
  }
}

export default cors(main);
