export interface StudentPuntoExtra {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  noLista: number;
}

export interface ItemStudentPuntoExtra extends StudentPuntoExtra {
  calificacion: number;
}
