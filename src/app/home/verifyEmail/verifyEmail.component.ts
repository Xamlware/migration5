import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {InputText, Button} from 'primeng/primeng'
import {LoginService} from '../../services/login.service';
import {SettingsService} from '../../services/settings.service';
//import {VerifyLink} from '../../interfaces/verifyLink';
import {DataResponseObject} from '../../interfaces/dataResponseObject';

//import {LinkHelper} from '../../helpers/link.helper';


@Component({

  templateUrl: 'verifyEmail.component.html',
  styleUrls: ['verifyEmail.component.css']
})
export class VerifyEmailComponent implements OnInit {
  validationCode: string;
  apiResults: DataResponseObject;
  errorMessage: string;
  isSuccess: boolean;
  isComplete: boolean;

  constructor(private fb: FormBuilder,
    private ls: LoginService,
    private ss: SettingsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.validationCode = route.snapshot.params['id'];
  }

  ngOnInit() {
    //"066a62616972640c78616d6c776172652e636f6df9a04d2a08006b71864a0d61025b7960fe0d2c5cbbf5"

    console.log("getting verify results");
    // var vel = new LinkHelper().decryptEmail(this.validationCode)
    this.ss.getIsAdminToken()
      .subscribe(adminToken => {
console.log("going to verify email");
        if (adminToken) {
          this.ls.verifyEmail(this.validationCode, true)
            .subscribe(
            apiResults => this.apiResults = <DataResponseObject>apiResults,
            error => this.errorMessage = error,
            () => this.completeApiDataGet());
        }
      });


  }

  close() {
    this.router.navigate(["/challenge"]);
  }

  completeApiDataGet() {
    this.isSuccess = this.apiResults.succeeded;
    this.errorMessage = this.apiResults.errorMessage;
    this.isComplete = true;
  }

  onSubmit() {
  }
}


