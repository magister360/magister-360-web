import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { CalificacionModal } from "@/app/components/CalificacionModal";

import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { TypeProyectoFecha } from "@/app/types/proyecto/TypeProyecto";
import { EstatusProyectoType } from "@/app/estatus/EstatusType";
import {
  createProyecto,
  updateProyecto,
} from "../../controller/ProyectoController";
import { updateEstatusProyecto } from "../controller/SegProyectoController";

interface FechasProyectosProps {
  noPeriodo: number | undefined;
  fechasProyectos: string[] | null;
  proyectosAlumno: TypeProyectoFecha[] | null;
  fetchFechasProyecto: (
    periodoEvaluacion: PeriodoEvaluacion | null
  ) => Promise<void>;
  selectPeriodo: PeriodoEvaluacion | null;
  idAlumno: string | undefined;
}

const FechasProyectos: React.FC<FechasProyectosProps> = ({
  fechasProyectos,
  noPeriodo,
  proyectosAlumno,
  fetchFechasProyecto,
  selectPeriodo,
  idAlumno,
}) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  const [isCalificacionModalOpen, setIsCalificacionModalOpen] = useState(false);
  const [selectedFecha, setSelectedFecha] = useState<string>("");
  const [selectedCalificacion, setSelectedCalificacion] = useState<number>(0);
  const { idUsuario, idMateria, contenido } = useSidebarContext();
  const titulo = `Trimestre ${noPeriodo}`;

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  if (noPeriodo === undefined) {
    return null;
  }

  const handleEditClick = (fecha: string, calificacion: number) => {
    setSelectedFecha(fecha);
    setSelectedCalificacion(calificacion);
    setIsCalificacionModalOpen(true);
  };

  const closeModalConfirm = () => {
    setIsModalConfirmOpen(false);
  };

  const handleSaveCalificacion = async (calificacion: number) => {
    setIsCalificacionModalOpen(false);
    const id = buscarId(selectedFecha);
    if (id === undefined) {
      const UUID = uuidv4();
      const userId = idUsuario ?? -1;
      const save = await createProyecto(
        UUID,
        selectedFecha,
        calificacion,
        contenido ?? "",
        idAlumno,
        userId,
        idMateria,
        EstatusProyectoType.OK
      );
      if (save.isSave) {
        setSuccessMessage(save.message);
        setIsSuccessModalOpen(true);
        fetchFechasProyecto(selectPeriodo);
      } else {
        setErrorMessage(save.message);
        setIsErrorModalOpen(true);
      }
    } else {
      const save = await updateProyecto(id, calificacion);
      if (save.isSave) {
        setSuccessMessage(save.message);
        setIsSuccessModalOpen(true);
        fetchFechasProyecto(selectPeriodo);
      } else {
        setErrorMessage(save.message);
        setIsErrorModalOpen(true);
      }
    }
  };

  const handleConfirm = async () => {
    setIsModalConfirmOpen(false);
    const id = buscarId(selectedFecha);

    const updateStatus = await updateEstatusProyecto(
      id,
      EstatusProyectoType.ELIMININAR
    );
    if (updateStatus.isSave) {
      setSuccessMessage(updateStatus.message);
      setIsSuccessModalOpen(true);
      fetchFechasProyecto(selectPeriodo);
    } else {
      setErrorMessage(updateStatus.message);
      setIsErrorModalOpen(true);
    }
  };
  const handleConfirmOpen = async (fecha: string) => {
    setIsModalConfirmOpen(true);
    setSelectedFecha(fecha);
  };

  const buscarId = (fechaBusqueda: string): string | undefined => {
    if (!proyectosAlumno) {
      return undefined;
    }

    const proyecto = proyectosAlumno.find((p) => p.fecha === fechaBusqueda);

    return proyecto ? proyecto.id : undefined;
  };

  const buscarCalificacion = (fechaBusqueda: string): number => {
    if (!proyectosAlumno) {
      return 0;
    }

    const proyecto = proyectosAlumno.find((p) => p.fecha === fechaBusqueda);

    return proyecto ? proyecto.calificacion : 0;
  };

  if (isModalConfirmOpen) {
    return (
      <ConfirmationModal
        isOpen={isModalConfirmOpen}
        onClose={closeModalConfirm}
        onConfirm={handleConfirm}
        message="¿Está seguro de eliminar el proyecto?"
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
        titulo="Proyecto"
        selectedFecha={selectedFecha}
      />
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-stone-900 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-white cursor-default">
          {titulo}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {fechasProyectos?.map((fecha, index) => (
          <div
            key={uuidv4()}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex"
          >
            <div className="w-1 bg-blue-500 flex-shrink-0"></div>
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 cursor-default">
                Proyecto {index + 1}
              </h3>
              <p className="">
                <span className="dark:text-gray-600 text-slate-400 cursor-default">
                  Fecha{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300 cursor-default">
                  {fecha}
                </span>
              </p>
              <p className="mt-4">
                <span className="dark:text-gray-600 text-slate-400 cursor-default">
                  Calificación{" "}
                </span>
                <span className="dark:text-gray-200 text-3xl font-light cursor-default">
                  {buscarCalificacion(fecha)}
                </span>
              </p>
              <div className="flex gap-6">
                <Image
                  className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
                    cursor-pointer mt-4"
                  src="/remover.svg"
                  alt="remover"
                  width={28}
                  height={28}
                  onClick={() => handleConfirmOpen(fecha)}
                />
                <Image
                  className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
                    cursor-pointer mt-4"
                  src="/editar.svg"
                  alt="editar"
                  width={28}
                  height={28}
                  onClick={() =>
                    handleEditClick(fecha, buscarCalificacion(fecha))
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FechasProyectos;
