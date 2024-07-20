import {
  StudenParticipacionType,
  TypeParticipacionCalificacion,
} from "@/app/types/participacion/TypeParticipacion";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";
import { CalificacionModal } from "@/app/components/CalificacionModal";
import { updateEstatusParticipacion } from "../controller/AlumnoController";
import { EstatusParticipacionType } from "@/app/estatus/EstatusType";
import CalificacionCircle from "@/app/components/CalificacionCircle";

type Props = {
  readonly students: StudenParticipacionType[] | null;
  readonly date: string | null;
  readonly participaciones: TypeParticipacionCalificacion[] | null;
  readonly setIsFetchParticipacion: Dispatch<SetStateAction<boolean>>;
};

export default function TableAlumnosParticipacion({
  students,
  date,
  participaciones,
  setIsFetchParticipacion,
}: Props) {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [isCalificacionModalOpen, setIsCalificacionModalOpen] = useState(false);
  const [selectedCalificacion, setSelectedCalificacion] = useState<number>(0);
  const [selectedFecha, setSelectedFecha] = useState<string>("");
  const [id, setId] = useState<string | undefined>(undefined);

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
    const save = await updateEstatusParticipacion(
      id,
      EstatusParticipacionType.ELIMININAR
    );
    if (save.isSave) {
      setSuccessMessage(save.message);
      setIsSuccessModalOpen(true);
      setIsFetchParticipacion(true);
    } else {
      setErrorMessage(save.message);
      setIsErrorModalOpen(true);
    }
  };

  const handleConfirmOpen = async (noLista: number) => {
    setIsModalConfirmOpen(true);

    const selectId = getId(participaciones, noLista);
    setId(selectId);
  };

  const handleSaveCalificacion = async () => {
    setIsCalificacionModalOpen(false);
  };

  const handleEditClick = () => {
    setIsCalificacionModalOpen(true);
  };

  const getId = (
    participaciones: TypeParticipacionCalificacion[] | null,
    noLista: number
  ): string | undefined => {
    const participacion = participaciones?.find((p) => p.noLista === noLista);
    return participacion?.id ?? undefined;
  };

  const getCalificacion = (
    participaciones: TypeParticipacionCalificacion[] | null,
    noLista: number
  ): number => {
    const participacion = participaciones?.find((p) => p.noLista === noLista);
    return participacion?.calificacion ?? 0;
  };

  if (isModalConfirmOpen) {
    return (
      <ConfirmationModal
        isOpen={isModalConfirmOpen}
        onClose={closeModalConfirm}
        onConfirm={handleConfirm}
        message="¿Está seguro de eliminar la participación?"
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
        onClose={() => setIsCalificacionModalOpen(false)}
        onSave={handleSaveCalificacion}
        calificacionInicial={selectedCalificacion}
        titulo="Participación"
        selectedFecha={selectedFecha}
      />
    );
  }

  return (
    <>
      {students !== null && students.length !== 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-3 mr-3">
          <div
            className="flex items-center justify-between flex-column flex-wrap md:flex-row 
            space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
          ></div>
          <table
            className="w-full text-sm text-left rtl:text-right text-gray-500
                        dark:text-gray-400"
          >
            <thead
              className="border-b text-xs  uppercase  
                            dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300 text-black"
            >
              <tr>
                <th scope="col" className="w-4 px-6 py-3 cursor-default">
                  No. lista
                </th>
                <th scope="col" className="px-6 py-3 cursor-default">
                  Nombres
                </th>
                <th scope="col" className=" px-6 py-3 cursor-default">
                  Calificación
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 min-w-[20px] cursor-default"
                >
                  Editar
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 min-w-[20px] cursor-default"
                >
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={uuidv4()}
                  className="border-b dark:bg-[#1a2c32] bg-[#ffffff]
                                    dark:border-gray-700 hover:bg-[#e6e6e6] 
                                    dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center cursor-default">
                      {student.noLista}
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap 
                    dark:text-white"
                  >
                    <div className="ps-3">
                      <div className="text-base font-semibold cursor-default">
                        {student.nombre}
                      </div>
                      <div className="font-normal text-gray-500 cursor-default">
                        {student.apellidoPaterno} {student.apellidoMaterno}
                      </div>
                    </div>
                  </td>

                  <td className=" px-6 ">
                    <span className="cursor-default">
                      {
                        <CalificacionCircle
                          calificacion={getCalificacion(
                            participaciones,
                            student.noLista
                          )}
                        />
                      }
                    </span>
                  </td>
                  <td className=" px-6 ">
                    <Image
                      className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
                    cursor-pointer mt-4"
                      src="/editar.svg"
                      alt="editar"
                      width={28}
                      height={28}
                      onClick={() => handleEditClick()}
                    />
                  </td>
                  <td className=" px-6  ">
                    <Image
                      className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
                    cursor-pointer mt-4"
                      src="/remover.svg"
                      alt="remover"
                      width={28}
                      height={28}
                      onClick={() => handleConfirmOpen(student.noLista)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
