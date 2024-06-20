
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
}

export type ItemGrado = {
    id: number;
    grado: string;
    estatus: number;
    regDate: Date;
    idUsuario: number;
}

export type ItemAlumno = {
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

}