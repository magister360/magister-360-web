import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";
import { StudentType } from "@/app/types/types";

async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case "POST":
      return await post(req, res);

    case "GET":
      return await get(req, res);

    default:
      res.status(405).json({ error: "Método no permitido" });
      return;
  }
}
async function post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { alumnos }: { alumnos: Omit<StudentType, "foto" | "regDate">[] } =
    req.body;
  const { alumnosMateria } = req.body;

  if (!alumnos || !Array.isArray(alumnos)) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const alumnosWithId = alumnos.map((alumno) => ({
    ...alumno,

    foto: Buffer.from([]), // O new Uint8Array([]) dependiendo de tu elección
    regDate: new Date(),
  }));

  try {
    const result = await prisma.$transaction(async (prismaClient) => {
      const createdAlumnos = await prismaClient.alumno.createMany({
        data: alumnosWithId,
        skipDuplicates: true,
      });

      let createdAlumnosMateria = null;
      if (
        alumnosMateria &&
        Array.isArray(alumnosMateria) &&
        alumnosMateria.length > 0
      ) {
        createdAlumnosMateria = await prismaClient.alumnoMateria.createMany({
          data: alumnosMateria,
          skipDuplicates: true,
        });
      }

      return { createdAlumnos, createdAlumnosMateria };
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Se produjo un error al procesar la solicitud." });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const {
    idUsuario,
    estatusAlta,
    estatusBaja,
    estatusCambio,
    idGrado,
    idGrupo,
  } = req.query;

  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const idUsuarioNum = parseQueryParam(idUsuario);
  const estatusAltaNum = parseQueryParam(estatusAlta);
  const estatusBajaNum = parseQueryParam(estatusBaja);
  const estatusCambioNum = parseQueryParam(estatusCambio);
  const idGradoNum = parseQueryParam(idGrado);
  const idGrupoNum = parseQueryParam(idGrupo);

  if (
    isNaN(idUsuarioNum) ||
    isNaN(estatusAltaNum) ||
    isNaN(estatusBajaNum) ||
    isNaN(estatusCambioNum) ||
    isNaN(idGradoNum) ||
    isNaN(idGrupoNum)
  ) {
    return res.status(401).json({ error: "Invalido" });
  }
  const alumnos = await prisma.alumno
    .findMany({
      where: {
        OR: [
          { estatus: estatusAltaNum },
          { estatus: estatusBajaNum },
          { estatus: estatusCambioNum },
        ],
        AND: [
          { idUsuario: idUsuarioNum },
          { idGrado: idGradoNum },
          { idGrupo: idGrupoNum },
        ],
      },
      orderBy: {
        noLista: "asc",
      },
    })
    .catch(async (e) => {
      res.status(500).json({ error: "Error de alumnos" });
    });
  const studentsWithBase64Image = (alumnos || []).map(
    (alumno: {
      foto: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>;
    }) => ({
      ...alumno,
      foto: Buffer.from(alumno.foto).toString("base64"),
    })
  );

  return res.status(200).json(studentsWithBase64Image);
}

export default cors(main);
