import { StudentType } from "@/app/types/types";
import { createStudentsBarcodeApi } from "../services/PDFAlumnosBarcodeService";

export const createStudentsBarcode = async (
  students: StudentType[],
  titulo: string,
  barcodeWidth: number,
  subtitulo1: string,
  subtitulo2: string
) : Promise<Blob | null>=> {
   
  if (
    titulo.length === 0 ||
    subtitulo1.length === 0 ||
    subtitulo2.length === 0 ||
    students.length === 0
  ) {
    return null;
  }

  const studentsBarcode = students.map((student) => {
    return {
      noLista: student.noLista,
      nombre: student.nombre,
      apellidoPaterno: student.apellidoPaterno,
      apellidoMaterno: student.apellidoMaterno,
      codigoBarras: student.codigoBarras,
    };
  });
 

  return createStudentsBarcodeApi(
    studentsBarcode,
    titulo,
    barcodeWidth,
    subtitulo1,
    subtitulo2
  );
};
