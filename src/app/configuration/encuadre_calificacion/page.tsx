"use client";
import Loading from "@/app/components/Loading";

import SubmitButton from "@/app/components/SubmitButton";
import { FormEvent, useState } from "react";
import CheckboxWithSlider from "./conponenents/CheckboxWithSlider";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";
import { handleSubmitEncuadreCalificacion } from "./actions/handleSubmitEncuadreCalificacion";
import { calculateSumEncuadre } from "./actions/sumEncuadreCalificacion";
import useEncuadreCalificacionHook from "./hooks/useEncuadreCalificacionHook";
import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";

export default function EncuadreCalificacion() {
  const {
    isMenuVisible,
    idUsuario,
    grado,
    grupo,
    materia,
    idGrado,
    idGrupo,
    idMateria,
  } = useSidebarContext();
  const [isLoading, setIsLoading] = useState(false);

  const [participaciones, setParticipaciones] = useState({
    isChecked: false,
    value: 0,
  });
  const [tareas, setTareas] = useState({ isChecked: false, value: 0 });
  const [examenes, setExamenes] = useState({ isChecked: false, value: 0 });
  const [proyectos, setProyectos] = useState({ isChecked: false, value: 0 });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isCheckedPuntosExtra, setIsCheckedPuntosExtra] = useState(false);
  const [isCheckedRedondear, setIsCheckedRedondear] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);

  const handleCheckboxChange1 = () => {
    setIsCheckedPuntosExtra(!isCheckedPuntosExtra);
  };

  const handleCheckboxChange2 = () => {
    setIsCheckedRedondear(!isCheckedRedondear);
  };

  const handleParticipacionesChange = (isChecked: boolean, value: number) => {
    setParticipaciones({ isChecked, value });
  };

  const handleTareasChange = (isChecked: boolean, value: number) => {
    setTareas({ isChecked, value });
  };

  const handleExamenesChange = (isChecked: boolean, value: number) => {
    setExamenes({ isChecked, value });
  };

  const handleProyectosChange = (isChecked: boolean, value: number) => {
    setProyectos({ isChecked, value });
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const userId = idUsuario ?? -1;

    const result = await handleSubmitEncuadreCalificacion({
      userId,
      idGrado,
      idGrupo,
      idMateria,
      participaciones,
      tareas,
      examenes,
      proyectos,
      sum,
      isCheckedPuntosExtra,
      isCheckedRedondear,
      id,
    });

    if (result.success) {
      setSuccessMessage(result.message);
      setIsSuccessModalOpen(true);
    } else {
      setErrorMessage(result.message);
      setIsErrorModalOpen(true);
    }
  };

  const sum = calculateSumEncuadre({
    participaciones,
    tareas,
    examenes,
    proyectos,
  });

  useEncuadreCalificacionHook(
    idGrado,
    idGrupo,
    idMateria,
    idUsuario,
    setParticipaciones,
    setTareas,
    setExamenes,
    setProyectos,
    setIsCheckedPuntosExtra,
    setIsCheckedRedondear,
    setId
  );

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
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

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div
        className={`mt-16 mr-4  
                ${isMenuVisible ? "ml-72" : "ml-4"}`}
      >
        <h3 className="mt-2 block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2">
          Encuadre calificación
        </h3>
        <div className="mb-4">
          <InfoCardDateGGM grado={grado} grupo={grupo} materia={materia} />
        </div>

        <div
          className="rounded-lg shadow  
                        sm:max-w-xl  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-4"
        >
          <CheckboxWithSlider
            label="Participaciones"
            onValueChange={handleParticipacionesChange}
            initialChecked={participaciones.isChecked}
            initialValue={participaciones.value}
          />
          <CheckboxWithSlider
            label="Tareas"
            onValueChange={handleTareasChange}
            initialChecked={tareas.isChecked}
            initialValue={tareas.value}
          />
          <CheckboxWithSlider
            label="Examenes"
            onValueChange={handleExamenesChange}
            initialChecked={examenes.isChecked}
            initialValue={examenes.value}
          />
          <CheckboxWithSlider
            label="Proyectos"
            onValueChange={handleProyectosChange}
            initialChecked={proyectos.isChecked}
            initialValue={proyectos.value}
          />

          <div className="mt-4 flex justify-end items-end">
            <div className="mr-4">
              <label
                htmlFor="small"
                className="block text-sm font-medium text-gray-900
                         dark:text-white"
              >
                Total
              </label>
            </div>
            <div>
              <label
                htmlFor="small"
                className={`text-3xl font-light ${
                  sum > 100 ? "text-red-500" : "text-gray-900 dark:text-white"
                }`}
              >
                {sum}%
              </label>
            </div>
          </div>

          <div className="mt-2 mb-4">
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Puntos extras
            </label>
            <div className="flex items-center space-x-3 sm:max-w-full">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="toggle-1"
                  className="sr-only peer"
                  checked={isCheckedPuntosExtra}
                  onChange={handleCheckboxChange1}
                />
                <div
                  className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4
            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer
            dark:bg-gray-700 peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-['']
            after:absolute after:top-[2px] after:left-[2px] after:bg-white
            after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7
            after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="toggle-2"
                  className="sr-only peer"
                  checked={isCheckedRedondear}
                  onChange={handleCheckboxChange2}
                />
                <div
                  className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4
            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer
            dark:bg-gray-700 peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-['']
            after:absolute after:top-[2px] after:left-[2px] after:bg-white
            after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7
            after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Redondear al entero
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  más próximo
                </span>
              </div>
            </div>
          </div>

          <SubmitButton buttonText="Guardar" additionalClassName=" max-w-sm" />
        </div>
      </div>
    </form>
  );
}
