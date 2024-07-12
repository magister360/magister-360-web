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