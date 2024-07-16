import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";
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
  const {
    id,
    fecha,

    calificacion,
    contenido,
    idAlumno,
    idUsuario,
    idMateria,
    estatus
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
  const response = await prisma.participaciones
    .create({
      data: {
        id,
        fecha,
        
        calificacion,
        contenido,
        idAlumno,
        idUsuario,
        idMateria,
        estatus
      },
    })
    .catch((error) => {
      return res.status(401).json({ error: "Error al guardar" });
    });

  return res.status(200).json(response);
}

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { idUsuario, idMateria, codigoBarras, fecha, estatus } = req.query;

  const parseQueryParam = (param: string | string[] | undefined): number => {
    if (param === undefined) return NaN;
    return Array.isArray(param) ? parseInt(param[0], 10) : parseInt(param, 10);
  };

  const idUsuarioNum = parseQueryParam(idUsuario);
  const idMateriaNum = parseQueryParam(idMateria);
  const estatusNum = parseQueryParam(estatus);

  if (
    isNaN(idUsuarioNum) ||
    isNaN(idMateriaNum) ||
    isNaN(estatusNum) ||
    codigoBarras === undefined ||
    fecha === undefined
  ) {
    return res.status(401).json({ error: "Invalido" });
  }

  const codigoBarrasStr = Array.isArray(codigoBarras)
    ? codigoBarras[0]
    : codigoBarras;

  const fechaStr = Array.isArray(fecha) ? fecha[0] : fecha;

  try {
    const participacionResult = await prisma.participaciones.findFirst({
      where: {
        AND: [
          { alumno: { codigoBarras: codigoBarrasStr } },
          { idUsuario: idUsuarioNum },
          { fecha: fechaStr },
          { idMateria: idMateriaNum },
          { estatus: estatusNum },
        ],
      },
      select: {
        alumno: {
          select: {
            nombre: true,
            apellidoPaterno: true,
            apellidoMaterno: true,
          },
        },
      },
    });

    if (participacionResult) {
      return res.status(404).json({ error: "existe participacion" });
    }

    const alumnoResult = await prisma.alumno.findFirst({
      where: {
        codigoBarras: codigoBarrasStr,
      },
      select: {
        id: true,
        nombre: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
        noLista: true,
      },
    });

    if (alumnoResult) {
      return res.status(200).json(alumnoResult);
    }

    return res.status(404).json({ error: "No se encontraron datos" });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default cors(main);
