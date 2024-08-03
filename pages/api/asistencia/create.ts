import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { cors } from "../../../lib/corsMiddleware";

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
  const { asistencias } = req.body;

  if (!Array.isArray(asistencias) || asistencias.length === 0) {
    return res.status(400).json({ error: "Datos de asistencias inválidos" });
  }

  try {
    const response = await prisma.asistencias.createMany({
      data: asistencias.map((asistencia) => ({
        id: asistencia.id,
        fecha: new Date(asistencia.fecha),

        asistencia: asistencia.asistencia,
        idAlumno: asistencia.idAlumno,
        idUsuario: asistencia.idUsuario,
        idMateria: asistencia.idMateria,
        estatus: asistencia.estatus,
      })),
    });

    return res.status(200).json({
      message: "Asistencias guardadas correctamente",
      count: response.count,
    });
  } catch (error) {
    console.error("Error al guardar las asistencias:", error);
    return res.status(500).json({ error: "Error al guardar las asistencias" });
  }
}

export default cors(main);
