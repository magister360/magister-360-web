import { useEffect } from "react";
import { getEncuadreCalificacion } from "../controller/EncuadreCalificacionController";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

const useEncuadreCalificacion = (
  setParticipaciones: React.Dispatch<
    React.SetStateAction<{ isChecked: boolean; value: number }>
  >,
  setTareas: React.Dispatch<
    React.SetStateAction<{ isChecked: boolean; value: number }>
  >,
  setExamenes: React.Dispatch<
    React.SetStateAction<{ isChecked: boolean; value: number }>
  >,
  setProyectos: React.Dispatch<
    React.SetStateAction<{ isChecked: boolean; value: number }>
  >,
  setIsCheckedPuntosExtra: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCheckedRedondear: React.Dispatch<React.SetStateAction<boolean>>,
  setId: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { idGrado, idGrupo, idMateria, idUsuario } = useSidebarContext();
  useEffect(() => {
    setIsLoading(true)
    const fetchEncuadreCalificacion = async () => {
      const result = await getEncuadreCalificacion(
        idGrado,
        idGrupo,
        idMateria,
        idUsuario
      );

      if (result?.id) {
        setId(result.id);
      } else {
        setId(undefined);
      }

      const jsonData = result?.json ? JSON.parse(result.json) : null;

      if (jsonData) {
        setParticipaciones(jsonData.participaciones);
        setTareas(jsonData.tareas);
        setExamenes(jsonData.examenes);
        setProyectos(jsonData.proyectos);
      } else {
        setParticipaciones({ isChecked: false, value: 0 });
        setTareas({ isChecked: false, value: 0 });
        setExamenes({ isChecked: false, value: 0 });
        setProyectos({ isChecked: false, value: 0 });
      }

      const jsonpuntosExtra = result?.puntosExtra
        ? JSON.parse(result.puntosExtra)
        : null;
      if (jsonpuntosExtra) {
        setIsCheckedPuntosExtra(jsonpuntosExtra.isCheckedPuntosExtra);
        setIsCheckedRedondear(jsonpuntosExtra.isCheckedRedondear);
      } else {
        setIsCheckedPuntosExtra(false);
        setIsCheckedRedondear(false);
      }
      setIsLoading(false)
    };

    if (
      idGrado !== undefined &&
      idGrupo !== undefined &&
      idMateria !== undefined &&
      idUsuario !== undefined
    ) {
      fetchEncuadreCalificacion();
    }
  }, [idGrado, idGrupo, idMateria, idUsuario]);
};

export default useEncuadreCalificacion;
