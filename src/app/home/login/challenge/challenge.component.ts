import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SelectItem, Dropdown, Button, Panel } from 'primeng/primeng'

import { ChallengeQuestions } from '../../../interfaces/challengeQuestions';
import { ChallengeService } from '../../../services/challenge.service';

@Component({
  
  templateUrl: 'challenge.component.html',
  styleUrls: ['challenge.component.css']
})

export class ChallengeComponent implements OnInit {
  challengeForm: FormGroup;
  questions = new ChallengeQuestions();
  questionList: SelectItem[] = [];
  // questionList2: SelectItem[] = [];
  // questionList3: SelectItem[] = [];


  constructor(private cs: ChallengeService,
    private fb: FormBuilder) {
      console.log("in challenge");
  }

  ngOnInit() {
    debugger;
    this.cs.getQuestions().forEach(t => this.questionList.push({ label: t.question, value: t.id }));
    // this.questionList2 = this.questionList1;
    // this.questionList3 = this.questionList1;


    this.challengeForm = this.fb.group({
      question1: ['', Validators.compose([Validators.required])],
      question2: ['', Validators.compose([Validators.required])],
      question3: ['', Validators.compose([Validators.required])],
      answer1: ['', Validators.compose([Validators.required])],
      answer2: ['', Validators.compose([Validators.required])],
      answer3: ['', Validators.compose([Validators.required])]
    });
  }
}
