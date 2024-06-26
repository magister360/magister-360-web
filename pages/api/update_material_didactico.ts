import { NextApiRequest, NextApiResponse } from "next";
import { cors } from "../../lib/corsMiddleware";
import { prisma } from "../../lib/prisma";

async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case "POST":
      return await post(req, res);

    default:
      res.status(405).json({ error: "Método no permitido" });
      return;
  }
}

async function post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const {
    id,
    tipo,
    url,
    titulo,
    descripcion,
    miniatura,
    file,
   
  } = req.body;
  if (
    id === undefined ||
    id <= 0 
  ) {
    return res.status(401).json({ error: "Parametros invalidos" });
  }
  const response = await prisma.materialDidactico.update({
    where: { id: id },
    data: {
      tipo,
      titulo,
      descripcion,
      url,
      miniatura: Buffer.from(miniatura),
      file: Buffer.from(file),
    },
  });

  if (!response) {
    return res.status(401).json({ error: "Error al guardar" });
  } else {
    return res.status(200).json(response);
  }
}

export default cors(main);
