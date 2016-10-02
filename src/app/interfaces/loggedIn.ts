export interface ILoggedIn {
  email: string;
  password: string;
  error: string;
}

export class LoggedIn implements ILoggedIn {
  email: string;
  password: string;
  error: string

  constructor(email: string, password: string, error: string) {
    this.email = email;
    this.password = password;
    this.error = error; 
  }
}