import {Http, Response, Headers } from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { User } from '../interfaces/user';
import { Physical } from '../interfaces/physical';
import { DataResponseObject } from '../interfaces/dataResponseObject';
import { Calculation } from '../interfaces/calculation';
import { BareCalculationFormat } from '../interfaces/calculation';
import { Macro } from '../interfaces/macro';
import { Calculator } from  '../classes/calculator';
import { CalculationFactory } from  '../factories/calculation.factory';
import { MeasurementFactory } from  '../factories/measurement.factory';
import { SettingsService } from  '../services/settings.service';
import { SettingsPhysicalService } from  '../settings/physical/settings.physical.service';
import { Constants } from '../constants/http.constants';
import { FindHelper } from '../helpers/find.helper';

import * as moment from "moment";


@Injectable()
export class CalculationService {
    calculator: Calculator = new Calculator();
    constants: Constants = new Constants();
    dro: DataResponseObject = new DataResponseObject(false, null, "");
    errorMessage: string;
    curMeasureDate: string;
    isPasswordSaved: boolean;

    constructor(private ss: SettingsService,
        private sp: SettingsPhysicalService,
        private http: Http) {

    }


    public calculate(user: User, selectedPhysical: Physical, selectedCalculation: Calculation): Calculation {
        var retVal: Calculation;

        var alreadyCalculated: Calculation = FindHelper.FindCalculationByKey(user, selectedPhysical.fK_Measurement, false);
        if (alreadyCalculated && alreadyCalculated.fK_Measurement > 0) {
            retVal = alreadyCalculated;
        }
        else {
            selectedCalculation.fK_Measurement = selectedPhysical.fK_Measurement;
            selectedCalculation.dateString = moment(new Date()).format('MM/DD/YYYY');
            selectedCalculation.fat = this.calculator.calculateBodyFat(user, selectedPhysical);
            selectedCalculation.lbm = this.calculator.calculateLbm(user, selectedPhysical, selectedCalculation);
            selectedCalculation.mjBmr = this.calculator.calculateKmBmr(user, selectedCalculation);
            selectedCalculation.kmBmr = this.calculator.calculateKmBmr(user, selectedCalculation);
            selectedCalculation.bmr = this.calculator.calculateBmr(user, selectedPhysical, selectedCalculation);
            selectedCalculation.tdee = this.calculator.calculateTdee(selectedPhysical, selectedCalculation);
            selectedCalculation.macroCarbs = this.calculator.calculateMacroCarbs(selectedCalculation);
            selectedCalculation.carbCalories = this.calculator.calculateCarbCalories(selectedCalculation);
            selectedCalculation.macroProtein = this.calculator.calculateMacroProtein(selectedCalculation);
            selectedCalculation.proteinCalories = this.calculator.calculateProteinCalories(selectedCalculation);
            selectedCalculation.macroFat = this.calculator.calculateMacroFat(selectedCalculation);
            selectedCalculation.fatCalories = this.calculator.calculateFatCalories(selectedCalculation);
            selectedCalculation.calories = this.calculator.calculateCalories(selectedCalculation);

            retVal = selectedCalculation;
        }

        return retVal;
    }




    updateCalculationData(calc: Calculation) {
        var c: BareCalculationFormat = CalculationFactory.createBareCalaculationFormat(calc, this.ss.getUserSettings());
        var headers = new Headers();
        headers.append('Content-Type', this.constants.jsonContentType);

        var s = localStorage.getItem("accessToken");
        headers.append("Authorization", "Bearer " + s);
        var body = JSON.stringify(c)

        this.http.post(this.constants.userUrl + "UpdateCalculation", body, { headers: headers })
            .map((response: Response) => {
                var result = <DataResponseObject>response.json();
                return result;
            })
            .catch(this.handleError)
            .subscribe(
            dro => this.dro = dro,
            error => this.errorMessage = error,
            () => this.completeAddCalculation()
            );
    }

    completeAddCalculation() {
        console.log("in add calc");
        if (this.dro) {
            if (this.dro.data.length > 1) {
                var dateString = this.dro.data[0].dateString
                var m = FindHelper.FindMeasurementByDate(dateString, this.ss.getUserSettings())
                if (m === undefined) {
                    this.ss.getUserSettings().measurementData.push(new MeasurementFactory().createMeasurement(this.dro.data[0]));
                }

                var p = FindHelper.FindCalculationByDate(dateString, this.ss.getUserSettings())
                if (p === undefined) {
                    this.ss.getUserSettings().calculationData.push(CalculationFactory.createCalculation(this.dro.data[1], this.ss.getUserSettings(), true));
                }
            } else {
                this.updateCalculationRecord(this.dro[0]);
            }
        }
    }

    updateCalculationRecord(c: Calculation) {

        var us = this.ss.getUserSettings();
        if (us.calculationData.length > 0) {
            var rec: Calculation = FindHelper.FindCalculationByKey(us, c.fK_Measurement, false);

            if (rec != null) {
                rec.pK_Calculation = c.pK_Calculation;
                rec.dateString = c.dateString;
                rec.fat = c.fat;
                rec.bmr = c.bmr;
                rec.lbm = c.lbm;
                rec.kmBmr = c.kmBmr;
                rec.mjBmr = c.mjBmr;
                rec.tdee = c.tdee;
                rec.calories = c.calories;
                rec.macroCarbs = c.macroCarbs;
                rec.macroProtein = c.macroProtein;
                rec.macroFat = c.macroFat;
                rec.userEmail = us.emailAddress;
            }
        }
    }

    private handleError(error: Response) {
        console.error(error); // log to console instead
        return Observable.throw(error.json().error || 'Server Error');
    }

}