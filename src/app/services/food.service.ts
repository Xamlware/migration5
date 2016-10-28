import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SettingsService } from '../services/settings.service';
import { BaseMacro } from '../interfaces/macro';
import { DailyFood, DailyFoodMeals } from '../interfaces/dailyFood';
import { DailyFoodItem } from '../interfaces/dailyFoodItem';
import { DataResponseObject } from '../interfaces/dataResponseObject';
import { FoodFactory } from '../factories/food.factory';


import { FindHelper } from '../helpers/find.helper';
import { LinkHelper } from '../helpers/link.helper';

import { MealType } from '../enums/mealType.enum';
import { Constants } from '../constants/http.constants';

import * as moment from "moment";

@Injectable()
export class FoodService {
  baseMacro: BaseMacro;
  remainMacro: BaseMacro;
  dailyFoodArray: DailyFood[] = [];
  dailyFoodMeals: DailyFoodMeals = new DailyFoodMeals();
  dailyFood: DailyFood;
  foodDates: Date[] = [];
  constants: Constants = new Constants();
  dro: DataResponseObject;
  errorMessage: string;
  private dailyFood$: Subject<DailyFood>;


  constructor(
    private r: Router,
    private http: Http,
    private ss: SettingsService) {
    console.log("food service constructor");

    this.dailyFood$ = <Subject<DailyFood>>new Subject();
  }


  completeLogout() {
    console.log("complete food service logout")
    this.dailyFood = new DailyFood();
    this.dailyFoodMeals = new DailyFoodMeals();
  }

  calculateRemaining() {
    var us = this.ss.getUserSettings();
    var calc;

    if (us.emailAddress != "") {
      calc = us.calculationData[0];
      this.baseMacro = new BaseMacro(calc.displayCalories, calc.displayMacroCarb, calc.displayMacroProtein, calc.displayMacroFat);
    }
  }

  clearDailyFoodMeals() {
    this.dailyFoodMeals.breakfast = [];
    this.dailyFoodMeals.lunch = [];
    this.dailyFoodMeals.dinner = [];
    this.dailyFoodMeals.snack = [];
  }

  setDailyFood(df: DailyFood) {
    this.dailyFood = df;
    this.dailyFoodArray.push(df);
    if (!FindHelper.findFoodDate(moment(df.foodDate).toDate(), this.foodDates)) {
      this.foodDates.push(df.foodDate);
    }
  }

  setDailyFoodItem(dfi: DailyFoodItem) {
debugger;
    var exist =FindHelper.FindDailyFoodMealsByKey(dfi.pK_DailyFoodItem, dfi.meal, this.dailyFoodMeals); 
    if (!exist) {
      this.dailyFood.items.push(dfi);
      switch (dfi.meal) {
        case MealType.breakfast:
          this.dailyFoodMeals.breakfast.push(dfi);
          break;
        case MealType.lunch:
          this.dailyFoodMeals.lunch.push(dfi);
          break;
        case MealType.dinner:
          this.dailyFoodMeals.dinner.push(dfi);
          break;
        case MealType.snack:
          this.dailyFoodMeals.snack.push(dfi);
          break;
      }
    }

    // if (ok) {
    //   this.updateDailyFood();
    // }
  }

  getDailyFoodByDate(date: string) {
    var id = String(this.ss.getUserId());
    var parm = "Ketogf~~~" + date + "~~~" + id
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
      .subscribe(
      dro => {
        this.dro = dro
      },
      error => {
        var errorObject = JSON.parse(error._body);
        this.errorMessage = errorObject.error_description;
        console.log(this.errorMessage);
      },
      () => this.completeGetDailyFoodByDate());
  }

  completeGetDailyFoodByDate() {
    debugger;
    this.dailyFood = <DailyFood>this.dro.data[0];
    this.dailyFoodArray.push(this.dailyFood);
    this.setDailyFoodItemObservableByDate(this.dailyFood);

  }

  getDailyFood() {
    return this.dailyFood;
  }

  getDailyFoodMeals() {
    return this.dailyFoodMeals;
  }

  updateDailyFood() {
    let df = new DailyFood().createDailyFood(this.dailyFoodMeals, this.ss.getUserSettings());
    var headers = new Headers();
    headers.append('Content-Type', this.constants.jsonContentType);

    var s = localStorage.getItem("accessToken");
    headers.append("Authorization", "Bearer " + s);
    var body = JSON.stringify(df);

    this.http.post(this.constants.userUrl + "UpdateDailyFood", body, { headers: headers })
      .map((response: Response) => {
        var result = <DataResponseObject>response.json();
        return result;
      })
      .catch(this.handleError)
      .subscribe(
      dro => this.dro = <DataResponseObject>dro,
      error => this.errorMessage = error,
      () => this.completeUpdateDailyFood()
      );
  }

  completeUpdateDailyFood() {
    console.log("completed update food");
    // if (this.dro != null && this.dro.data != null && this.dro.data.length > 0) {
    //   this.dailyFood = new FoodFactory().createDailyFood(<DailyFood>this.dro.data[0]);
    //   //this.setDailyFoodItemObservableByDate(this.dailyFood);
    // }
  }

  private handleError(error: Response) {
    console.error(error); // log to console instead
    return Observable.throw(error.json().error || 'Server Error');
  }


  setDailyFoodItemObservableByDate(dailyFood: DailyFood): void {
    this.dailyFood$.next(dailyFood);
  }

  getDailyFoodObservableByDate(): Observable<DailyFood> {
    console.log("getting dailyFood observable")
    return this.dailyFood$.asObservable();
  }
}


