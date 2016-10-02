import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Panel, Button, InputText } from 'primeng/primeng'

import { ValidationService } from '../../../services/validation.service';
import { LoginService } from '../../../services/login.service';
import { LocalUser } from '../../../interfaces/localUser';


@Component({
  templateUrl: 'forgot.component.html',
  styleUrls: ['forgot.component.css']
})


export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;
  emailSent: boolean;
  request: string;


  constructor(private fb: FormBuilder,
              private ls: LoginService,
              private r: Router,
              private ar: ActivatedRoute ) { 

      this.request = ar.snapshot.params['id'];
  }

  ngOnInit() {
    this.emailSent = false;
    var v = ValidationService;

    this.forgotForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.minLength(5), v.emailValidator])]
        }); //, {v
  }

  onSubmit() {
    var localUser = new LocalUser(this.forgotForm.value.email, "", "");
    this.ls.forgotPassword(localUser);
    this.emailSent = true;
  }

  close() {
    this.r.navigate(['/home']);
  }
}
