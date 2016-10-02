export interface ILocalUser {
    email: string;
    password: string;
    confirmPassword: string;
}

export class LocalUser implements ILocalUser {
    email: string;
    password: string;
    confirmPassword: string;
   
    constructor(email: string, password: string, confirmPassword: string) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}