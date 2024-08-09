import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { EstatusParticipacionType } from "@/app/estatus/EstatusType";
import { updateEstatusParticipacion } from "../controller/SegParticipacionController";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { CalificacionModal } from "@/app/components/CalificacionModal";
import {
  createParticipacion,
  updateParticipacion,
} from "../../controller/ParticipacionController";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { TypeParticipacionFecha } from "@/app/types/participacion/TypeParticipacion";
import CardCalificacion from "@/app/components/CardCalificacion";
import CardPeriodoTitulo from "@/app/components/CardPeriodoTitulo";

interface FechasParticipacionesProps {
  noPeriodo: number | undefined;
  fechasParticipaciones: string[] | null;
  participacionesAlumno: TypeParticipacionFecha[] | null;
  fetchFechasParticipacion: (
    periodoEvaluacion: PeriodoEvaluacion | null
  ) => Promise<void>;
  selectPeriodo: PeriodoEvaluacion | null;
  idAlumno: string | undefined;
}

const FechasParticipaciones: React.FC<FechasParticipacionesProps> = ({
  fechasParticipaciones,
  noPeriodo,
  participacionesAlumno,
  fetchFechasParticipacion,
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
      const save = await createParticipacion(
        UUID,
        selectedFecha,
        calificacion,
        contenido ?? "",
        idAlumno,
        userId,
        idMateria,
        EstatusParticipacionType.OK
      );
      if (save.isSave) {
        fetchFechasParticipacion(selectPeriodo);
        setSuccessMessage(save.message);
        setIsSuccessModalOpen(true);
      } else {
        setErrorMessage(save.message);
        setIsErrorModalOpen(true);
      }
    } else {
      const save = await updateParticipacion(id, calificacion);
      if (save.isSave) {
        setSuccessMessage(save.message);
        setIsSuccessModalOpen(true);
        fetchFechasParticipacion(selectPeriodo);
      } else {
        setErrorMessage(save.message);
        setIsErrorModalOpen(true);
      }
    }
  };

  const handleConfirm = async () => {
    setIsModalConfirmOpen(false);
    const id = buscarId(selectedFecha);

    const updateStatus = await updateEstatusParticipacion(
      id,
      EstatusParticipacionType.ELIMININAR
    );
    if (updateStatus.isSave) {
      setSuccessMessage(updateStatus.message);
      setIsSuccessModalOpen(true);
      fetchFechasParticipacion(selectPeriodo);
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
    if (!participacionesAlumno) {
      return undefined;
    }

    const participacion = participacionesAlumno.find(
      (p) => p.fecha === fechaBusqueda
    );

    return participacion ? participacion.id : undefined;
  };

  const buscarCalificacion = (fechaBusqueda: string): number => {
    if (!participacionesAlumno) {
      return 0;
    }

    const participacion = participacionesAlumno.find(
      (p) => p.fecha === fechaBusqueda
    );

    return participacion ? participacion.calificacion : 0;
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
   
      <CardPeriodoTitulo titulo={titulo} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {fechasParticipaciones?.map((fecha, index) => (
          <CardCalificacion
            key={uuidv4()}
            index={index}
            fecha={fecha}
            buscarCalificacion={buscarCalificacion}
            handleConfirmOpen={handleConfirmOpen}
            handleEditClick={handleEditClick}
            title="Participación"
            titleDatePeriod="Fecha"
          />
        ))}
      </div>
    </>
  );
};

export default FechasParticipaciones;
