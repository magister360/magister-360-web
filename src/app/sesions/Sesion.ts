export class Sesion {
    id: number;
    userName: string;

    constructor(id: number, userName: string) {
        this.id = id;
        this.userName = userName;
    }

     toJson(): string {
        return JSON.stringify({
            id: this.id,
            userName: this.userName,

        });
    }

    static fromStringToJson(jsonString: string): Sesion {
        const parsed = JSON.parse(jsonString);
        return new Sesion(parsed.id, parsed.user);
    }
}
