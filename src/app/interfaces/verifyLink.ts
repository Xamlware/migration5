export class VerifyLink {
  id: string;
  email: string;
  time: string;
  date: string;

  constructor(id: string, email: string, time: string, date: string) {
    this.id = id;
    this.email = email;
    this.time = time;
    this.date = date;
  }
}