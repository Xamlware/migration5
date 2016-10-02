import { ChallengeQuestion } from './challengeQuestion';


export class ChallengeQuestions {
  questions: ChallengeQuestion[];

  constructor() {
    this.questions = this.getQuestions();
  }
  
  getQuestions() : ChallengeQuestion[] {
    var questionArray: ChallengeQuestion[] = [];

    questionArray.push(new ChallengeQuestion(0, "", ""))
    questionArray.push(new ChallengeQuestion(1, "What was your first pet's name?", ""))
    questionArray.push(new ChallengeQuestion(2, "What was the name of the street where you lived as a child?", ""))
    questionArray.push(new ChallengeQuestion(3, "What was the model of your first car?", ""))
    questionArray.push(new ChallengeQuestion(4, "What is your mother's maiden name?", ""))
    questionArray.push(new ChallengeQuestion(5, "What was your highschool mascot?", ""))
    questionArray.push(new ChallengeQuestion(6, "What was your first job?", ""))
    questionArray.push(new ChallengeQuestion(7, "What is your favorite doctor's name?", ""))
    questionArray.push(new ChallengeQuestion(8, "Where was your father born?", ""))
    questionArray.push(new ChallengeQuestion(9, "What is your favorite drink?", ""))
    questionArray.push(new ChallengeQuestion(10, "What is your favorite book?", ""))
    
    return questionArray;
  }

}