export interface TypeProyectoFecha {
  id: string;
  fecha: string;
  calificacion: number;
}

export interface TypeProyectoCalificacion {
  id: string;
  fecha: string;
  calificacion: number;
  noLista: number;
}

export interface StudentProyecto {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  noLista: number;
}

export interface ItemStudentProyecto extends StudentProyecto {
  calificacion: number;
}

export type StudentProyectoType = {
  id: string;
  noLista: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
};
