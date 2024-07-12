import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";

async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case "GET":
      return await get(req, res);
    default:
      res.status(405).json({ error: "Método no permitido" });
      return;
  }
}

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      select: {
        nombre: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
        foto: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const userResponse = {
      ...user,
      foto: user.foto ? Buffer.from(user.foto).toString("base64") : null,
    };

    return res.status(200).json(userResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al buscar usuario" });
  }
}

export default cors(main);
