export class ChallengeQuestion {
  id: number;
  question: string;
  answer: string;

  constructor(id: number, question: string, answer: string) {
    this.id = id;
    this.question = question;
    this.answer = answer;
  }
}
