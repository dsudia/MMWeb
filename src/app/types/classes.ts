export class RegistrationUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confpass: string;
    username: string;
    isTeacher: boolean;
    id: string;
    constructor(isTeacher: boolean, id: string, lastName?: string) {
      this.isTeacher = isTeacher;
      this.id = id;
    }
}

export class Parameters {
    name: string;
    value: string;
}
