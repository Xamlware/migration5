import {Component, OnInit, Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import {Router} from '@angular/router';
import {LocalUser} from '../interfaces/localUser';
import {Token} from '../interfaces/token';
import {RegisterResponse} from '../interfaces/registerResponse';
import {Constants} from '../constants/http.constants';
import {Observable} from 'rxjs/Observable';
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
 
@Injectable()
export class AuthorizationService {
    isLoggedIn: boolean;
    registerResponse = new RegisterResponse();
    errorMessage: string
    constants: Constants = new Constants();

    constructor(private http: Http) {
     }

    loginUser(localUser: LocalUser): Observable<Token> {
        var email = localUser.email;
        var password = localUser.password;

        var headers = new Headers();
        headers.append("content-type", this.constants.formEncodedContentType);
 
        var creds:string = this.constants.grantString + email + this.constants.passwordString + password;
        return this.http.post(this.constants.tokenUrl, creds, { headers: headers })
             .map(res => res.json())
    }
 
    registerUser(localUser: LocalUser) {
        var headers = new Headers();
        headers.append('Content-Type', this.constants.jsonContentType);
        var creds = JSON.stringify(localUser);

        return this.http.post(this.constants.accountUrl + "Register", creds, { headers: headers })
            .map(res => res.json());
    }
}