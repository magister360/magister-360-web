import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ConfirmationModal from "@/app/components/ConfirmationModal";

import SuccessModal from "@/app/components/SuccessModal";
import { CalificacionModal } from "@/app/components/CalificacionModal";
import CalificacionCircle from "@/app/components/CalificacionCircle";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { EstatusExamenType } from "@/app/estatus/EstatusType";

import ErrorModal from "@/app/components/ErrorModal ";
import {
  StudentExamenType,
  TypeExamenCalificacion,
} from "@/app/types/examen/TypeExamen";
import { updateEstatusExamen } from "../controller/AlumnoController";
import { createExamen, updateExamen } from "../../controller/ExamenController";

type Props = {
  readonly students: StudentExamenType[] | null;
  readonly noPeriodo: string | undefined;
  readonly examenes: TypeExamenCalificacion[] | null;
  readonly setIsFetchExamen: Dispatch<SetStateAction<boolean>>;
};

export default function TableAlumnosExamen({
  students,
  noPeriodo,
  examenes,
  setIsFetchExamen,
}: Props) {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [isCalificacionModalOpen, setIsCalificacionModalOpen] = useState(false);
  const [calificacion, setCalificacion] = useState<number>(0);
  
  const [id, setId] = useState<string | undefined>(undefined);
  const [noLista, setNoLista] = useState<number | undefined>(undefined);
  const { idUsuario, idMateria, contenido } = useSidebarContext();
  const tableBodyRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = scrollPosition;
    }
  }, [isCalificacionModalOpen, isModalConfirmOpen]);

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const closeModalConfirm = () => {
    setIsModalConfirmOpen(false);
  };

  const handleConfirm = async () => {
    setIsModalConfirmOpen(false);
    const save = await updateEstatusExamen(
      id,
      EstatusExamenType.ELIMININAR
    );
    if (save.isSave) {
      setSuccessMessage(save.message);
      setIsSuccessModalOpen(true);
      setIsFetchExamen(true);
    } else {
      setErrorMessage(save.message);
      setIsErrorModalOpen(true);
    }
  };

  const handleConfirmOpen = async (noLista: number) => {
    if (tableBodyRef.current) {
      setScrollPosition(tableBodyRef.current.scrollTop);
    }
    setIsModalConfirmOpen(true);

    const selectId = getId(examenes, noLista);
    setId(selectId);
  };

  const handleSaveCalificacion = async (calificacion: number) => {
    const currentScrollPosition = tableBodyRef.current?.scrollTop || 0;
    setIsCalificacionModalOpen(false);
    try {
      if (id === undefined) {
        const idAlumno = getIdAlumno(students, noLista);
        const UUID = uuidv4();
        const userId = idUsuario ?? -1;
        const save = await createExamen(
          UUID,
          noPeriodo,
          calificacion,
          contenido ?? "",
          idAlumno,
          userId,
          idMateria,
          EstatusExamenType.OK
        );
        if (save.isSave) {
          setSuccessMessage(save.message);
          setIsSuccessModalOpen(true);
          setIsFetchExamen(true);
        } else {
          setErrorMessage(save.message);
          setIsErrorModalOpen(true);
        }
      } else {
        const save = await updateExamen(id, calificacion);
        if (save.isSave) {
          setSuccessMessage(save.message);
          setIsSuccessModalOpen(true);
          setIsFetchExamen(true);
        } else {
          setErrorMessage(save.message);
          setIsErrorModalOpen(true);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 0));

      if (tableBodyRef.current) {
        tableBodyRef.current.scrollTop = currentScrollPosition;
      }
    } catch (error) {
      console.error("Error al guardar la calificación:", error);
    }
  };

  const handleEditClick = (noLista: number | undefined) => {
    if (tableBodyRef.current) {
      setScrollPosition(tableBodyRef.current.scrollTop);
    }
    setIsCalificacionModalOpen(true);
    const selectId = getId(examenes, noLista);
    setId(selectId);
    const calificacion = getCalificacion(examenes, noLista);
    setCalificacion(calificacion);
    
    setNoLista(noLista);
  };

  const getIdAlumno = (
    students: StudentExamenType[] | null,
    noLista: number | undefined
  ): string | undefined => {
    const student = students?.find((p) => p.noLista === noLista);
    return student?.id ?? undefined;
  };

  const getId = (
    participaciones: TypeExamenCalificacion[] | null,
    noLista: number | undefined
  ): string | undefined => {
    const participacion = participaciones?.find((p) => p.noLista === noLista);
    return participacion?.id ?? undefined;
  };

  const getCalificacion = (
    examenes: TypeExamenCalificacion[] | null,
    noLista: number | undefined
  ): number => {
    const examen = examenes?.find((p) => p.noLista === noLista);
    return examen?.calificacion ?? 0;
  };

  if (isModalConfirmOpen) {
    return (
      <ConfirmationModal
        isOpen={isModalConfirmOpen}
        onClose={closeModalConfirm}
        onConfirm={handleConfirm}
        message="¿Está seguro de eliminar el examen?"
      />
    );
  }

  if (isErrorModalOpen) {
    return (
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    );
  }
  if (isSuccessModalOpen) {
    return (
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModal}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
    );
  }

  if (isCalificacionModalOpen) {
    return (
      <CalificacionModal
        isOpen={isCalificacionModalOpen}
        onClose={() => {
          setIsCalificacionModalOpen(false);
        }}
        onSave={handleSaveCalificacion}
        calificacionInicial={calificacion}
        titulo="Examen"
        noLista={noLista}
      />
    );
  }

  return (
    <>
      {students !== null && students.length !== 0 && (
        <div className="relative shadow-md sm:rounded-lg mt-3 mr-3 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#2d464c] dark:text-gray-300">
                <tr>
                  <th scope="col" className="w-16 px-6 py-3 cursor-default">
                    No. lista
                  </th>
                  <th scope="col" className="px-6 py-3 cursor-default">
                    Nombres
                  </th>
                  <th
                    scope="col"
                    className="w-32 px-6 py-3 cursor-default text-center"
                  >
                    CALIFICACIÓN
                  </th>
                  <th
                    scope="col"
                    className="w-24 px-6 py-3 cursor-default text-center"
                  >
                    EDITAR
                  </th>
                  <th
                    scope="col"
                    className="w-24 px-6 py-3 cursor-default text-center"
                  >
                    ELIMINAR
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div
            ref={tableBodyRef}
            className="overflow-y-auto"
            style={{ maxHeight: "calc(70vh - 40px)" }}
          >
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                {students.map((student) => (
                  <tr
                    key={uuidv4()}
                    className="border-b dark:bg-[#1a2c32] bg-[#ffffff] dark:border-gray-700
                     hover:bg-[#e6e6e6] dark:hover:bg-gray-600"
                  >
                    <td className="w-16 px-6 py-4">
                      <div className="flex items-center cursor-default">
                        {student.noLista}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="ps-3">
                        <div className="text-base font-semibold cursor-default">
                          {student.nombre}
                        </div>
                        <div className="font-normal text-gray-500 cursor-default">
                          {student.apellidoPaterno} {student.apellidoMaterno}
                        </div>
                      </div>
                    </td>
                    <td className="w-32 px-6 py-4">
                      <div className="flex justify-center items-center cursor-default">
                        <CalificacionCircle
                          calificacion={getCalificacion(
                            examenes,
                            student.noLista
                          )}
                          isDecimal={false}
                        />
                      </div>
                    </td>
                    <td className="w-24 px-6 py-4">
                      <div className="flex justify-center items-center">
                        <Image
                          className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none cursor-pointer"
                          src="/editar.svg"
                          alt="editar"
                          width={28}
                          height={28}
                          onClick={() => handleEditClick(student.noLista)}
                        />
                      </div>
                    </td>
                    <td className="w-24 px-6 py-4">
                      <div className="flex justify-center items-center">
                        <Image
                          className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none cursor-pointer"
                          src="/remover.svg"
                          alt="remover"
                          width={28}
                          height={28}
                          onClick={() => handleConfirmOpen(student.noLista)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
