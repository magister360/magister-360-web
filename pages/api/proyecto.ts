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
    fecha,
    fechaRegistro,
    calificacion,
    contenido,
    idAlumno,
    idUsuario,
    idMateria,
  } = req.body;
  if (
    idAlumno === undefined ||
    idMateria === undefined ||
    idMateria <= 0 ||
    calificacion === undefined ||
    calificacion < 5 ||
    calificacion > 10 ||
    idUsuario === undefined ||
    idUsuario <= 0
  ) {
    return res.status(401).json({ error: "Parametros invalidos" });
  }
  const response = await prisma.proyectos
    .create({
      data: {
        id,
        fecha,
        fechaRegistro,
        calificacion,
        contenido,
        idAlumno,
        idUsuario,
        idMateria,
      },
    })
    .catch((error) => {
      return res.status(401).json({ error: "Error al guardar" });
    });

  return res.status(200).json(response);
}

export default cors(main);
