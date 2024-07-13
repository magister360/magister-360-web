import { useEffect } from "react";
import { getEncuadreCalificacion } from "../controller/EncuadreCalificacionController";

const useEncuadreCalificacion = (
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  idUsuario: number | undefined,
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
  setId: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  useEffect(() => {
    const fetchEncuadreCalificacion = async () => {
      console.log("idGrado " + idGrado);
      console.log("idGrupo " + idGrupo);
      console.log("idMateria " + idMateria);
      const userId = idUsuario ?? -1;
      const result = await getEncuadreCalificacion(
        idGrado,
        idGrupo,
        idMateria,
        userId
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
      }else{
        setIsCheckedPuntosExtra(false);
        setIsCheckedRedondear(false);
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
};

export default useEncuadreCalificacion;
