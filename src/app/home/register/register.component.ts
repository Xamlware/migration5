import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RegisterService} from '../../services/register.service';
import {SettingsService} from '../../services/settings.service';
import {ValidationService} from '../../services/validation.service';
import {LocalUser} from '../../interfaces/localUser';
import {NewUser} from '../../interfaces/newUser';
import {Observable} from 'rxjs/Observable';
import {Panel, Button, InputText} from 'primeng/primeng'

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';


@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {
    identityId: string;
    status: string;
    registerMessage: string = "";
    errorMessage: string = "";
    localUser: LocalUser = new LocalUser("", "", "");
    registerForm: FormGroup;
    events: any[] = [];
    isRegistering: boolean = false;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private registerService: RegisterService,
        private settingsService: SettingsService,
        private validationService: ValidationService) {
    }

    ngOnInit() {
        var v = ValidationService;
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.minLength(5), v.emailValidator])],
            password: ['', Validators.compose([Validators.required, v.passwordValidator])],
            confirmPassword: ['', Validators.compose([Validators.required, v.passwordValidator])]
        }); //, {validator: v.passwordCompareValidator});

        this.registerService.getRegistering()
            .subscribe(registering => {
                this.isRegistering = registering,
                    error => {
                        this.registerService.isRegistering = false;
                        var errorObject = JSON.parse(error._body);
                        this.errorMessage = errorObject.error_description;
                        console.log(this.errorMessage)
                    }
            });


        //this.subcribeToFormChanges();
    }

    subcribeToFormChanges() {
        // initialize stream
        //const registerFormValueChanges$ = this.registerForm.valueChanges;

        // subscribe to the stream 
        //registerFormValueChanges$.subscribe(x => this.events.push({ event: 'STATUS CHANGED', object: x }));
    }

    onSubmit() {
        this.errorMessage = "";
        this.localUser.email = this.registerForm.controls['email'].value;
        this.localUser.password = this.registerForm.controls['password'].value;
        this.localUser.confirmPassword = this.registerForm.controls['confirmPassword'].value;

        if (this.localUser.password != this.localUser.confirmPassword) {
            this.errorMessage = "The passwords don't match";
        } else {
            this.registerService.setRegistering(true);
            this.registerUser(this.localUser);
        }
    }

    closeRegisterForm() {
        this.router.navigate([''])
    }


    registerUser(localUser: LocalUser) {
        this.registerService.registerUser(this.localUser)
            .subscribe(
            resp => this.identityId = resp,
            error => { 
                this.registerService.setRegistering(false);
                var errorObject = JSON.parse(error._body);
                this.errorMessage = errorObject.error_description;
                console.log(this.errorMessage);

                if (error._body != undefined && error._body.toString().indexOf("ProgressEvent") < 1) {
                    let arr = error._body.modelState;
                    var errorObject = JSON.parse(error._body);
                    if (errorObject.modelState != undefined) { }
                    errorObject.modelState[""].forEach((m: any) => {
                        if (m.indexOf("is already taken") > 1) {
                            this.errorMessage = "You have already registered this email address";
                        }

                    });
                }
            },
            () => this.completeRegister());
    }

    completeRegister() {
        this.registerService.doVerificationEmail(this.identityId, this.localUser.email);
    }
}