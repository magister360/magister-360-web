import { ItemGrado, StudentType } from "@/app/types/types";
import { TypeStatusAlumno } from "@/app/utils/TypeStatusAlumno";
import { useEffect, useState } from "react";

import { loadSessionFromLocalStorage } from "@/app/sesions/SesionCookies";
import { getAlumnos } from "../controller/AlumnosController";
import { createStudentsBarcode } from "../controller/PDFAlumnosBarcodeController";

export const AlumnosFunctionsHook = (
  itemsGrados: ItemGrado[],
  filterIndexGrado: Function,
  itemsGrupos: ItemGrado[],
  filterIndexGrupo: Function,
  setStudents: Function,
  selectGrado: { idGrado: number; grado: string },
  setSelectGrado: React.Dispatch<
    React.SetStateAction<{ idGrado: number; grado: string }>
  >,
  selectGrupo: { idGrupo: number; grupo: string },
  setSelectGrupo: React.Dispatch<
    React.SetStateAction<{ idGrupo: number; grupo: string }>
  >,
  students: StudentType[]
) => {
  const isArrayEmpty = (array: any[]) => {
    return array.length === 0;
  };
  const handleChangeGrado = (event: { target: { selectedIndex: any } }) => {
    const selectedIndex = event.target.selectedIndex;
    console.log("Selected Index:", selectedIndex);
    if (!isArrayEmpty(itemsGrados)) {
      const itemFilter = filterIndexGrado({ itemsGrados }, selectedIndex);
      if (itemFilter) {
        setSelectGrado({
          idGrado: itemFilter.id,
          grado: itemFilter.grado,
        });
      }
    }
  };

  const handleChangeGrupo = (event: { target: { selectedIndex: any } }) => {
    const selectedIndex = event.target.selectedIndex;

    if (!isArrayEmpty(itemsGrupos)) {
      const itemFilter = filterIndexGrupo({ itemsGrupos }, selectedIndex);
      if (itemFilter) {
        setSelectGrupo({
          idGrupo: itemFilter.id,
          grupo: itemFilter.grupo,
        });
      }
    }
  };

  useEffect(() => {
    const indexGradoSelect = async () => {
      if (!isArrayEmpty(itemsGrados)) {
        const itemFilter = filterIndexGrado({ itemsGrados }, 0);
        if (itemFilter) {
          console.log("idGrado: itemFilter.id, " + itemFilter.id);
          setSelectGrado({
            idGrado: itemFilter.id,
            grado: itemFilter.grado,
          });
        }
      }
    };
    indexGradoSelect();
  }, [itemsGrados]);

  useEffect(() => {
    const indexGrupoSelect = async () => {
      if (!isArrayEmpty(itemsGrupos)) {
        const itemFilter = filterIndexGrupo({ itemsGrupos }, 0);
        if (itemFilter) {
          setSelectGrupo({
            idGrupo: itemFilter.id,
            grupo: itemFilter.grupo,
          });
        }
      }
    };
    indexGrupoSelect();
  }, [itemsGrupos]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      const sesionLocalStorage = loadSessionFromLocalStorage();
      const userId = sesionLocalStorage?.id ?? -1;
      try {
        const students = await getAlumnos(
          userId,
          TypeStatusAlumno.ALTA,
          TypeStatusAlumno.BAJA,
          TypeStatusAlumno.CAMBIO,
          selectGrado.idGrado,
          selectGrupo.idGrupo
        );
        setStudents(students);
      } catch (error) {
        // console.error("Error fetching alumnos:", error);
      }
    };
    if (selectGrado.idGrado !== -1 && selectGrupo.idGrupo !== -1) {
      fetchAlumnos();
    }
  }, [selectGrado, selectGrupo]);

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
      console.error("Failed to generate PDF");
    }
  }

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

  return {
    handleChangeGrado,
    handleChangeGrupo,
    selectGrado,
    selectGrupo,
    fetchStudentsBarcode,
  };
};
