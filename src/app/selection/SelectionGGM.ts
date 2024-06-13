export class SelectionGGM {
    idGrado: number;
    grado: string;
    idGrupo: number;
    grupo: string;
    idMateria: number;
    materia: string;


    constructor(
        idGrado: number,
        grado: string,
        idGrupo: number,
        grupo: string,
        idMateria: number,
        materia: string) {
        this.idGrado = idGrado;
        this.grado = grado;
        this.idGrupo = idGrupo;
        this.grupo = grupo;
        this.idMateria = idMateria;
        this.materia = materia;
    }

    toJson(): string {
        return JSON.stringify({
            idGrado: this.idGrado,
            grado: this.grado,
            idGrupo: this.idGrupo,
            grupo: this.grupo,
            idMateria: this.idMateria,
            materia: this.materia
        });
    }

    static fromStringToJson(jsonString: string): SelectionGGM {
        const parsed = JSON.parse(jsonString);
        return new SelectionGGM(
            parsed.idGrado,
            parsed.grado,
            parsed.idGrupo,
            parsed.grupo,
            parsed.idMateria,
            parsed.materia);
    }
}
