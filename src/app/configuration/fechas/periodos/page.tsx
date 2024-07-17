"use client";

import Calendar from "@/app/components/Calendar";
import TablePeriodosCicloEscolar from "./components/TablePeriodosCicloEscolar";
import { useState } from "react";
import Image from "next/image";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

import { EstatusFechaPeriodosType } from "@/app/estatus/EstatusType";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";
import Loading from "@/app/components/Loading";
import usePeriodosEvaluacion, {
  findMissingPeriodo,
} from "./hooks/usePeriodoEvaluacion";
import SubmitButton from "@/app/components/SubmitButton";
import { AuthCheck } from "@/app/hooks/AuthCheck";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import {
  createFechasPeriodos,
  deleteFechasPeriodos,
} from "./controller/PeriodoController";

export default function Periodos() {
  const { idUsuario, isMenuVisible } = useSidebarContext();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(null);
  const [noPeriodo, setNoPeriodo] = useState<number>(1);
  const [id, setId] = useState<string | undefined>(undefined);
  const [isFetch, setIsFetch] = useState<boolean>(true);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const { periodos } = usePeriodosEvaluacion({
    setLoading,
    setNoPeriodo,
    isFetch,
    setIsFetch,
  });

  const handleChangeDateStart = (date: Date) => {
    setSelectedDateStart(date);
  };
  const handleChangeDateEnd = (date: Date) => {
    setSelectedDateEnd(date);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleConfirm = async () => {
    setIsModalConfirmOpen(false);
    const result = await deleteFechasPeriodos(
      id,
      EstatusFechaPeriodosType.ELIMININAR
    );
    if (result.success) {
      setSuccessMessage(result.message);
      setIsSuccessModalOpen(true);
      handleNewPeriodo();
      setIsFetch(true);
    } else {
      setErrorMessage(result.message);
      setIsErrorModalOpen(true);
      handleNewPeriodo();
      setIsFetch(true);
    }
  };

  const handleNewPeriodo = () => {
    setSelectedDateStart(null);
    setSelectedDateEnd(null);
    const numberNoPeriodo = findMissingPeriodo(periodos);
    setNoPeriodo(numberNoPeriodo);
    setId(undefined);
  };

  const closeModalConfirm = () => {
    setIsModalConfirmOpen(false);
    handleNewPeriodo();
  };

  const handleFechaPeriodos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createFechasPeriodos(
      id,
      noPeriodo,
      selectedDateStart,
      selectedDateEnd,
      "",
      EstatusFechaPeriodosType.OK,
      periodos,
      idUsuario
    );
    if (result.success) {
      setSuccessMessage(result.message);
      setIsSuccessModalOpen(true);
      handleNewPeriodo();
      setIsFetch(true);
    } else {
      setErrorMessage(result.message);
      setIsErrorModalOpen(true);
      handleNewPeriodo();
      setIsFetch(true);
    }
  };

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

  if (isModalConfirmOpen) {
    return (
      <ConfirmationModal
        isOpen={isModalConfirmOpen}
        onClose={closeModalConfirm}
        onConfirm={handleConfirm}
        message="¿Está seguro de eliminar el período?"
      />
    );
  }

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (idUsuario === undefined) {
    return <AuthCheck />;
  }

  return (
    <div
      className={`mt-16 mr-4  
                ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h3 className="block text-gray-700 dark:text-gray-200 font-bold text-xl pt-0 ">
        ¿Cuántos periodos de evaluación habrá durante el ciclo escolar?
      </h3>

      <TablePeriodosCicloEscolar
        periodos={periodos}
        setSelectedDateEnd={setSelectedDateEnd}
        setSelectedDateStart={setSelectedDateStart}
        setNoPeriodo={setNoPeriodo}
        setId={setId}
        setIsModalConfirmOpen={setIsModalConfirmOpen}
      />

      <div className="dark:bg-[#18181B] bg-white p-4 mt-4 mb-14 rounded-lg ">
        <div className="mb-4">
          {id !== undefined && (
            <Image
              className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none w-auto h-7"
              src="/add.svg"
              alt="add"
              width={28}
              height={28}
              onClick={handleNewPeriodo}
            />
          )}

          <label
            className="block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2 mt-4"
            htmlFor="lbl-date-start-end"
          >
            {id === undefined ? <span>Nuevo</span> : <span>Modificar</span>}
            <span className="dark:text-gray-500"> periodo</span>
          </label>
        </div>

        <div>
          <div className="bg-white dark:bg-[#1a2c32] p-4 rounded-lg shadow-md w-64 mb-4">
            <p>
              No. periodo <span>{noPeriodo}</span>
            </p>
          </div>

          <div className="flex gap-4">
            <div>
              <Calendar
                setDate={handleChangeDateStart}
                date={selectedDateStart}
                title="Fecha inicio"
              />
            </div>

            <div>
              <Calendar
                setDate={handleChangeDateEnd}
                date={selectedDateEnd}
                title="Fecha final"
              />
            </div>
          </div>
        </div>

        <form
          className="sm:max-w-sm mt-4 mb-4"
          onSubmit={handleFechaPeriodos}
          method="POST"
        >
          <SubmitButton buttonText="Guardar" />
        </form>
      </div>
    </div>
  );
}
