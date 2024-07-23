import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { CalificacionModal } from "@/app/components/CalificacionModal";

import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import CardCalificacion from "@/app/components/CardCalificacion";
import { createExamen, updateExamen } from "../../controller/ExamenController";
import { EstatusExamenType } from "@/app/estatus/EstatusType";
import { updateEstatusExamen } from "../../manual/controller/AlumnoController";
import { TypeExamenPeriodo } from "@/app/types/examen/TypeExamen";

interface PeriodosExamenesProps {
  noPeriodo: number | undefined;
  examenesAlumno: TypeExamenPeriodo[] | null;
  fetchPeriodosExamen: (
    periodoEvaluacion: PeriodoEvaluacion | null
  ) => Promise<void>;
  selectPeriodo: PeriodoEvaluacion | null;
  idAlumno: string | undefined;
}

const PeriodosExamnes: React.FC<PeriodosExamenesProps> = ({
  noPeriodo,
  examenesAlumno,
  fetchPeriodosExamen,
  selectPeriodo,
  idAlumno,
}) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  const [isCalificacionModalOpen, setIsCalificacionModalOpen] = useState(false);
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>("");
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

  const handleEditClick = (periodo: string, calificacion: number) => {
    setSelectedPeriodo(periodo);
    setSelectedCalificacion(calificacion);
    setIsCalificacionModalOpen(true);
  };

  const closeModalConfirm = () => {
    setIsModalConfirmOpen(false);
  };

  const handleSaveCalificacion = async (calificacion: number) => {
    setIsCalificacionModalOpen(false);
    const id = buscarId(selectedPeriodo);
    if (id === undefined) {
      const UUID = uuidv4();
      const userId = idUsuario ?? -1;
      const save = await createExamen(
        UUID,
        selectedPeriodo,
        calificacion,
        contenido ?? "",
        idAlumno,
        userId,
        idMateria,
        EstatusExamenType.OK
      );
      if (save.isSave) {
        fetchPeriodosExamen(selectPeriodo);
        setSuccessMessage(save.message);
        setIsSuccessModalOpen(true);
      } else {
        setErrorMessage(save.message);
        setIsErrorModalOpen(true);
      }
    } else {
      const save = await updateExamen(id, calificacion);
      if (save.isSave) {
        setSuccessMessage(save.message);
        setIsSuccessModalOpen(true);
        fetchPeriodosExamen(selectPeriodo);
      } else {
        setErrorMessage(save.message);
        setIsErrorModalOpen(true);
      }
    }
  };

  const handleConfirm = async () => {
    setIsModalConfirmOpen(false);
    const id = buscarId(selectedPeriodo);

    const updateStatus = await updateEstatusExamen(
      id,
      EstatusExamenType.ELIMININAR
    );
    if (updateStatus.isSave) {
      setSuccessMessage(updateStatus.message);
      setIsSuccessModalOpen(true);
      fetchPeriodosExamen(selectPeriodo);
    } else {
      setErrorMessage(updateStatus.message);
      setIsErrorModalOpen(true);
    }
  };

  const handleConfirmOpen = async (fecha: string) => {
    setIsModalConfirmOpen(true);
    setSelectedPeriodo(fecha);
  };

  const buscarId = (periodoBusqueda: string): string | undefined => {
    if (!examenesAlumno) {
      return undefined;
    }

    const examen = examenesAlumno.find((e) => {
      return String(e.noPeriodo) === periodoBusqueda;
    });

    return examen ? examen.id : undefined;
  };

  const buscarCalificacion = (periodoBusqueda: string): number => {
    if (!examenesAlumno) {
      return 0;
    }

    const examen = examenesAlumno.find((e) => {
      return String(e.noPeriodo) === periodoBusqueda;
    });

    return examen ? examen.calificacion : 0;
  };

  if (isModalConfirmOpen) {
    return (
      <ConfirmationModal
        isOpen={isModalConfirmOpen}
        onClose={closeModalConfirm}
        onConfirm={handleConfirm}
        message="¿Está seguro de eliminar la examen?"
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
        titulo="Examen"
        selectedFecha={selectedPeriodo}
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
        <CardCalificacion
          key={uuidv4()}
          index={0}
          fecha={noPeriodo + ""}
          buscarCalificacion={buscarCalificacion}
          handleConfirmOpen={handleConfirmOpen}
          handleEditClick={handleEditClick}
          title="Examen"
          titleDatePeriod="Trimestre"
        />
      </div>
    </>
  );
};

export default PeriodosExamnes;
