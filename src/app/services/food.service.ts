import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SettingsService } from '../services/settings.service';
import { BaseMacro } from '../interfaces/macro';

@Injectable()
export class FoodService {
  baseMacro: BaseMacro;
  remainMacro: BaseMacro;
  
  constructor(private r: Router,
              private ss: SettingsService ) {
  }

  calculateRemaining() {
    var us = this.ss.getUserSettings();
    var calc;

    if (us.emailAddress != "")
    {
      calc = us.calculationData[0];
      this.baseMacro = new BaseMacro(calc.displayCalories, calc.displayMacroCarb, calc.displayMacroProtein, calc.displayMacroFat);
      
    }
  }
}