import { StudentType } from "@/app/types/types";
import { createStudentsBarcode } from "../controller/PDFAlumnosBarcodeController";

export const StudentsBarcodeHook = (
  selectGrado: { idGrado: number; grado: string },
  selectGrupo: { idGrupo: number; grupo: string },
  students: StudentType[],
  setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  function downloadPdf(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
  async function fetchStudentsBarcode() {
    let subtitulo2 = `Grado: ${selectGrado.grado}, grupo: ${selectGrupo.grupo}`;
    const pdfBlob = await createStudentsBarcode(
      students,
      "Escuela Secundaria Técnica 58",
      200,
      "Códigos de barras",
      subtitulo2
    );
    if (pdfBlob) {
      let nameFilePdf = `codigo_barras_grado_${selectGrado.grado}_grupo_${selectGrupo.grupo}.pdf`;
      downloadPdf(pdfBlob, nameFilePdf);
    } else {
      setIsErrorModalOpen(true);
      setErrorMessage("Error al descargar el archivo PDF. ");
    }
  }

  return {
    fetchStudentsBarcode,
  };
};
