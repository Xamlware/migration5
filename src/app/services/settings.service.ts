import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Response, Headers  } from '@angular/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../interfaces/user';
import { UserFactory } from '../factories/user.factory';
import { Physical } from '../interfaces/physical';
import { PhysicalFactory } from '../factories/physical.factory';
import { Blood } from '../interfaces/blood';
import { Lipid } from '../interfaces/lipid';
import { Calculation } from '../interfaces/calculation';
import { LocalUser } from '../interfaces/localUser';
import { Nutrient } from '../interfaces/nutrient';
import { Constants } from '../constants/http.constants';
import { CalculationFactory } from '../factories/calculation.factory';
import { AuthorizationService } from '../services/authorization.service';
import { Token } from '../interfaces/token';
import { NewUser } from '../interfaces/newUser';
import { DailyFood } from '../interfaces/dailyFood';
import { FindHelper } from '../helpers/find.helper';
import { LinkHelper } from '../helpers/link.helper';
import { DataResponseObject } from '../interfaces/dataResponseObject';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';

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
export class SettingsService {

  private token = '';
  constants: Constants = new Constants();
  errorMessage: string
  statusMessage: User;
  userSettings: User;
  selectedPhysical: Physical;
  selectedLipid: Lipid;
  selectedBlood: Blood;
  selectedCalculation: Calculation;
  adminToken: string;
  accessToken: string;
  newUser: NewUser;
  dro: DataResponseObject;
  private isAdminToken$: Subject<boolean>;


  constructor(private http: Http,
    private auth: AuthorizationService) {
    console.log("settings service");
    this.getAdminToken();
    this.isAdminToken$ = <Subject<boolean>>new Subject();

  }

  getUserId() : number {
    return this.userSettings.pK_User;    
  }

  getAdminToken() {
    var headers = new Headers();
    headers.append("content-type", this.constants.jsonContentType);
    //headers.append("Authorization", "Bearer " + this.accessToken);
    var encrParm = "FFF05" + LinkHelper.encryptString("Ketoa");
    console.log(this.constants.taskUrl + encrParm);
   
    this.http.post(this.constants.taskUrl + encrParm, { headers: headers })
      .map((response: Response) => <DataResponseObject>response.json())
      .catch(this.handleError)
      .subscribe(dro => this.dro = dro,
      error => {
        this.errorMessage = error
      },
      () => this.completeGetAdminToken()
      );
  }

  completeGetAdminToken() {
    if (this.dro != null && this.dro.data != null && this.dro.data.length > 0) {
      this.adminToken = this.dro.data[0]
      console.log("got admin token")
      this.setIsAdminToken(true);
    }
  }

  setIsAdminToken(isAdminToken: boolean): void {
    this.isAdminToken$.next(isAdminToken);
  }

  getIsAdminToken(): Observable<boolean> {
    return this.isAdminToken$.asObservable();
  }


  getSettingsData(userId: number): Observable<User> {
    var headers = new Headers();
    headers.append('Content-Type', this.constants.jsonContentType);
    // headers.append("Access-Control-Allow-Origin", "*");
    // headers.append("Access-Control-Request-Method", "GET");

    var s = localStorage.getItem("accessToken");
    headers.append("Authorization", "Bearer " + s);


    return this.http.get(this.constants.userUrl + userId, { headers: headers })
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
  }

  createNewUser(newUser: NewUser) {
    this.newUser = newUser;

    this.accessToken = localStorage.getItem("adminToken");
    if (this.accessToken === undefined || this.accessToken === "") {
      this.finishNewUser();
    }
  }


  finishNewUser() {
    var headers = new Headers();
    headers.append("content-type", this.constants.formEncodedContentType);
    headers.append("Authorization", "Bearer " + this.accessToken);
    return this.http.post(this.constants.createUserUrl + this.newUser.identityId + "/" + this.newUser.emailAddress, { headers: headers })
      .map((response: Response) => <User>response.json())
      .catch(this.handleError)
      .subscribe(
      status => this.statusMessage = status,
      error => this.errorMessage = error,
      () => this.completeFinishNewUser()
      );
  }

  completeFinishNewUser() {

  }

  private handleError(error: Response) {
    console.error(error); // log to console instead
    return Observable.throw(error.json().error || 'Server Error');
  }



  updateProfileInformation(user: User) {
    this.userSettings = user;
    var headers = new Headers();
    headers.append('Content-Type', this.constants.jsonContentType);

    var s = localStorage.getItem("accessToken");
    headers.append("Authorization", "Bearer " + s);
    var body = JSON.stringify(user);

    return this.http.post(this.constants.userUrl + "UpdateUser", body, { headers: headers })
      .map((response: Response) => {
        var result = response.json();
        return result;
      })
      .catch(this.handleError)
      .subscribe(
      status => this.statusMessage = status,
      error => this.errorMessage = error,
      () => this.completeUpdateUser()
      );
  }

  completeUpdateUser() {
    //this.userSettings = this.statusMessage;
  }

  setUserSettings(userSettings: User): string {
    var retVal = "Ok"
    try {
      this.userSettings = userSettings;
    }
    catch (error) {
      retVal = error;
    }
    return retVal;
  }

  getUserSettings(): User {
    if (this.userSettings === undefined || this.userSettings === null) {
      this.userSettings = new User();
    }

    return this.userSettings;
  }

  setSelectedPhysical(p: Physical): void {
    this.selectedPhysical = p;
  }

  getSelectedPhysical(anon: boolean): Physical {
    if (!this.selectedPhysical) {
      var email = (anon ? "" : this.userSettings.emailAddress);
      this.selectedPhysical = new PhysicalFactory().createNewPhysical(email);
    }

    return this.selectedPhysical;
  }


  setSelectedCalculation(c: Calculation): string {
    var errorMsg: string = "Ok";
    if (c !== undefined) {
      if (this.userSettings === undefined) {
        errorMsg = "User settings are undefined.";
      }

      this.selectedCalculation = FindHelper.FindCalculationByKey(this.userSettings, c.pK_Calculation, false)
      // for (let c of this.userSettings.calculationData) {
      //   if (c.fK_Measurement === p.fK_Measurement) {
      //     this.selectedCalculation = c;
      //     break;
      //   }
      // }

      // this.selectedPhysical = p;
    }
    else {
      errorMsg = "No biometric data is available."
    }

    return errorMsg;
  }

  getSelectedCalculation(): Calculation {
    if (!this.selectedCalculation) {
      this.selectedCalculation = CalculationFactory.createNewCalculation(this.userSettings.emailAddress);
    }

    return this.selectedCalculation;
  }


  setSelectedBlood(b: Blood): void {
    this.selectedBlood = b;
  }

  getSelectedBlood(): Blood {
    return this.selectedBlood;
  }


  setSelectedLipid(l: Lipid): void {
    this.selectedLipid = l;
  }

  getSelectedLipid(): Lipid {
    return this.selectedLipid;
  }

  // setDailyFoodItem(df: DailyFood) {
  //   this.userSettings.dailyFoodData = df;
  // }

  updateNutrientData(user: User) {
    this.userSettings = user;
    
    var headers = new Headers();
    headers.append('Content-Type', this.constants.jsonContentType);

    var s = localStorage.getItem("accessToken");
    headers.append("Authorization", "Bearer " + s);
    var body = JSON.stringify(user.nutrientData);

    return this.http.post(this.constants.userUrl + "UpdateNutrients", body, { headers: headers })
      .map((response: Response) => {
        var result = response.json();
        return result;
      })
      .catch(this.handleError)
      .subscribe(
      status => this.statusMessage = status,
      error => this.errorMessage = error,
      () => this.completeUpdateNutrients()
      );
  }

  completeUpdateNutrients() { 

  }
}