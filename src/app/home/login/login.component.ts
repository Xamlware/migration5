import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { InputText, Button, Panel } from 'primeng/primeng'
import { LocalUser } from '../../interfaces/localUser';
import { LoginService } from '../../services/login.service';
import { ValidationService } from '../../services/validation.service';
import { Token } from '../../interfaces/token';
import { SharedModule } from '../../shared/shared.module';
import { ErrorObject } from '../../interfaces/errorObject';
declare var swal: any;

@Component({
    
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    localUser: LocalUser = new LocalUser("", "", "");
    errorMessage: any;
    errorObject: ErrorObject = new ErrorObject();
    loginMessage: string;
    token: Token;
    value: number = 0;
    isLoggingIn: boolean = false;

    constructor(private router: Router,
        private fb: FormBuilder,
        private validationService: ValidationService,
        private ls: LoginService) {

    }
    ngOnDestroy(): void {

        // if (this.somethingListSubscription != undefined) {
        //     this.somethingListSubscription.unsubscribe();
        // }

    }

    ngOnInit() {
        var v = ValidationService;
        this.loginForm = this.fb.group({
            email: ['jbaird@arsbirder.com', Validators.compose([Validators.required, Validators.minLength(5), v.emailValidator])],
            password: ['J2685978b1*', Validators.compose([Validators.required, v.passwordValidator])]
        });
    }

    changePassword() {
        console.log("going to change");
        this.router.navigate(['/change']);
    }

    forgotPassword() {
        console.log("going to forgot");
        this.router.navigate(['/forgot/"password"']);
    }

    forgotUserName() {
        this.router.navigate(['/forgot/"user"'])
    }

    closeLoginForm() {
        this.router.navigate(['']);
    }

    onSubmit() {
        this.ls.isLoggingIn = true;
        this.isLoggingIn = true;
        this.localUser.email = this.loginForm.controls["email"].value;
        this.localUser.password = this.loginForm.controls["password"].value;
        this.loginMessage = "";
        this.checkUserValidation();

    }

    checkUserValidation() {
        this.ls.getLoggedIn()
            .subscribe(loggedIn => {
                if (loggedIn.error != null || loggedIn.error != undefined || loggedIn.error != "") {
                    this.loginMessage = loggedIn.error;

                } else if (loggedIn.email === "") {
                    this.router.navigate(['/verify']);
                }
                this.ls.isLoggingIn = false;
            });

        this.ls.validateUser(this.localUser);
    }
}
