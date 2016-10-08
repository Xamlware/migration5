import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Response, Headers  } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

//import { UserFactory } from '../../factories/user.factory';
import { Physical } from '../interfaces/physical';
//import { PhysicalFactory } from '../../factories/physical.factory';
import { Calculation } from '../interfaces/calculation';
import { AuthorizationService } from '../services/authorization.service';
import { NutritionixService } from '../services/Nutritionix.service';
import { SettingsService } from '../services/settings.service';
import { ThemeService } from '../services/theme.service';
import { AppMenuService } from '../services/appMenu.service';
import { LocalUser } from '../interfaces/localUser';
import { Token } from '../interfaces/token';
import { Email } from '../interfaces/email';
import { DataResponseObject } from '../interfaces/dataResponseObject';
import { Constants } from '../constants/http.constants';
import { RegisterResponse } from '../interfaces/registerResponse';
import { SharedModule } from '../shared/shared.module';
import { LinkHelper } from '../helpers/link.helper';
import { Observable  } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';
import { LoggedIn } from '../interfaces/loggedIn';


@Injectable()
export class LoginService {
    private loggedIn$: Subject<LoggedIn>;
    private passwordReset$: Subject<boolean>;

    isLoggedIn: boolean;
    // loggedIn: LoggedIn;
    private token: Token = new Token();
    email: Email = new Email("");
    status: boolean;
    isValidated: boolean;
    errorMessage: any;
    registerMessage: string;
    constants: Constants = new Constants();
    user: User;
    dro: DataResponseObject = new DataResponseObject(false, [], "");
    progressBarValue: number = 0;
    isLoggingIn: boolean = false;
    localUser: LocalUser;
    loggedInEmail: string = "";

    constructor(private http: Http,
        private router: Router,
        private ss: SettingsService,
        private themeService: ThemeService,
        private auth: AuthorizationService,
        private as: AppMenuService
        //private nutritionixService: NutritionixService
    ) {
        this.loggedIn$ = <Subject<LoggedIn>>new Subject();
        this.passwordReset$ = <Subject<boolean>>new Subject();
        // this.isLoggedIn = true;
    }

    logOutUser() {
        console.log("logging out");
        localStorage.removeItem("accessToken");
        this.setLoggedIn(new LoggedIn("","",""));
        this.isLoggedIn = false;
        this.router.navigate(["/home"]);
    }

    loginUser(localUser: LocalUser) {
        this.auth.loginUser(localUser)
            .subscribe(
            token => {
                this.token = token
            },
            error => {
                this.isLoggingIn = false;
                var errorObject = JSON.parse(error._body);
                this.errorMessage = errorObject.error_description;
                console.log(this.errorMessage);
                this.setLoggedIn({ email: "", password: "", error: this.errorMessage });

            },
            () => this.completeLogin(localUser));
    }


    completeLogin(localUser: LocalUser) {
        localStorage.setItem("accessToken", this.token.access_token);
        this.setToken(this.token);
        this.setLoggedIn({ email: localUser.email, password: localUser.password, error: this.errorMessage });

        if (this.dro.data != null && this.dro.data[0]) {
            this.ss.setUserSettings(<User>this.dro.data[0]);
            var us = <User>this.dro.data[0];
            this.themeService.setTheme(us.theme);
            this.loggedInEmail = us.emailAddress;
            this.isLoggingIn = false;

            if (us != undefined && (us.firstName === null || us.firstName === "")) {
                this.router.navigate(["/settings"]);
            } else {
                this.router.navigate([""]);
            }
        }
    }

    private extractData(res: Response) {

        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let token: Token = res.json();

        return token || new Token();
    }

  
    setToken(token: Token) {
        this.token = token;
        this.isLoggedIn = token.access_token.length > 0
    }

    getToken(): Token {
        this.isLoggedIn = this.token.access_token.length > 0
        return this.token;
    }

    validateUser(localUser: LocalUser) {
        this.progressBarValue = 25;
        this.errorMessage = "";
        this.email.email = localUser.email;
        localStorage.setItem("email", localUser.email);

        var parm = "validate~~~" + localUser.email + "/"
        var creds = JSON.stringify(this.email);
        var headers = new Headers();
        var t = this.ss.adminToken;
        
        var encrParm = LinkHelper.encryptAdminLink(parm, t)
        headers.append("content-type", this.constants.jsonContentType);

        this.http.post(this.constants.taskUrl + encrParm, { headers: headers })
            .map((response: Response) => {
                var res = response.json();
                var result = <DataResponseObject>response.json();
                return result;
            })
            //.map( res => res.json( ))
            //.do( value => console.log( value))
            .subscribe(
            dro => {
                this.dro = dro
            },
            error => {
                this.isLoggingIn = false;
                var errorObject = JSON.parse(error._body);
                this.errorMessage = errorObject.error_description;
                console.log(this.errorMessage);
            },
            () => this.completeValidateUser(localUser));
    }

    completeValidateUser(localUser: LocalUser) {
        this.isLoggingIn = false;
        if (this.dro != undefined) {
            if (this.dro.errorMessage != null && this.dro.errorMessage != "") {
                if (this.dro.errorMessage === "User not verified") {
                    this.router.navigate(['/verify']);
                } else {
                    this.setLoggedIn({ email: localUser.email, password: localUser.password, error: this.dro.errorMessage });
                }
            }
            else if (this.dro.data[0].email != "") {
                this.loginUser(localUser);
            }
        } else {
            this.setLoggedIn({ email: localUser.email, password: localUser.password, error: this.dro.errorMessage });
        }
    }

    forgotPassword(lu: LocalUser) {
        this.localUser = lu;
        var parm = "Ketof~~~" + lu.email + "/"
        var creds = JSON.stringify(this.email);
        var headers = new Headers();

        headers.append("content-type", this.constants.jsonContentType);
        var t = this.ss.adminToken;
        var encrParm = LinkHelper.encryptAdminLink(parm, t)

        this.http.post(this.constants.taskUrl + encrParm, { headers: headers })
            .map((response: Response) => {
                var res = response.json();
                var result = <DataResponseObject>response.json();
                return result;
            })
            //.map( res => res.json( ))
            //.do( value => console.log( value))
            .subscribe(
            dro => {
                this.dro = dro
            },
            error => {
                this.isLoggingIn = false;
                var errorObject = JSON.parse(error._body);
                this.errorMessage = errorObject.error_description;
                console.log(this.errorMessage);
            },
            () => this.completeForgot(lu));
    }

    completeForgot(lu: LocalUser) {
        var e = this.dro;
    }

    setLoggedIn(loggedIn: LoggedIn): void {
        this.loggedIn$.next(loggedIn);
    }

    getLoggedIn(): Observable<LoggedIn> {
        return this.loggedIn$.asObservable();
    }

    getLoginErrorMessage() {

    }

    verifyEmail(link: string, linkEncrypted: boolean = false) {
        this.errorMessage = "";
        var parm = "Ketove~~~" + link;

        var creds = JSON.stringify(this.email);
        var headers = new Headers();
        headers.append("content-type", this.constants.jsonContentType);
      var t = this.ss.adminToken;
        var encrParm = LinkHelper.encryptAdminLink(parm, t, linkEncrypted)

        return this.http.post(this.constants.taskUrl + encrParm, { headers: headers })
            .map((response: Response) => {
                var res = response.json();
                var result = <DataResponseObject>response.json();

                return result;
            })
    }

    setPasswordReset(passwordReset: boolean): void {
        this.passwordReset$.next(passwordReset);
    }

    getPasswordReset(): Observable<boolean> {
        return this.passwordReset$.asObservable();
    }


    resetPassword(e: string, pw: string, cpw: string, link: string) {
        var parm = "Ketor~~~" + link + "~~~" + pw + "~~~" + e + "/"
        var creds = JSON.stringify(this.email);
        var headers = new Headers();

        headers.append("content-type", this.constants.jsonContentType);
        var t = this.ss.adminToken;
        var encrParm = LinkHelper.encryptAdminLink(parm, t)

        return this.http.post(this.constants.taskUrl + encrParm, { headers: headers })
            .map((response: Response) => {
                var res = response.json();
                var result = <DataResponseObject>response.json();
                return result;
            })

    }


}