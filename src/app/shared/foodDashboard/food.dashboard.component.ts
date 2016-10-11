import { Component, OnInit } from '@angular/core';
// import {InputText, Checkbox, Message, Messages, Growl, Panel, Calendar, RadioButton, InputSwitch,
//         SelectButton, SelectItem, DataTable, Column, SplitButton, SplitButtonItem, Button} from 'primeng/primeng'
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../interfaces/user';
import { Macro } from '../../interfaces/macro';
import { BaseMacroString, GridMacroString } from '../../interfaces/macro';
import { Calculation } from '../../interfaces/calculation';
import { CalculationFactory } from '../../factories/calculation.factory';
//import { SelectItem, DataTable, Column, Button } from 'primeng/primeng'
import * as moment from "moment";

@Component({
        
        selector: 'k-dash',
        templateUrl: 'food.dashboard.component.html',
        styleUrls: ['food.dashboard.component.css']
})

export class FoodDashboardComponent implements OnInit {
        userSettings: User;
        appPageHeaderDivStyle: {};
        selectedCalculation: Calculation;
        calculationChosen: boolean;
        macroCols: any;
        macroData: Macro[] = [];
        baseMacroData: GridMacroString[] = [];
        currentDate = moment().format("dddd, MMMM DD, YYYY");
        totalCalories = "1938";
        totalCarbs = "20";
        totalProtein = "100";
        totalFat = "162";

        constructor(
                private ss: SettingsService,
                private r: Router,
                private ts: ThemeService) {

                this.macroCols = [
                        { field: 'calories', header: 'Calories' },
                        { field: 'macroCarb', header: 'Carbs' },
                        { field: 'macroProtein', header: 'Protein' },
                        { field: 'macroFat', header: 'Fat' }
                ];

        }

        ngOnInit() {
                this.appPageHeaderDivStyle = this.ts.getAppPageHeaderDivStyle();
                this.userSettings = this.ss.getUserSettings();
                if (this.userSettings.calculationData.length > 0) {
                        this.selectedCalculation = CalculationFactory.createCalculation(this.userSettings.calculationData[0], this.userSettings, true);
                        this.setDisplayValues(this.selectedCalculation);
                        this.calculationChosen = true;
                        this.getBaseMacroData();
                }
        }

        getMacroData() {
                this.macroData.push({
                        calories: this.selectedCalculation.displayCalories,
                        carbCals: this.selectedCalculation.displayCarbCalories,
                        macroCarb: this.selectedCalculation.displayMacroCarbs,
                        carbPercent: 0,
                        proteinCals: this.selectedCalculation.displayProteinCalories,
                        macroProtein: this.selectedCalculation.displayMacroProtein,
                        proteinPercent: 0,
                        fatCals: this.selectedCalculation.displayFatCalories,
                        macroFat: this.selectedCalculation.displayMacroFat,
                        fatPercent: 0
                });
        }

        getBaseMacroData() {
                this.baseMacroData.push({
                        calories: this.selectedCalculation.displayCalories.toString(),
                        macroCarb: this.selectedCalculation.displayMacroCarbs.toString(),
                        macroProtein: this.selectedCalculation.displayMacroProtein.toString(),
                        macroFat: this.selectedCalculation.displayMacroFat.toString(),
                        calColor: "Green",
                        carColor: "Green",
                        proColor: "Green",
                        fatColor: "Green"
                });
        }

        setDisplayValues(calculation: Calculation) {
                calculation.setDisplayCalories();
                calculation.setDisplayCarbRange();
                calculation.setDisplayProteinRange();
                calculation.setDisplayFat();
                calculation.setDisplayBmr();
                calculation.setDisplayLbm();
                calculation.setDisplayKmBmr();
                calculation.setDisplayMjBmr();
                calculation.setDisplayTdee();
                calculation.setDisplayMacroCarbs();
                calculation.setDisplayMacroProtein();
                calculation.setDisplayMacroFat();
        }

        diary() {
                this.r.navigate(["/diary"])
        }

}