import {
  EstatusExamenType,
  EstatusParticipacionType,
  EstatusProyectoType,
  EstatusPuntoExtraType,
  EstatusTareaType,
} from "@/app/estatus/EstatusType";
import {
  countParticipaciones,
  getParticipaciones,
} from "../controller/ParticipacionController";
import { countProyectos, getProyectos } from "../controller/ProyectoController";
import { countTareas, getTareas } from "../controller/TareaController";
import { getExamenes } from "../controller/ExamenController";
import { getPuntoExtra } from "../controller/PuntoExtraController";

const actionFetch = async (
  idUsuario: number | undefined,
  idMateria: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined,
  noPeriodo: number | undefined,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);

  const result = await getParticipaciones(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusParticipacionType.OK
  );
  const countParticipacion = await countParticipaciones(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusParticipacionType.OK
  );

  const resultProyectos = await getProyectos(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusProyectoType.OK
  );
  const countProyecto = await countProyectos(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusProyectoType.OK
  );


  const resultTareas = await getTareas(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusTareaType.OK
  );
  const countTarea = await countTareas(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusTareaType.OK
  );

  const resultExamen = await getExamenes(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    noPeriodo,
    EstatusExamenType.OK
  );
  const resultPuntosExtras = await getPuntoExtra(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusPuntoExtraType.OK
  );

  setIsLoading(false);
};

export default actionFetch;
