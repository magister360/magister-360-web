"use client"

import { useRouter } from 'next/navigation';
import TableAlumnosExcel from './components/TableAlumnosExcel';
import { useEffect, useState } from "react";
import OptionsGrados, { filterIndexGrado } from '@/app/sectionGGM/components/OptionGrados';
import OptionsGrupos, { filterIndexGrupo } from '@/app/sectionGGM/components/OptionsGrupos';
import { getGrados } from '../../grado/controller/GradoController';
import { loadSessionFromLocalStorage } from '@/app/sesions/SesionCookies';
import { getGrupos } from '../../grupo/controller/GrupoController';
import { TypeStatusGrupo } from '@/app/utils/TypeStatusGrupo';
import { TypeStatusGrado } from '@/app/utils/TypeStatusGrado';
import { namesSheets, readColumnsColorsData, readColumnsData, readEncabezadoRowAndColumn } from './ExcelReader';
import OptionsHojas from './components/OptionsHojas';
import { ColumnasDetectadas } from './components/ColumnasDetectadas';
import { validateEncabezado } from './ValidateEncabezado';
import ErrorMessage from '@/app/components/ErrorMessage';
import { TypeIndexXlsAlumnos } from './TypeIndexXlsAlumnos';
import convertToBarcode from './ConvertBarcode';



export default function AlumnosExcel() {

    const [itemsGrados, setItemsGrados] = useState([]);
    const [itemsGrupos, setItemsGrupos] = useState([]);
    const [sheetNames, setSheetNames] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [selectedIndexHoja, setSelectedIndexHoja] = useState(0);
    const [indexRowEncabezado, setIndexRowEncabezado] = useState<number[]>([]);
    const [indexColumnEncabezado, setIndexColumnEncabezado] = useState<number[]>([]);
    const [errorEncabezado, setErrorEncabezado] = useState('');
    const [isUpdatingEncabezado, setIsUpdatingEncabezado] = useState<boolean>(false);
    const [dataAlumnos, setDataAlumnos] = useState<any[][]>([]);
    const router = useRouter()

    const [selectGrado, setSelectGrado] = useState({
        idGrado: -1,
        grado: ''
    });
    const [selectGrupo, setSelectGrupo] = useState({
        idGrupo: -1,
        grupo: ''
    });

    const isArrayEmpty = (array: any[]) => {
        return array.length === 0;
    };
    const handleChangeGrado = (event: { target: { selectedIndex: any; }; }) => {
        const selectedIndex = event.target.selectedIndex;
        if (!isArrayEmpty(itemsGrados)) {
            const itemFilter = filterIndexGrado({ itemsGrados }, selectedIndex);
            if (itemFilter) {
                setSelectGrado({
                    idGrado: itemFilter.id,
                    grado: itemFilter.grado

                })
            };
        }
    }

    const handleChangeGrupo = (event: { target: { selectedIndex: any; }; }) => {
        const selectedIndex = event.target.selectedIndex;
        if (!isArrayEmpty(itemsGrupos)) {
            const itemFilter = filterIndexGrupo({ itemsGrupos }, selectedIndex);
            if (itemFilter) {
                setSelectGrado({
                    idGrado: itemFilter.id,
                    grado: itemFilter.grupo

                })
            };
        }
    }

    useEffect(() => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        if (!sesionLocalStorage) {
            router.push('/login');
            return;
        }
        const userId = sesionLocalStorage?.id ?? -1;


        const fetchGrados = async () => {
            const grados = await getGrados(
                userId,
                TypeStatusGrado.ALTA
            );
            return grados || [];
        };

        const fetchGrupos = async () => {
            const grupos = await getGrupos(
                userId,
                TypeStatusGrupo.ALTA
            );
            return grupos || [];
        };



        Promise.all([
            fetchGrados(),
            fetchGrupos()])
            .then(([grados, grupos]) => {
                setItemsGrados(grados);
                setItemsGrupos(grupos);

            })
            .catch((error) => {
                //console.error(error);
            });

    }, []);

    useEffect(() => {
        const selectElement = document.getElementById('select-grado') as HTMLSelectElement | null;;
        if (selectElement) {
            handleChangeGrado({
                target: selectElement,
            });
        }
    }, [itemsGrados]);

    useEffect(() => {
        const selectElement = document.getElementById('select-grupo') as HTMLSelectElement | null;;
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
            } catch (error) {
                console.error('Error al leer el archivo Excel:', error);
            }
        }
    };

    const addNumberAtPositionRowEncabezado = async (index: number, indexRow: number) => {
        setIndexRowEncabezado(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = indexRow;
            return newArray;
        });
    };

    const addNumberAtPositionColumEncabezado = async (index: number, indexRow: number) => {
        setIndexColumnEncabezado(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = indexRow;
            return newArray;
        });
    };

    const handleDataChange = async () => {

        try {
            if (file) {
                setIsUpdatingEncabezado(true);
                /*
                No lista
                */
                const searchTermsNoLista = ['NO LISTA', 'NO.LISTA', 'NL', 'NO. L', 'NO.L', 'NO. LISTA', 'N.L.', 'N.L'];
                const rowColumnNomLista = await readEncabezadoRowAndColumn(file, selectedIndexHoja, searchTermsNoLista);
                if (rowColumnNomLista) {
                    const indexRowNLNum = rowColumnNomLista.row === null ? -1 : rowColumnNomLista.row;
                    const indexColumnNLNum = rowColumnNomLista.col === null ? -1 : rowColumnNomLista.col;


                    await addNumberAtPositionRowEncabezado(TypeIndexXlsAlumnos.INDEX_NO_LISTA, indexRowNLNum + 1)
                    await addNumberAtPositionColumEncabezado(TypeIndexXlsAlumnos.INDEX_NO_LISTA, indexColumnNLNum)


                } else {
                    await addNumberAtPositionRowEncabezado(TypeIndexXlsAlumnos.INDEX_NO_LISTA, -1)
                    await addNumberAtPositionColumEncabezado(TypeIndexXlsAlumnos.INDEX_NO_LISTA, -1)
                }

                /*
                Nombre
                */
                const searchTermsNombre = ['NOMBRE', 'N', 'NOMBR', 'NOM'];
                const indexRowNommbre = await readEncabezadoRowAndColumn(file, selectedIndexHoja, searchTermsNombre);
                if (indexRowNommbre) {
                    const indexRowNNum = indexRowNommbre.row === null ? -1 : indexRowNommbre.row;
                    const indexColumNNum = indexRowNommbre.col === null ? -1 : indexRowNommbre.col;
                    await addNumberAtPositionRowEncabezado(TypeIndexXlsAlumnos.INDEX_NOMBRE, indexRowNNum + 1)
                    await addNumberAtPositionColumEncabezado(TypeIndexXlsAlumnos.INDEX_NOMBRE, indexColumNNum)
                } else {
                    await addNumberAtPositionRowEncabezado(TypeIndexXlsAlumnos.INDEX_NOMBRE, -1)
                    await addNumberAtPositionColumEncabezado(TypeIndexXlsAlumnos.INDEX_NOMBRE, -1)
                }

                /*
                Apellido paterno
                */
                const searchTermsApellidoPaterno = ['A.PATERNO', 'A PATERNO', 'APATERNO', 'A.P', 'A. P.', 'A. PATERNO'];
                const indexRowApellidoPaterno = await readEncabezadoRowAndColumn(file, selectedIndexHoja, searchTermsApellidoPaterno);
                if (indexRowApellidoPaterno) {
                    const indexRowAPNum = indexRowApellidoPaterno.row === null ? -1 : indexRowApellidoPaterno.row;
                    const indexColumAPNum = indexRowApellidoPaterno.col === null ? -1 : indexRowApellidoPaterno.col;
                    await addNumberAtPositionRowEncabezado(TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO, indexRowAPNum + 1)
                    await addNumberAtPositionColumEncabezado(TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO, indexColumAPNum)
                } else {
                    await addNumberAtPositionRowEncabezado(TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO, -1)
                    await addNumberAtPositionColumEncabezado(TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO, -1)
                }
                /*
                Apellido MATERNO
                */
                const searchTermsApellidoMaterno = ['A.MATERNO', 'A MATERNO', 'AMATERNO', 'A.M', 'A. M.', 'A. MATERNO'];
                const indexRowApellidoMaterno = await readEncabezadoRowAndColumn(file, selectedIndexHoja, searchTermsApellidoMaterno);
                if (indexRowApellidoMaterno) {

                    const indexRowAMNum = indexRowApellidoMaterno.row === null ? -1 : indexRowApellidoMaterno.row;
                    const indexColumAMNum = indexRowApellidoMaterno.col === null ? -1 : indexRowApellidoMaterno.col;
                    await addNumberAtPositionRowEncabezado(TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO, indexRowAMNum + 1)
                    await addNumberAtPositionColumEncabezado(TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO, indexColumAMNum)
                } else {
                    await addNumberAtPositionRowEncabezado(TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO, -1)
                    await addNumberAtPositionColumEncabezado(TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO, -1)
                }

                setIsUpdatingEncabezado(false);

            }

        } catch (error) {
            console.error('Error al leer el archivo Excel:', error);
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
        setDataAlumnos(prevMatrix => {
            const newMatrix = [...prevMatrix];
            columnData.forEach((value, rowIndex) => {
                if (!newMatrix[rowIndex]) {
                    newMatrix[rowIndex] = [];
                }
                newMatrix[rowIndex][columnIndex] = value;
            });

            return newMatrix;
        });
    };
    useEffect(() => {
        if (!isUpdatingEncabezado && file) {
            const errorEncabezados = validateEncabezado({ indexRowEncabezados: indexRowEncabezado });
            setErrorEncabezado(errorEncabezados);

            if (errorEncabezado === '') {
                readColumnsData(file, indexRowEncabezado[TypeIndexXlsAlumnos.INDEX_NO_LISTA],
                    indexColumnEncabezado[TypeIndexXlsAlumnos.INDEX_NO_LISTA], selectedIndexHoja)
                    .then(columnDataNoLista => {
                        const filteredColumnDataNoLista = filterUndefinedFromEnd(columnDataNoLista);
                        updateDataAlumnos(filteredColumnDataNoLista, TypeIndexXlsAlumnos.INDEX_NO_LISTA);
                        const arrayBarcode = convertToBarcode(filteredColumnDataNoLista)
                        updateDataAlumnos(arrayBarcode, TypeIndexXlsAlumnos.INDEX_BARCODE);

                    });
                readColumnsData(file, indexRowEncabezado[TypeIndexXlsAlumnos.INDEX_NOMBRE],
                    indexColumnEncabezado[TypeIndexXlsAlumnos.INDEX_NOMBRE], selectedIndexHoja)
                    .then(columnDataNombre => {
                        const filteredColumnDataNombre = filterUndefinedFromEnd(columnDataNombre);
                        updateDataAlumnos(filteredColumnDataNombre, TypeIndexXlsAlumnos.INDEX_NOMBRE);

                    });
                readColumnsData(file, indexRowEncabezado[TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO],
                    indexColumnEncabezado[TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO], selectedIndexHoja)
                    .then(columnDataApellidoPaterno => {
                        const filteredColumnDataApellidoPaterno = filterUndefinedFromEnd(columnDataApellidoPaterno);
                        updateDataAlumnos(filteredColumnDataApellidoPaterno, TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO);

                    });
                readColumnsData(file, indexRowEncabezado[TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO],
                    indexColumnEncabezado[TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO], selectedIndexHoja)
                    .then(columnDataApellidoMaterno => {
                        const filteredColumnDataApellidoMaterno = filterUndefinedFromEnd(columnDataApellidoMaterno);
                        updateDataAlumnos(filteredColumnDataApellidoMaterno, TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO);

                    });


                //  readColumnsColorsData(file, indexRowEncabezado[TypeIndexXlsAlumnos.INDEX_NO_LISTA],
                //    indexColumnEncabezado[TypeIndexXlsAlumnos.INDEX_NO_LISTA], selectedIndexHoja)
                //  .then(columColor => {
                //    const filteredColumnColor = filterUndefinedFromEnd(columColor);
                //    console.log(filteredColumnColor)
                // });


            }

        }
    }, [isUpdatingEncabezado]);



    const handleSelectChange = (event: { target: { selectedIndex: any; }; }) => {
        const index = event.target.selectedIndex;
        setSelectedIndexHoja(index);
    };

    return (
        <div className="mt-14 ml-72">
            <div className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  pl-4 pt-4 pb-4 pr-4">

                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                    htmlFor="lbl-select-grado-grupo">
                    Seleccione grado y grupo
                </label>
                <div>
                    <label htmlFor="small" className="block mb-2 text-sm font-medium
                     text-gray-900 dark:text-white">Grado</label>
                    <select id="select-grado" className="block w-full p-2 mb-2 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                        onChange={handleChangeGrado} >
                        <OptionsGrados itemsGrados={itemsGrados} />
                    </select>
                </div>

                <div>
                    <label htmlFor="lbl-grupo" className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white">Grupo</label>
                    <select id="select-grupo" className="block w-full p-2 mb-6 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                        onChange={handleChangeGrupo}>
                        <OptionsGrupos itemsGrupos={itemsGrupos} />
                    </select>
                </div>

            </div>
            <div className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  pl-4 pt-4 pb-4 pr-4 mt-4">
                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                    htmlFor="fileInput">
                    Subir archivo
                </label>
                <input
                    className="appearance-none block w-full dark:bg-[#18181B] bg-[#ffffff]
                     dark:text-gray-200 py-3 px-4 mb-3  focus:outline-none 
                    focus:bg-white "
                    id="fileInput"
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                />

            </div>
            <div className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  pl-4 pt-4 pb-4 pr-4 mt-4">
                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                    htmlFor="lbl-select-grado-grupo">
                    Seleccione la hoja del archivo excel
                </label>
                <select id="select-hoja" className="block w-full p-2 mb-2 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    onChange={handleSelectChange}
                >
                    <OptionsHojas items={sheetNames} />
                </select>

                <button type="button"
                    className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800 mt-3  "
                    onClick={handleDataChange}
                >Cargar</button>
                {
                    errorEncabezado !== '' && (
                        <ErrorMessage message='' />
                    )
                }

            </div>

            <ColumnasDetectadas indexRowEncabezado={indexRowEncabezado}
                errorEncabezado={errorEncabezado} />
            <TableAlumnosExcel data={dataAlumnos}
                errorEncabezado={errorEncabezado} />


        </div>
    )
}

