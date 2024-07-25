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
