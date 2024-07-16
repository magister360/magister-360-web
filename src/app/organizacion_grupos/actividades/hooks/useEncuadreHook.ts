import { useEffect, useState } from "react";
import { getEncuadre } from "../controller/EncuadreContoller";

const useEncuadreHook = (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  idUsuario: number | undefined
) => {
  const [isParticipacion, setIsParticipacion] = useState<boolean>(false);
  const [isTarea, setIsTarea] = useState<boolean>(false);
  const [isExamenes, setIsExamenes] = useState<boolean>(false);
  const [isProyectos, setIsProyectos] = useState<boolean>(false);
  const [isCheckedPuntosExtra, setIsCheckedPuntosExtra] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchEncuadreCalificacion = async () => {
      const userId = idUsuario ?? -1;
      const result = await getEncuadre(
        idGrado ?? -1,
        idGrupo ?? -1,
        idMateria ?? -1,
        userId
      );

      const jsonData = result?.json ? JSON.parse(result.json) : null;

      if (jsonData) {
        setIsParticipacion(jsonData.participaciones.isChecked);
        setIsTarea(jsonData.tareas.isChecked);
        setIsExamenes(jsonData.examenes.isChecked);
        setIsProyectos(jsonData.proyectos.isChecked);
      }

      const jsonpuntosExtra = result?.puntosExtra
        ? JSON.parse(result.puntosExtra)
        : null;
      if (jsonpuntosExtra) {
        setIsCheckedPuntosExtra(jsonpuntosExtra.isCheckedPuntosExtra);
      }
    };

    if (
      idGrado !== undefined &&
      idGrupo !== undefined &&
      idMateria !== undefined &&
      idUsuario !== undefined
    ) {
      fetchEncuadreCalificacion();
    }
  }, [idGrado, idGrupo, idMateria]);

  return {
    isParticipacion,
    isTarea,
    isExamenes,
    isProyectos,
    isCheckedPuntosExtra,
  };
};

export default useEncuadreHook;
