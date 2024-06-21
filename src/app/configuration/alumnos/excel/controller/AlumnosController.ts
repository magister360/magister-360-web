import { StudentType, ItemAlumnoMateria, ItemMateria } from "@/app/types/types";
import { TypeIndexXlsAlumnos } from "../TypeIndexXlsAlumnos";
import { v4 as uuidv4 } from "uuid";
import {
  countsAlumnosApi,
  createAlumnosApi,
} from "../services/AlumnosServices";
import { TypeStatusAlumno } from "@/app/utils/TypeStatusAlumno";

export const createAlumnos = async (
  idUser: number,
  idGrado: number,
  idGrupo: number,
  dataAlumnos: any[][],
  materiasAsignadas: ItemMateria[]
): Promise<{ success: boolean; message: string }> => {
  const isValidCountAlumnos = await  countsAlumnosApi(idUser, 0, idGrado, idGrupo);
  if (!isValidCountAlumnos) {
    return { success: false, message: "Existen alumnos guardados" };
  }

  if (idUser <= 0 || idGrado <= 0 || idGrupo <= 0 || dataAlumnos.length == 0) {
    return { success: false, message: "Formato invalido" };
  }
  let alumnos: StudentType[] = [];

  dataAlumnos.map((item, index) => {
    const UUID = uuidv4();
    const nombre = item[TypeIndexXlsAlumnos.INDEX_NOMBRE];
    const apellidoPaterno = item[TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO];
    const noLista = item[TypeIndexXlsAlumnos.INDEX_NO_LISTA];
    const codigoBarras = item[TypeIndexXlsAlumnos.INDEX_BARCODE];

    if (
      nombre !== undefined &&
      apellidoPaterno !== undefined &&
      noLista !== undefined &&
      codigoBarras !== undefined
    ) {
      const apellidoMaterno = item[TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO];
      apellidoMaterno === undefined ? " " : apellidoMaterno;

      const newAlumno: StudentType = {
        id: UUID,
        noLista: noLista,
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        codigoBarras: codigoBarras,
        estatus:  TypeStatusAlumno.ALTA,
        foto: Buffer.from([]),
        regDate: new Date(),
        idUsuario: idUser,
        idGrado: idGrado,
        idGrupo: idGrupo,
      };
      alumnos.push(newAlumno);
    }
  });
  let alumnosMateria: ItemAlumnoMateria[] = addAlumnosAMaterias(
    materiasAsignadas,
    alumnos
  );

  const createSucces = createAlumnosApi(alumnos, alumnosMateria);
  if (!createSucces) {
    return { success: false, message: "" };
  } else {
    return { success: true, message: "" };
  }
};

function addAlumnosAMaterias(
  materiasAsignadas: ItemMateria[],
  alumnos: StudentType[]
): ItemAlumnoMateria[] {
  let alumnosMateria: ItemAlumnoMateria[] = [];

  materiasAsignadas.map((itemMateria, indexMateria) => {
    alumnos.map((item, index) => {
      const UUID = uuidv4();
      const newAlumnoMateria: ItemAlumnoMateria = {
        id: UUID,
        regDate: new Date(),
        idAlumno: item.id,
        idMateria: itemMateria.id,
      };
      alumnosMateria.push(newAlumnoMateria);
    });
  });

  return alumnosMateria;
}
