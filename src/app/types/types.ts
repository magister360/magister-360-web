export interface ItemMateria {
  id: number;
  materia: string;
  estatus: number;
  regDate: Date;
  idUsuario: number;
}

export type ItemGrupo = {
  id: number;
  grupo: string;
  estatus: number;
  regDate: Date;
  idUsuario: number;
};

export type ItemGrado = {
  id: number;
  grado: string;
  estatus: number;
  regDate: Date;
  idUsuario: number;
};

export type StudentType = {
  id: string;
  noLista: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  codigoBarras: string;
  estatus: number;
  foto: Buffer;
  regDate: Date;
  idUsuario: number;
  idGrado: number;
  idGrupo: number;
};

export type ItemAlumnoMateria = {
  id: string;
  regDate: Date;
  idAlumno: string;
  idMateria: number;
};

export type MaterialDidacticoType = {
  id: string;
  url: string;
  titulo: string;
  descripcion: string;
  miniatura: Buffer;
  regDate: Date;
  tipo: string;
};

export type FileInfo = {
  name: string;
  path: string;
  extension: string;
  tipo: string;
};

export interface StudentParticipacion {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  noLista: number;
}

export interface ItemStudentParticipacion extends StudentParticipacion {
  calificacion: number;
}

export type StudentAsitencia ={
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  noLista: number;
  foto: Buffer;
}

export interface ItemStudentAsistencia extends StudentAsitencia {
  A: string;
}

export interface User {
  user: string;
  password: string;
  correo?: string;
  foto?: string;
  cls: string;
  estatus?: number;
}