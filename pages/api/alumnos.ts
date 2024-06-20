import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/corsMiddleware";
import { ItemAlumno } from "@/app/types/types";

async function main(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { alumnos }: { alumnos: Omit<ItemAlumno, "foto" | "regDate">[] } =
    req.body;

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
    const result = await prisma.alumno.createMany({
      data: alumnosWithId,
      skipDuplicates: true,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(null);
  } finally {
    await prisma.$disconnect();
  }
}

export default cors(main);

