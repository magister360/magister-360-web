export interface TypeProyectoFecha {
  id: string;
  fecha: string;
  calificacion: number;
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