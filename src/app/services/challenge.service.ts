import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import {Router} from '@angular/router';

import { ChallengeQuestion } from '../interfaces/challengeQuestion';
import { ChallengeQuestions } from '../interfaces/challengeQuestions';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class ChallengeService {
  questions: ChallengeQuestions = new ChallengeQuestions();

  constructor(private router: Router) {
  }

  getQuestions() {
    return this.questions.getQuestions();
  }
//'Access-Control-Allow-Origin': '*'

}