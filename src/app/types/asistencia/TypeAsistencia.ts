export interface StudenAsistenciaType {
  id: string;
  noLista: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface AStudenAsistenciaType extends StudenAsistenciaType {
  asistencia: string;
}

export type AsistenciaFecha = {
  id: string;
  fecha: string;
  asistencia: string;
  estatus: number;
  idAlumno: string;
  idUsuario: number;
  idMateria: number;
};
