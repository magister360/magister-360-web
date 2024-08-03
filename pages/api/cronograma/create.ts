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

  async function post(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const {
      id,
      fechaInicial,
      fechaFinal,
      contenido,
      idUsuario,
      idGrado,
      idGrupo,
      idMateria,
    } = req.body;
    if (
      fechaInicial === undefined ||
      fechaFinal === undefined ||
      idUsuario === undefined
    ) {
      return res.status(401).json({ error: "Parametros invalidos" });
    }
    const response = await prisma.cronograma
      .create({
        data: {
          id,
          fechaInicial,
          fechaFinal,
          contenido,
          idUsuario,
          idGrado,
          idGrupo,
          idMateria,
        },
      })
      .catch((error) => {
        return res.status(401).json({ error: "Error al guardar" });
      });

    return res.status(200).json(response);
  }
}
export default cors(main);
