export class ResponseCredentials {
    id: number;
    password: string;
    userName: string;

    constructor(id: number, password: string, userName: string) {
        this.id = id;
        this.password = password;
        this.userName = userName;
    }

    toString(): string {
        return JSON.stringify({
            id: this.id,
            password: this.password,
            userName: this.userName
        });
    }

    static fromStringToJson(jsonString: string): ResponseCredentials {
        const parsed = JSON.parse(jsonString);
        return new ResponseCredentials(parsed.id, parsed.password, parsed.userName);
    }
}
