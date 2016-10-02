import {Component, OnInit, Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import {Router} from '@angular/router';
import {User} from '../interfaces/user';
import {UserFactory} from '../factories/user.factory';
import {Physical} from '../interfaces/physical';
import {PhysicalFactory} from '../factories/physical.factory';
import {Calculation} from '../interfaces/calculation';
import {AuthorizationService} from '../services/authorization.service';
import { SettingsService } from '../services/settings.service';
import { LinkHelper } from '../helpers/link.helper'
import {LocalUser} from '../interfaces/localUser';
import {Token} from '../interfaces/token';
import {RegisterResponse} from '../interfaces/registerResponse';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Constants} from '../constants/http.constants';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';


@Injectable()
export class RegisterService {
        constants: Constants = new Constants();
        isLoggedIn: boolean;
        private token: Token = new Token();
        status: any;
        errorMessage: any;
        registerMessage: string;
        isRegistering: boolean = false;
        private registering$: Subject<boolean>;


        constructor(private router: Router,
                private http: Http,
                private authorizationService: AuthorizationService,
                private ss: SettingsService ) {

                this.registering$ = <Subject<boolean>>new Subject();
        }

        registerUser(localUser: LocalUser) {
                this.setRegistering(true);
                return this.authorizationService.registerUser(localUser);
                // completeLogin() {
                //     console.log('access token = ' + this.token.access_token);
                //     this.router.navigate(['']);
        }

        doVerificationEmail(identityId: string, email: string) {
                //issue verify code and email to user.
                //when user verifies mark record isVerified.
                var headers = new Headers();
                headers.append("content-type", this.constants.jsonContentType);
                
                localStorage.setItem("email", email);
                // var s = localStorage.getItem("adminToken");
                // console.log("log token = " + s);
                // headers.append("Authorization", "Bearer " + s);
                var parm = "Ketov~~~" + identityId + "~~~" + email + "/"
                var t = this.ss.adminToken;
                var encrParm = LinkHelper.encryptAdminLink(parm, t)

                this.http.post(this.constants.taskUrl + encrParm, { headers: headers })
                        .map((response: Response) => <User>response.json())
                        .subscribe(
                        status => this.status = status,
                        error => {
                                this.setRegistering(false);
                                var errorObject = JSON.parse(error._body);
                                this.errorMessage = errorObject.error_description;
                                console.log(this.errorMessage);
                        },
                        () => {
                                this.setRegistering(false);
                                this.router.navigate(["/verify"]);
                        });

        }

        setRegistering(registering: boolean): void {
                this.registering$.next(registering);
        }

        getRegistering(): Observable<boolean> {
                return this.registering$.asObservable();
        }

}