export interface TypeTareaFecha {
  id: string;
  fecha: string;
  calificacion: number;
}

export interface StudentTarea {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  noLista: number;
}

export interface ItemStudentTarea extends StudentTarea {
  calificacion: number;
}
