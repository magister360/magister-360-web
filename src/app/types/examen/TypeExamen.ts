export interface TypeExamenPeriodo {
    id: string;
    noPeriodo: string;
    calificacion: number;
  }
  
  export interface TypeExamenCalificacion {
    id: string;
    noPeriodo: string;
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
  