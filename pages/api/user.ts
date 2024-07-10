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
  const { user, password, correo, foto, cls, estatus } = req.body;

  if (!user || !password || !cls) {
    return res.status(401).json({ error: "Parametros invalidos" });
  }
  const estatusInt = parseInt(estatus, 10); 

  try {
    const response = await prisma.users.create({
      data: {
        user,
        password,
        correo,
        foto,
        cls,
        estatus: estatusInt,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: "Error al guardar" });
  }
}

export default cors(main);
