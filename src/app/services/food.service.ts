import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SettingsService } from '../services/settings.service';
import { BaseMacro } from '../interfaces/macro';
import { DailyFood, DailyFoodArray } from '../interfaces/dailyFood';
import { DailyFoodItem } from '../interfaces/dailyFoodItem';
import { DataResponseObject } from '../interfaces/dataResponseObject';

import { FindHelper } from '../helpers/find.helper';

import { MealType } from '../enums/mealType.enum';
import { Constants } from '../constants/http.constants';
import * as moment from "moment";

@Injectable()
export class FoodService {
  baseMacro: BaseMacro;
  remainMacro: BaseMacro;
  dailyFoodArray: DailyFoodArray = new DailyFoodArray();
  dailyFood: DailyFood;
  constants: Constants = new Constants();
  dro: DataResponseObject;
  errorMessage: string;

  constructor(
    private r: Router,
    private http: Http,
    private ss: SettingsService) {
  }

  calculateRemaining() {
    var us = this.ss.getUserSettings();
    var calc;

    if (us.emailAddress != "") {
      calc = us.calculationData[0];
      this.baseMacro = new BaseMacro(calc.displayCalories, calc.displayMacroCarb, calc.displayMacroProtein, calc.displayMacroFat);
    }
  }

  setDailyFood(dfi: DailyFoodItem) {
    let ok = false;
debugger;
    if (!FindHelper.FindDailyFoodArrayByKey(dfi.pK_DailyFoodItem, dfi.meal, this.dailyFoodArray)) {
      switch (dfi.meal) {
        case MealType.breakfast:
          ok = true;
          this.dailyFoodArray.breakfast.push(dfi);
          break;
        case MealType.lunch:
          ok = true;
          this.dailyFoodArray.lunch.push(dfi);
          break;
        case MealType.dinner:
          ok = true;
          this.dailyFoodArray.dinner.push(dfi);
          break;
        case MealType.snack:
          ok = true;
          this.dailyFoodArray.snack.push(dfi);
          break;
      }
    }

    if (ok) {
      this.updateDailyFood();
    }
  }

  getDailyFood() {
    return this.dailyFood;
  }

  getDailyFoodArray() {
    return this.dailyFoodArray;
  }

  updateDailyFood() {
    debugger;
    let df = new DailyFood().createDailyFood(this.dailyFoodArray, this.ss.getUserSettings());
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
    if (this.dro != null && this.dro.data != null && this.dro.data.length > 0) {
      this.dailyFood = <DailyFood>this.dro.data[0];
      this.ss.setDailyFood(this.dailyFood);
    }
  }

  private handleError(error: Response) {
    console.error(error); // log to console instead
    return Observable.throw(error.json().error || 'Server Error');
  }

}


