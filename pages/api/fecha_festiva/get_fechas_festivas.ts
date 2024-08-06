import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { cors } from "../../../lib/corsMiddleware";

async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case "GET":
      return await get(req, res);
    default:
      res.status(405).json({ error: "Método no permitido" });
      return;
  }

  async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { idUsuario,estatus } = req.query;

    const parseQueryParam = (param: string | string[] | undefined): number => {
      if (param === undefined) return NaN;
      return Array.isArray(param)
        ? parseInt(param[0], 10)
        : parseInt(param, 10);
    };

    const idUsuarioNum = parseQueryParam(idUsuario);
    const estatusNum = parseQueryParam(estatus);

    if (isNaN(idUsuarioNum)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    try {
      const inicioFinClases = await prisma.fechaFestiva.findFirst({
        where: {
          idUsuario: idUsuarioNum,
          estatus: estatusNum 
        },
        select:{
          id:true,
          fecha: true,
          actividad: true
        }
      });

      if (!inicioFinClases) {
        return res
          .status(404)
          .json({ error: "No se encontró el registro de fecha festiva" });
      }

      return res.status(200).json(inicioFinClases);
    } catch (error) {
      console.error("Error al buscar InicioFinClases:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

export default cors(main);
