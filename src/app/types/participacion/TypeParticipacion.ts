export interface TypeParticipacionFecha {
  id: string;
  fecha: string;
  calificacion: number;
}

export interface TypeParticipacionCalificacion {
  id: string;
  fecha: string;
  calificacion: number;
  noLista: number;
}

export type StudenParticipacionType = {
  id: string;
  noLista: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
};
