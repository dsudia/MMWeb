export class RegistrationUser {
    id: string
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confpass: string;
    username: string;
    isTeacher: boolean;
    constructor(id: string, isTeacher: boolean, lastName?: string) {
      this.isTeacher = isTeacher;
      this.id = id;
      if (lastName) {
        this.lastName = lastName;
      }
    }
}

export class Parameters {
    name: string;
    value: string;
}
