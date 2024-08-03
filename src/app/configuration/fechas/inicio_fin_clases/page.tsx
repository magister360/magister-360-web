"use client";
import Calendar from "@/app/components/Calendar";
import SubmitButton from "@/app/components/SubmitButton";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { useState } from "react";
import { createFechaInicioFinClases } from "./controller/ClasesController";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";
import useClases from "./hooks/useClases";
import type { InicioFinClases } from "@/app/types/inicio_fin_clases/TypeInicioFinClases";

export default function InicioFinClases() {
  const { idUsuario, isMenuVisible } = useSidebarContext();
  const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(null);
  const [id, setId] = useState<number | undefined>(undefined);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFetch, setIsFetch] = useState<boolean>(true);
  const [inicioFinClases, setInicioFinClases] =
    useState<InicioFinClases | null>(null);
  const [loading, setLoading] = useState(true);

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

  useClases({
    setLoading,
    isFetch,
    setIsFetch,
    setInicioFinClases,
    setId
  });

  const handleFechaInicioFinClases = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const result = await createFechaInicioFinClases(
      id,
      selectedDateStart,
      selectedDateEnd,
      idUsuario
    );
    if (result.success) {
      setSuccessMessage(result.message);
      setIsSuccessModalOpen(true);
    } else {
      setErrorMessage(result.message);
      setIsErrorModalOpen(true);
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

  return (
    <div
      className={`mt-16 mr-4  
                  ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h3 className="block text-gray-700 dark:text-gray-200 font-bold text-xl pt-0 ">
        Fechas de inicio y fin de clases
      </h3>

      <div className="dark:bg-[#18181B] bg-white p-4 mt-4 mb-14 rounded-lg ">
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
        <form
          className="sm:max-w-sm mt-4 mb-4"
          onSubmit={handleFechaInicioFinClases}
          method="POST"
        >
          <SubmitButton buttonText="Guardar" />
        </form>
      </div>
    </div>
  );
}
