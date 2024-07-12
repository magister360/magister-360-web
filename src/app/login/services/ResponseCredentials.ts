export class ResponseCredentials {
  id: number;
  password: string;
  userName: string;
  cls: string;

  constructor(id: number, password: string, userName: string, cls: string) {
    this.id = id;
    this.password = password;
    this.userName = userName;
    this.cls = cls;
  }

  toString(): string {
    return JSON.stringify({
      id: this.id,
      password: this.password,
      userName: this.userName,
      cls: this.cls,
    });
  }

  static fromStringToJson(jsonString: string): ResponseCredentials {
    const parsed = JSON.parse(jsonString);
    return new ResponseCredentials(
      parsed.id,
      parsed.password,
      parsed.userName,
      parsed.cls
    );
  }
}
