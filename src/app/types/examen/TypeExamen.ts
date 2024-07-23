export interface TypeExamenPeriodo {
    id: string;
    noPeriodo: string;
    calificacion: number;
  }
  
  export interface TypeExamenCalificacion {
    id: string;
    fecha: string;
    calificacion: number;
    noLista: number;
  }
  
  export type StudentExamenType = {
    id: string;
    noLista: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  };
  