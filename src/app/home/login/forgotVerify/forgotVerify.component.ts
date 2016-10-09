import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Panel, Button, InputText } from 'primeng/primeng'

import {RegisterService} from '../../../services/register.service';
import {ValidationService} from '../../../services/validation.service';
import { LoginService } from '../../../services/login.service';
import { DataResponseObject } from '../../../interfaces/dataResponseObject';
import { VerifyLink } from '../../../interfaces/verifyLink';
import { LinkHelper } from '../../../helpers/link.helper';

@Component({
  
  templateUrl: 'forgotVerify.component.html',
  styleUrls: ['forgotVerify.component.css']
})


export class ForgotVerifyComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorMessage: string;
  isReset: boolean;
  dro: DataResponseObject;
  link: string;
  dl: VerifyLink;

  constructor(private rs: RegisterService,
              private fb: FormBuilder,
              private ls: LoginService,
              private ar: ActivatedRoute,
              private router: Router) {

    this.link =ar.snapshot.params['id'];
    this.dl = LinkHelper.decryptLink(ar.snapshot.params['id']);
    console.log("link: ", this.link)
  }



  ngOnInit() {
    this.isReset = false;
    console.log("init");

    var v = ValidationService;
    var e = this.dl.email;
    this.resetPasswordForm = this.fb.group({
      email: [{value: e, disabled: true}, [Validators.required, Validators.minLength(5), v.emailValidator]],
      password: ['', [Validators.required, v.passwordValidator]],
      confirmPassword: ['', [Validators.required, v.passwordValidator]]
    });
  }

  onSubmit() {
    this.errorMessage = "";
    var email = this.resetPasswordForm.controls['email'].value;
    var password = this.resetPasswordForm.controls['password'].value;
    var confirmPassword = this.resetPasswordForm.controls['confirmPassword'].value;

    if (password != confirmPassword) {
      this.errorMessage = "The passwords don't match";
    } else {
      this.resetPassword(email, password, confirmPassword);
    }
  }

  resetPassword(e: string, pw: string, cpw: string) {

    // this.ls.getPasswordReset()
    //   .subscribe(reset => {
    //     this.isReset = reset,
    //       error => {
    //         this.ls.isRegistering = false;
    //         var errorObject = JSON.parse(error._body);
    //         this.errorMessage = errorObject.error_description;
    //         console.log(this.errorMessage)
    //       }
    //   });

    this.ls.resetPassword(e, pw, cpw, this.link)
      .subscribe(
      dro => {
        this.dro = dro
      },
      error => {
        var errorObject = JSON.parse(error._body);
        this.errorMessage = errorObject.error_description;
        console.log(this.errorMessage);
      },
      () => this.completeReset());
  }

  completeReset() {
    this.isReset = true;
    var e = this.dro;
  }
}
