import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";
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
    idGrado,
    idGrupo,
    idMateria,
  } = req.body;
  if (
    idGrado === undefined ||
    idGrado <= 0 ||
    idGrupo === undefined ||
    idGrupo <= 0 ||
    idMateria === undefined ||
    idMateria <= 0
  ) {
    return res.status(401).json({ error: "Parametros invalidos" });
  }
  const response = await prisma.materialDidactico.create({
    data: {
      id,
      tipo,
      titulo,
      descripcion,
      url,
      miniatura: Buffer.from(miniatura),
      file: Buffer.from(file),
      grado: {
        connect: { id: idGrado },
      },
      grupo: {
        connect: { id: idGrupo },
      },
      materia: {
        connect: { id: idMateria },
      },
    },
  });

  if (!response) {
    return res.status(401).json({ error: "Error al guardar" });
  } else {
    return res.status(200).json(response);
  }
}

export default cors(main);
