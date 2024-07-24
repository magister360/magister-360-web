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

export interface TypePuntoExtraCalificacion {
  id: string;
  fecha: string;
  calificacion: number;
  noLista: number;
}

export type StudenPuntoExtraType = {
  id: string;
  noLista: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
};