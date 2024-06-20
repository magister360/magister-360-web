import { ItemAlumno, ItemMateria } from "@/app/types/types";
import { TypeIndexXlsAlumnos } from "../TypeIndexXlsAlumnos";
import { v4 as uuidv4 } from "uuid";
import { createAlumnosApi } from "../services/AlumnosServices";

export const createAlumnos = async (
  idUser: number,
  idGrado: number,
  idGrupo: number,
  dataAlumnos: any[][],
  materiasAsignadas: ItemMateria[]
) => {
  if (idUser <= 0 || idGrado <= 0 || idGrupo <= 0 || dataAlumnos.length == 0) {
    return false;
  }
  let alumnos: ItemAlumno[] = [];

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

      const newAlumno: ItemAlumno = {
        id: UUID,
        noLista: noLista,
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        codigoBarras: codigoBarras,
        estatus: 0,
        foto: Buffer.from([]),
        regDate: new Date(),
        idUsuario: idUser,
        idGrado: idGrado,
        idGrupo: idGrupo,
      };
      alumnos.push(newAlumno);
    }
  });
  alumnos.map((item,index)=>{
    
  })

  return createAlumnosApi(alumnos);
};
