import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";

async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Método no permitido." });
  }

  try {
    const lastLogin = await prisma.inicioSesiones.findFirst({
      orderBy: {
        fecha: "desc",
      },
      include: {
        usuario: {
          select: {
            id: true,
            foto: true,
          },
        },
      },
    });
    if (!lastLogin) {
      res.status(404).json({ error: "No se encontraron inicios de sesión" });
    }

    if (lastLogin) {
      let fotoBase64 = null;
      if (lastLogin.usuario.foto) {
        fotoBase64 = Buffer.from(lastLogin.usuario.foto).toString("base64");
      }

      res.status(200).json({
        lastLogin: {
          fecha: lastLogin.fecha,
          usuario: {
            id: lastLogin.usuario.id,
            foto: fotoBase64,
          },
        },
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default cors(main);
