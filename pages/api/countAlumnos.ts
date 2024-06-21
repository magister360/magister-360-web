import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";

async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "GET") {
    const { idUsuario, estatus, idGrado, idGrupo } = req.query;
    let idUsuarioNum = NaN;
    if (idUsuario !== undefined) {
      idUsuarioNum = Array.isArray(idUsuario)
        ? parseInt(idUsuario[0], 10)
        : parseInt(idUsuario, 10);
    }

    let estatusNum = NaN;
    if (estatus !== undefined) {
      estatusNum = Array.isArray(estatus)
        ? parseInt(estatus[0], 10)
        : parseInt(estatus, 10);
    }

    let idGradoNum = NaN;
    if (idGrado !== undefined) {
      idGradoNum = Array.isArray(idGrado)
        ? parseInt(idGrado[0], 10)
        : parseInt(idGrado, 10);
    }

    let idGrupoNum = NaN;
    if (idGrupo !== undefined) {
      idGrupoNum = Array.isArray(idGrupo)
        ? parseInt(idGrupo[0], 10)
        : parseInt(idGrupo, 10);
    }

    if (
      !isNaN(idUsuarioNum) &&
      !isNaN(estatusNum) &&
      !isNaN(idGradoNum) &&
      !isNaN(idGrupoNum)
    ) {
      const countAlumnos = await prisma.alumno
        .count({
          where: {
            AND: [
              { idUsuario: idUsuarioNum },
              { estatus: estatusNum },
              { idGrado: idGradoNum },
              { idGrupo: idGrupoNum },
            ],
          },
        })
        .catch(async (e) => {
          res.status(500).json({ error: "Error counting alumnos" });
        })
      return res.status(200).json(countAlumnos);
    } else {
      res.status(400).json({ error: "Invalid query parameters" });
    }
  }
}

export default cors(main);
