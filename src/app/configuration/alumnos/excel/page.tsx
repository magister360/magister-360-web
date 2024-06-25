"use client";

import TableAlumnosExcel from "./components/TableAlumnosExcel";
import { useEffect, useState } from "react";
import OptionsGrados, { filterIndexGrado } from "@/app/components/OptionGrados";
import OptionsGrupos, {
  filterIndexGrupo,
} from "@/app/components/OptionsGrupos";

import {
  namesSheets,
  readColumnsData,
  readEncabezadoRowAndColumn,
} from "./ExcelReader";
import OptionsHojas from "./components/OptionsHojas";
import { ColumnasDetectadas } from "./components/ColumnasDetectadas";

import ErrorMessage from "@/app/components/ErrorMessage";
import { TypeIndexXlsAlumnos } from "./TypeIndexXlsAlumnos";
import convertToBarcode from "./ConvertBarcode";
import TablesMaterias from "../components/TablesMaterias";
import { useEffectFetchDataMateria } from "./hooks/DataMateriaHook";
import { useEffectFetchGradoGrupo } from "@/app/hooks/GradoGrupoHook";
import { createAlumnos } from "./controller/AlumnosController";
import { loadSessionFromLocalStorage } from "@/app/sesions/SesionCookies";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";
import { validateEncabezado } from "./ValidateEncabezado";

export default function AlumnosExcel() {
  const { itemsGrados, itemsGrupos } = useEffectFetchGradoGrupo();
  const {
    materiasSinAsignar,
    materiasAsignadas,
    removeMateriaSinAsignar,
    removeMateriaAsignar,
  } = useEffectFetchDataMateria();
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [selectedIndexHoja, setSelectedIndexHoja] = useState(0);
  const [indexRowEncabezado, setIndexRowEncabezado] = useState<number[]>([]);
  const [indexColumnEncabezado, setIndexColumnEncabezado] = useState<number[]>(
    []
  );
  const [errorEncabezado, setErrorEncabezado] = useState("");
  const [isUpdatingEncabezado, setIsUpdatingEncabezado] =
    useState<boolean>(false);
  const [dataAlumnos, setDataAlumnos] = useState<any[][]>([]);

  const [selectGrado, setSelectGrado] = useState({
    idGrado: -1,
    grado: "",
  });
  const [selectGrupo, setSelectGrupo] = useState({
    idGrupo: -1,
    grupo: "",
  });

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const isArrayEmpty = (array: any[]) => {
    return array.length === 0;
  };
  const handleChangeGrado = (event: { target: { selectedIndex: any } }) => {
    const selectedIndex = event.target.selectedIndex;
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
    const selectElement = document.getElementById(
      "select-grado"
    ) as HTMLSelectElement | null;
    if (selectElement) {
      handleChangeGrado({
        target: selectElement,
      });
    }
  }, [itemsGrados]);

  useEffect(() => {
    const selectElement = document.getElementById(
      "select-grupo"
    ) as HTMLSelectElement | null;
    if (selectElement) {
      handleChangeGrupo({
        target: selectElement,
      });
    }
  }, [itemsGrupos]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      try {
        const sheetNamesFromExcel = await namesSheets(file);
        setSheetNames(sheetNamesFromExcel);
        setFile(file);
        setDataAlumnos([]);
      } catch (error) {
        setDataAlumnos([]);
        setErrorMessage("Hubo un error el archivo es incorrecto.");
        setIsErrorModalOpen(true);
      }
    }
  };

  const addNumberAtPositionRowEncabezado = async (
    index: number,
    indexRow: number
  ) => {
    setIndexRowEncabezado((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = indexRow;
      return newArray;
    });
  };

  const addNumberAtPositionColumEncabezado = async (
    index: number,
    indexRow: number
  ) => {
    setIndexColumnEncabezado((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = indexRow;
      return newArray;
    });
  };

  const handleDataChange = async () => {
    try {
      if (file) {
        setIsUpdatingEncabezado(true);
        setErrorEncabezado("");
        /*
                No lista
                */
        const searchTermsNoLista = [
          "NO LISTA",
          "NO.LISTA",
          "NL",
          "NO. L",
          "NO.L",
          "NO. LISTA",
          "N.L.",
          "N.L",
        ];
        const rowColumnNomLista = await readEncabezadoRowAndColumn(
          file,
          selectedIndexHoja,
          searchTermsNoLista
        );
        if (rowColumnNomLista) {
          const indexRowNLNum =
            rowColumnNomLista.row === null ? -1 : rowColumnNomLista.row;
          const indexColumnNLNum =
            rowColumnNomLista.col === null ? -1 : rowColumnNomLista.col;

          await addNumberAtPositionRowEncabezado(
            TypeIndexXlsAlumnos.INDEX_NO_LISTA,
            indexRowNLNum + 1
          );
          await addNumberAtPositionColumEncabezado(
            TypeIndexXlsAlumnos.INDEX_NO_LISTA,
            indexColumnNLNum
          );
        } else {
          await addNumberAtPositionRowEncabezado(
            TypeIndexXlsAlumnos.INDEX_NO_LISTA,
            -1
          );
          await addNumberAtPositionColumEncabezado(
            TypeIndexXlsAlumnos.INDEX_NO_LISTA,
            -1
          );
        }

        /*
                Nombre
                */
        const searchTermsNombre = ["NOMBRE", "N", "NOMBR", "NOM"];
        const indexRowNommbre = await readEncabezadoRowAndColumn(
          file,
          selectedIndexHoja,
          searchTermsNombre
        );
        if (indexRowNommbre) {
          const indexRowNNum =
            indexRowNommbre.row === null ? -1 : indexRowNommbre.row;
          const indexColumNNum =
            indexRowNommbre.col === null ? -1 : indexRowNommbre.col;
          await addNumberAtPositionRowEncabezado(
            TypeIndexXlsAlumnos.INDEX_NOMBRE,
            indexRowNNum + 1
          );
          await addNumberAtPositionColumEncabezado(
            TypeIndexXlsAlumnos.INDEX_NOMBRE,
            indexColumNNum
          );
        } else {
          await addNumberAtPositionRowEncabezado(
            TypeIndexXlsAlumnos.INDEX_NOMBRE,
            -1
          );
          await addNumberAtPositionColumEncabezado(
            TypeIndexXlsAlumnos.INDEX_NOMBRE,
            -1
          );
        }

        /*
                Apellido paterno
                */
        const searchTermsApellidoPaterno = [
          "A.PATERNO",
          "A PATERNO",
          "APATERNO",
          "A.P",
          "A. P.",
          "A. PATERNO",
        ];
        const indexRowApellidoPaterno = await readEncabezadoRowAndColumn(
          file,
          selectedIndexHoja,
          searchTermsApellidoPaterno
        );
        if (indexRowApellidoPaterno) {
          const indexRowAPNum =
            indexRowApellidoPaterno.row === null
              ? -1
              : indexRowApellidoPaterno.row;
          const indexColumAPNum =
            indexRowApellidoPaterno.col === null
              ? -1
              : indexRowApellidoPaterno.col;
          await addNumberAtPositionRowEncabezado(
            TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO,
            indexRowAPNum + 1
          );
          await addNumberAtPositionColumEncabezado(
            TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO,
            indexColumAPNum
          );
        } else {
          await addNumberAtPositionRowEncabezado(
            TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO,
            -1
          );
          await addNumberAtPositionColumEncabezado(
            TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO,
            -1
          );
        }
        /*
                Apellido MATERNO
                */
        const searchTermsApellidoMaterno = [
          "A.MATERNO",
          "A MATERNO",
          "AMATERNO",
          "A.M",
          "A. M.",
          "A. MATERNO",
        ];
        const indexRowApellidoMaterno = await readEncabezadoRowAndColumn(
          file,
          selectedIndexHoja,
          searchTermsApellidoMaterno
        );
        if (indexRowApellidoMaterno) {
          const indexRowAMNum =
            indexRowApellidoMaterno.row === null
              ? -1
              : indexRowApellidoMaterno.row;
          const indexColumAMNum =
            indexRowApellidoMaterno.col === null
              ? -1
              : indexRowApellidoMaterno.col;
          await addNumberAtPositionRowEncabezado(
            TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO,
            indexRowAMNum + 1
          );
          await addNumberAtPositionColumEncabezado(
            TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO,
            indexColumAMNum
          );
        } else {
          await addNumberAtPositionRowEncabezado(
            TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO,
            -1
          );
          await addNumberAtPositionColumEncabezado(
            TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO,
            -1
          );
        }

        setIsUpdatingEncabezado(false);
      }
    } catch (error) {
      setErrorMessage("Hubo un error al cargar los datos del excel.");
      setIsErrorModalOpen(true);
      setDataAlumnos([]);
      setErrorEncabezado("");
    }
  };

  const filterUndefinedFromEnd = (array: any[]) => {
    let lastIndex = array.length - 1;
    while (lastIndex >= 0 && array[lastIndex] === undefined) {
      lastIndex--;
    }
    return array.slice(0, lastIndex + 1);
  };

  const updateDataAlumnos = (columnData: any[], columnIndex: number) => {
    if (columnData.length !== 0) {
      setDataAlumnos((prevMatrix) => {
        const newMatrix = [...prevMatrix];
        columnData.forEach((value, rowIndex) => {
          if (!newMatrix[rowIndex]) {
            newMatrix[rowIndex] = [];
          }
          newMatrix[rowIndex][columnIndex] = value;
        });

        return newMatrix;
      });
    }
  };

  useEffect(() => {
    if (!isUpdatingEncabezado && file) {
      const errorEncabezados = validateEncabezado(indexRowEncabezado);
      setErrorEncabezado(errorEncabezados);

      if (errorEncabezado === "") {
        readColumnsData(
          file,
          indexRowEncabezado[TypeIndexXlsAlumnos.INDEX_NO_LISTA],
          indexColumnEncabezado[TypeIndexXlsAlumnos.INDEX_NO_LISTA],
          selectedIndexHoja
        ).then((columnDataNoLista) => {
          const filteredColumnDataNoLista =
            filterUndefinedFromEnd(columnDataNoLista);
          updateDataAlumnos(
            filteredColumnDataNoLista,
            TypeIndexXlsAlumnos.INDEX_NO_LISTA
          );
          const arrayBarcode = convertToBarcode(filteredColumnDataNoLista);
          updateDataAlumnos(arrayBarcode, TypeIndexXlsAlumnos.INDEX_BARCODE);
        });
        readColumnsData(
          file,
          indexRowEncabezado[TypeIndexXlsAlumnos.INDEX_NOMBRE],
          indexColumnEncabezado[TypeIndexXlsAlumnos.INDEX_NOMBRE],
          selectedIndexHoja
        ).then((columnDataNombre) => {
          const filteredColumnDataNombre =
            filterUndefinedFromEnd(columnDataNombre);
          updateDataAlumnos(
            filteredColumnDataNombre,
            TypeIndexXlsAlumnos.INDEX_NOMBRE
          );
        });
        readColumnsData(
          file,
          indexRowEncabezado[TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO],
          indexColumnEncabezado[TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO],
          selectedIndexHoja
        ).then((columnDataApellidoPaterno) => {
          const filteredColumnDataApellidoPaterno = filterUndefinedFromEnd(
            columnDataApellidoPaterno
          );
          updateDataAlumnos(
            filteredColumnDataApellidoPaterno,
            TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO
          );
        });
        readColumnsData(
          file,
          indexRowEncabezado[TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO],
          indexColumnEncabezado[TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO],
          selectedIndexHoja
        ).then((columnDataApellidoMaterno) => {
          const filteredColumnDataApellidoMaterno = filterUndefinedFromEnd(
            columnDataApellidoMaterno
          );
          updateDataAlumnos(
            filteredColumnDataApellidoMaterno,
            TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO
          );
        });

        //  readColumnsColorsData(file, indexRowEncabezado[TypeIndexXlsAlumnos.INDEX_NO_LISTA],
        //    indexColumnEncabezado[TypeIndexXlsAlumnos.INDEX_NO_LISTA], selectedIndexHoja)
        //  .then(columColor => {
        //    const filteredColumnColor = filterUndefinedFromEnd(columColor);
        //    console.log(filteredColumnColor)
        // });
      } else {
      }
    }
  }, [isUpdatingEncabezado]);

  const handleSelectChange = (event: { target: { selectedIndex: any } }) => {
    const index = event.target.selectedIndex;
    setSelectedIndexHoja(index);
  };

  const handleDataChangeAlumnos = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const sesionLocalStorage = loadSessionFromLocalStorage();
    const userId = sesionLocalStorage?.id ?? -1;
    const createSucces = await createAlumnos(
      userId,
      selectGrado.idGrado,
      selectGrupo.idGrupo,
      dataAlumnos,
      materiasAsignadas
    );
    if (createSucces.success) {
      setSuccessMessage("Los alumnos se guardaron co éxito");
      setIsSuccessModalOpen(true);
      setDataAlumnos([]);
    } else if (!createSucces.success) {
      setErrorMessage(
        "Hubo un error al procesar la solicitud. " + createSucces.message
      );
      setIsErrorModalOpen(true);
    }
  };

  return (
    <>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModal}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <label
        className="mt-14 ml-72 block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2"
        htmlFor="lbl-select-grado-grupo"
      >
        Alumnos en excel
      </label>

      <div className="mt-2 ml-72">
        <div
          className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5"
        >
          <div>
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium
                     text-gray-900 dark:text-white"
            >
              Grado
            </label>
            <select
              id="select-grado"
              className="block w-full p-2 mb-2 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              onChange={handleChangeGrado}
            >
              <OptionsGrados itemsGrados={itemsGrados} />
            </select>
          </div>

          <div>
            <label
              htmlFor="lbl-grupo"
              className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
            >
              Grupo
            </label>
            <select
              id="select-grupo"
              className="block w-full p-2 mb-0 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              onChange={handleChangeGrupo}
            >
              <OptionsGrupos itemsGrupos={itemsGrupos} />
            </select>
          </div>
        </div>
        <div
          className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-4"
        >
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold text-sm "
            htmlFor="fileInput"
          >
            Subir archivo
          </label>
          <input
            className=" bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block max-w-sm p-2.5 dark:bg-[#1a2c32]
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500  mt-2"
            id="fileInput"
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
          />
        </div>
        <div
          className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-4"
        >
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold text-sm mb-2"
            htmlFor="lbl-select-grado-grupo"
          >
            Seleccione la hoja del archivo excel
          </label>
          <select
            id="select-hoja"
            className="block w-full p-2 mb-2 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            onChange={handleSelectChange}
          >
            <OptionsHojas items={sheetNames} />
          </select>

          <button
            type="button"
            className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800 mt-3  "
            onClick={handleDataChange}
          >
            Cargar
          </button>

          {errorEncabezado !== "" && <ErrorMessage message={errorEncabezado} />}
        </div>

        {file && dataAlumnos.length !== 0 && (
          <>
            <ColumnasDetectadas
              indexRowEncabezado={indexRowEncabezado}
              errorEncabezado={errorEncabezado}
            />
            <TableAlumnosExcel
              data={dataAlumnos}
              errorEncabezado={errorEncabezado}
            />
            <TablesMaterias
              materiasSinAsignar={materiasSinAsignar}
              materiasAsignadas={materiasAsignadas}
              errorEncabezado={errorEncabezado}
              removeMateriaSinAsignar={removeMateriaSinAsignar}
              removeMateriaAsignar={removeMateriaAsignar}
            />
          </>
        )}
        {file && dataAlumnos.length !== 0 && (
          <>
            <form className="" onSubmit={handleDataChangeAlumnos} method="POST">
              <div
                className="rounded-lg shadow  
                           sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-4 mb-4"
              >
                <button
                  type="submit"
                  className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                             focus:ring-4 focus:outline-none focus:ring-blue-300 
                             font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                            dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                            dark:focus:ring-blue-800 mt-3  "
                >
                  Guardar
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
