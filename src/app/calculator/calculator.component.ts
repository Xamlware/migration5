import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Panel, Dropdown, SelectItem, SelectButton, Button, DataTable, Column } from 'primeng/primeng';

import { User } from '../interfaces/user';
import { Physical } from '../interfaces/physical';
import { Calculation } from '../interfaces/calculation';
import { Measurement } from '../interfaces/measurement';
import { Macro } from '../interfaces/macro';
import { ActivityLevel } from '../interfaces/activityLevel';
import { ActivityLevelType } from '../enums/activityLevelType.enum';
import { ModeType } from '../enums/modeType.enum';
import { GoalType } from '../enums/goalType.enum';
import { Round } from '../helpers/math.helper';
import { SharedModule } from '../shared/shared.module';
import { SettingsService } from '../services/settings.service';
import { SettingsPhysicalService } from '../settings/physical/settings.physical.service';
import { CalculationService } from '../services/calculation.service';
import { ValidationService } from '../services/validation.service';

import * as moment from "moment";
import { SpinnerReturn } from '../interfaces/spinnerReturn';

@Component({
    
    templateUrl: 'calculator.component.html',
    styleUrls: ['calculator.component.css']
})

export class CalculatorComponent implements OnInit {
    physicalForm: FormGroup;
    calculationForm: FormGroup;
    macroForm: FormGroup;

    userSettings: User;
    errorMessage: string;
    selectedMeasurement: Measurement;
    measurements: SelectItem[];
    sexes: SelectItem[];
    selectedSex: string;
    activities: SelectItem[];
    selectedActivity: number;
    activityLevel: ActivityLevel[];
    selectedActivityLevel: ActivityLevel;
    goals: SelectItem[];
    selectedGoal: string;
    selectedPhysical: Physical;
    selectedCalculation: Calculation;

    heightUnits: string;
    weightUnits: string;
    neckUnits: string;
    waistUnits: string;
    fatUnits: string;
    lbmUnits: string;
    bmrUnits: string;
    carbUnits: string;
    proteinUnits: string;
    measurementMetric: boolean;

    anonymous: boolean;
    carbRangeDefault: number = 20;
    proteinRangeDefault: number = .6;
    calorieDifferenceDefault: number = 20;
    calorieDifference: number = 20;
    calories: number = 0;

    sedentaryMessage: string = "Sedentary. Not much daily activity, little to no exercise.";
    lightMessage: string = "Light. Daytime walking. 1–3 hours a week of light exercise.  Students, office workers, and professionals";
    moderateMessage: string = "Moderate. Active day job. Exercise 3–5 hours a week. Light industry, electrical, carpentry and building trades (excluding heavy laborers), farm workers, soldiers, commercial fishermen.";
    heavyMessage: string = "Heavy. Intense exercise 6-7 days a week. Comparable to running 9 to 13 miles/day.";
    extremeMessage: string = "Extreme. Training twice a day, very intense workouts. Comparable to running 14 to 17 miles/day";
    customMessage: string = "Custom. Enter the calories expended per day.";

    female: boolean;
    macroCols: any[];
    macroData: Macro[] = [];
    selectedTableMacro: Macro;
    selectedMacro: Macro;
    calorieDifferenceType: string;
    firstCalc: boolean = false;;
    startValue: number;
    proteinRange: number[];

    constructor(
        private ss: SettingsService,
        private sp: SettingsPhysicalService,
        private cs: CalculationService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router) {

        this.sexes = [];
        this.sexes.push({ label: "Male", value: "M" });
        this.sexes.push({ label: "Female", value: "F" });

        this.goals = [];
        this.goals.push({ label: "Lose", value: "lose" });
        this.goals.push({ label: "Maintain", value: "maintain" });
        this.goals.push({ label: "Gain", value: "gain" });

        this.activities = [];
        this.activities.push({ label: "Sedentary", value: ActivityLevelType.sedentary });
        this.activities.push({ label: "Light", value: ActivityLevelType.light });
        this.activities.push({ label: "Moderate", value: ActivityLevelType.moderate });
        this.activities.push({ label: "Heavy", value: ActivityLevelType.heavy });
        this.activities.push({ label: "Extreme", value: ActivityLevelType.extreme });
        this.activities.push({ label: "Custom", value: ActivityLevelType.custom });


        this.activityLevel = [];
        this.activityLevel.push({ activityLevel: ActivityLevelType.sedentary, male: 0.3, female: 0.3, message: this.sedentaryMessage });
        this.activityLevel.push({ activityLevel: ActivityLevelType.light, male: 0.6, female: 0.5, message: this.lightMessage });
        this.activityLevel.push({ activityLevel: ActivityLevelType.moderate, male: 0.7, female: 0.6, message: this.moderateMessage });
        this.activityLevel.push({ activityLevel: ActivityLevelType.heavy, male: 1.1, female: 0.9, message: this.heavyMessage });
        this.activityLevel.push({ activityLevel: ActivityLevelType.extreme, male: 1.4, female: 1.2, message: this.extremeMessage });
        this.activityLevel.push({ activityLevel: ActivityLevelType.custom, male: 1.4, female: 1.2, message: this.customMessage });

        this.macroCols = [
            { field: 'calories', header: 'Calories' },
            { field: 'macroCarb', header: 'Carbs' },
            { field: 'macroProtein', header: 'Protein' },
            { field: 'macroFat', header: 'Fat' }
        ];
    }

    ngOnInit() {
        var currentDate = moment(new Date()).format('MM/DD/YYYY');
        this.userSettings = this.ss.getUserSettings();
        if (!this.userSettings || !this.userSettings.emailAddress) {
            this.heightUnits = this.measurementMetric ? "meters" : "in";
            this.measurementMetric = false;
            this.anonymous = true
            this.selectedPhysical = this.ss.getSelectedPhysical(this.anonymous);
            this.female = false;
            this.selectedSex = "M";
            this.selectedGoal = "lose";
            this.selectedCalculation = this.ss.getSelectedCalculation();
            this.selectedCalculation.calories = 0;
            this.selectedCalculation.carbRange = this.carbRangeDefault;
            this.selectedCalculation.goal = "lose";
            this.selectedCalculation.calorieDifference = 20;
            this.selectedActivityLevel = this.activityLevel[0];
            this.selectedActivity = this.activities[0].value;
            this.calorieDifferenceType = this.getCalorieDifferenceType();
            this.heightUnits = "meters";
            this.heightUnits = this.measurementMetric ? "meters" : "in";
            this.weightUnits = this.measurementMetric ? "k" : "lb";
            this.waistUnits = this.measurementMetric ? "cm" : "in";
            this.neckUnits = this.measurementMetric ? "cm" : "in";
            this.fatUnits = "%";
            this.lbmUnits = this.measurementMetric ? "k" : "lb";
            this.bmrUnits = this.measurementMetric ? "kCal" : "kCal";
            this.carbUnits = this.measurementMetric ? "g" : "g";
            this.proteinUnits = this.measurementMetric ? "g" : "g";
        }
        else {
            this.anonymous = false;
            this.measurementMetric = this.userSettings.measurementMetric;
            this.female = this.userSettings.sex === "F";
            this.selectedSex = this.userSettings.sex;
            this.selectedGoal = "lose";
            this.selectedCalculation = this.ss.getSelectedCalculation();
            if (this.selectedCalculation.carbRange === 0) {
                this.selectedCalculation.carbRange = this.carbRangeDefault;
            }
            this.selectedCalculation.calories = 0;
            this.selectedCalculation.goal = "lose";
            this.selectedCalculation.calorieDifference = 20;
            this.selectedPhysical = <Physical>this.ss.getSelectedPhysical(this.anonymous);
            this.selectedActivityLevel = this.activityLevel[0];
            this.selectedActivity = this.activities[0].value;
            this.calorieDifferenceType = this.getCalorieDifferenceType();
            this.heightUnits = this.userSettings.measurementMetric ? "meters" : "in";
            this.weightUnits = this.userSettings.measurementMetric ? "k" : "lb";
            this.waistUnits = this.userSettings.measurementMetric ? "cm" : "in";
            this.neckUnits = this.userSettings.measurementMetric ? "cm" : "in";
            this.fatUnits = "%";
            this.lbmUnits = this.userSettings.measurementMetric ? "k" : "lb";
            this.bmrUnits = this.userSettings.measurementMetric ? "kCal" : "kCal";
            this.carbUnits = this.userSettings.measurementMetric ? "g" : "g";
            this.proteinUnits = this.userSettings.measurementMetric ? "g" : "g";

        }

        if (this.userSettings.measurementData) {
            this.measurements = [];
            this.userSettings.measurementData.forEach(m => {
                this.measurements.push({ label: m.dateString, value: m.pK_Measurement });
            });
        }

        this.physicalForm = this.fb.group({
            measurementMetric: [false],
            weight: ['', [Validators.required, ValidationService.numberFieldValidator]],
            height: ['', [Validators.required, ValidationService.numberFieldValidator]],
            hips: ['0', [Validators.required, ValidationService.numberFieldValidator]],
            waist: ['', [Validators.required, ValidationService.numberFieldValidator]],
            neck: ['', [Validators.required, ValidationService.numberFieldValidator]],
            birth: ['', [Validators.required, ValidationService.dateFieldValidator]],
            sex: ['M'],
            activityLevel: [ActivityLevelType.sedentary]
        });

        if (this.anonymous) {
            this.physicalForm.controls['sex'].setValue("M", { onlySelf: true });
            this.physicalForm.controls['activityLevel'].setValue(ActivityLevelType.sedentary, { onlySelf: true });
        } else {
            var hips = this.selectedPhysical.hips === undefined ? 0 : this.selectedPhysical.hips;
            this.physicalForm.controls['measurementMetric'].setValue(this.userSettings.measurementMetric, { onlySelf: true });
            this.physicalForm.controls['weight'].setValue(this.selectedPhysical.weight, { onlySelf: true });
            this.physicalForm.controls['height'].setValue(this.selectedPhysical.height, { onlySelf: true });
            this.physicalForm.controls['hips'].setValue(hips, { onlySelf: true });
            this.physicalForm.controls['waist'].setValue(this.selectedPhysical.waist, { onlySelf: true });
            this.physicalForm.controls['neck'].setValue(this.selectedPhysical.neck, { onlySelf: true });
            this.physicalForm.controls['birth'].setValue(this.userSettings.dob, { onlySelf: true });
            this.physicalForm.controls['sex'].setValue(this.userSettings.sex, { onlySelf: true });
            this.physicalForm.controls['activityLevel'].setValue(this.selectedPhysical.activityLevel, { onlySelf: true });
        }

        this.physicalForm.valueChanges
            .map((value) => {
                return value;
            })

            //.filter((value) => this.PhysicalForm.valid) 
            .subscribe((value) => {
                this.selectedPhysical.weight = this.physicalForm.value.weight;
                this.selectedPhysical.height = this.physicalForm.value.height;
                this.selectedPhysical.hips = this.physicalForm.value.hips;
                this.selectedPhysical.waist = this.physicalForm.value.waist;
                this.selectedPhysical.neck = this.physicalForm.value.neck;
                this.selectedPhysical.dateString = this.physicalForm.value.birth;
                this.selectedPhysical.activityLevel = this.physicalForm.value.activityLevel;
            });


        this.calculationForm = this.fb.group({
            fat: ['', [Validators.required]],
            lbm: ['', [Validators.required]],
            kmBmr: ['', [Validators.required]],
            mjBmr: ['', []],
            bmr: ['', [Validators.required]],
            tdee: ['', [Validators.required]],
        });

        this.macroForm = this.fb.group({
            calories: [0],
            carbGoal: ['', [Validators.required]],
            proteinGoal: [0, [Validators.required]],
            goal: ['lose', [Validators.required]],
            calorieDifference: [0, []]
        });


        if (this.anonymous) {
            // this.macroForm.value.macroCarbs.setValue(this.carbRangeDefault);
            (<FormControl>this.macroForm.controls['carbGoal']).setValue(this.carbRangeDefault);
            (<FormControl>this.macroForm.controls['proteinGoal']).setValue(this.proteinRangeDefault);
            (<FormControl>this.macroForm.controls['calorieDifference']).setValue(this.calorieDifferenceDefault);
        }
        else {
            (<FormControl>this.macroForm.controls['carbGoal']).setValue(this.selectedCalculation.macroCarbs);
            (<FormControl>this.macroForm.controls['proteinGoal']).setValue(this.selectedCalculation.macroProtein);
            (<FormControl>this.macroForm.controls['calorieDifference']).setValue(this.selectedCalculation.calorieDifference);
        }

        this.macroForm.valueChanges
            .map((value) => {
                return value;
            })

            //.filter((value) => this.calculationForm.valid) 
            .subscribe((value) => {
                this.selectedCalculation.carbRange = this.macroForm.value.carbGoal;
                this.selectedCalculation.proteinRange = this.macroForm.value.proteinGoal;
                this.selectedCalculation.calorieDifference = this.macroForm.value.calorieDifference;
                this.calorieDifference = this.selectedCalculation.calorieDifference;
                this.calorieDifferenceType = this.getCalorieDifferenceType();
            });
    }

    getCalorieDifferenceType(): string {
        var retVal = "Your Macros (";
        if (this.selectedGoal === "gain") {
            retVal = retVal + this.selectedCalculation.calorieDifference + "% Surplus)";
        }
        else {
            retVal = retVal + this.selectedCalculation.calorieDifference + "% Deficit)";
        }

        return retVal;
    }


    onSubmit(): void {
        if (this.physicalForm.dirty) {
            // var hips: number = 0;

            // if (this.physicalForm.value.hips != undefined)
            //     hips = this.physicalForm.value.hips;
        }

        this.selectedPhysical = <Physical>this.physicalForm.value;
        this.selectedPhysical.activityLevel = this.physicalForm.value.activityLevel;

        if (this.anonymous) {
            this.userSettings = new User();
            this.userSettings.measurementMetric = this.physicalForm.value.measurementMetric;
            this.userSettings.sex = this.physicalForm.value.sex;
            this.userSettings.dob = this.physicalForm.value.birth;
        }

        this.calculate();
    }

    calculate() {
        if (this.physicalForm.valid && this.macroForm.valid) {

            this.sp.getIsPhysicalSaved()
                .subscribe(saved => {
                    this.cs.updateCalculationData(this.selectedCalculation)
                });

            this.firstCalc = true;
            this.selectedCalculation = <Calculation>this.cs.calculate(this.userSettings, this.selectedPhysical, this.selectedCalculation);
            this.setDisplayValues(this.selectedCalculation);
        }
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

        this.selectedCalculation = calculation;
        this.updateCalculationForm();
        this.updateMacroData();
        this.calorieDifferenceType = this.getCalorieDifferenceType(); //this.selectedCalculation.calorieDifference + "%" + this.getLevel();
    }

    getLevel(): string {
        var retVal = "Deficit";
        if (this.selectedGoal === "gain") {
            retVal = "Surplus";
        }

        return retVal;
    }

    onMetricChanged(event: any) {
        this.measurementMetric = event;
        this.heightUnits = this.measurementMetric ? "meters" : "in";
        this.weightUnits = this.measurementMetric ? "k" : "lb";
        this.waistUnits = this.measurementMetric ? "cm" : "in";
        this.neckUnits = this.measurementMetric ? "cm" : "in";
        this.lbmUnits = this.measurementMetric ? "k" : "lb";
        this.bmrUnits = this.measurementMetric ? "kCal" : "kCal";
        this.carbUnits = this.measurementMetric ? "g" : "g";
        this.proteinUnits = this.measurementMetric ? "g" : "g";
    }


    onGoalChanged(event: any) {
        this.selectedGoal = event.value;
        if (event.value === 'lose') {
            this.selectedCalculation.goal = 'lose';
            this.selectedCalculation.calorieDifference = 20;
            this.startValue = .6;
            this.proteinRange = [.6, .8];
        }
        else if (event.value === 'maintain') {
            this.selectedCalculation.goal = 'maintain';
            this.selectedCalculation.calorieDifference = 0;
            this.startValue = .6;
            this.proteinRange = [.6, .8];
        }
        else if (event.value === 'gain') {
            this.selectedCalculation.goal = 'gain';
            this.selectedCalculation.calorieDifference = 20;
            this.startValue = 1.0;
            this.proteinRange = [.8, 1.2];
        }

        (<FormControl>this.macroForm.controls['calorieDifference']).setValue(this.selectedCalculation.calorieDifference);
        this.calorieDifference = this.selectedCalculation.calorieDifference;
        if (this.firstCalc) {
            this.calculate();
        }
    }

    onMacroSelect(event: any) {
    }

    onSexChanged(event: any) {
        this.userSettings.sex = event.value;
        this.female = this.userSettings.sex === "F";
        //(<FormControl>this.macroForm.controls['hips']).setValue((this.female ? '' : 0));

        if (this.firstCalc) {
            this.calculate();
        }
    }

    onActivityChanged(event: any) {
        this.selectedActivity = event.value;
        for (let l of this.activityLevel) {
            if (l.activityLevel === this.selectedActivity) {
                this.selectedActivityLevel = l;
                break;
            }
        }

        if (this.firstCalc) {
            this.calculate();
        }
    }

    onSaveCalculation() {
        //physical gets save; then calculation base on observable of isPhysicalSaved.
        this.sp.updatePhysicalData(this.selectedPhysical)
        //this.firstCalc = false;
    }

    updateCalculationForm() {
        (<FormControl>this.calculationForm.controls['fat']).setValue(this.selectedCalculation.displayFat);
        (<FormControl>this.calculationForm.controls['lbm']).setValue(this.selectedCalculation.displayLbm);
        (<FormControl>this.calculationForm.controls['kmBmr']).setValue(this.selectedCalculation.displayKmBmr);
        (<FormControl>this.calculationForm.controls['mjBmr']).setValue(this.selectedCalculation.displayMjBmr);
        (<FormControl>this.calculationForm.controls['bmr']).setValue(this.selectedCalculation.displayBmr);
        (<FormControl>this.calculationForm.controls['tdee']).setValue(this.selectedCalculation.displayTdee);
    }


    updateMacroData() {
        //if (this.macroData === undefined) {
        this.macroData = [];
        //}
        var cl = (isNaN(this.selectedCalculation.calories) ? 0 : this.selectedCalculation.calories);
        var cc = (isNaN(this.selectedCalculation.carbCalories) ? 0 : this.selectedCalculation.carbCalories);
        var mc = (isNaN(this.selectedCalculation.macroCarbs) ? 0 : this.selectedCalculation.macroCarbs);
        var pc = (isNaN(this.selectedCalculation.proteinCalories) ? 0 : this.selectedCalculation.proteinCalories);
        var mp = (isNaN(this.selectedCalculation.macroProtein) ? 0 : this.selectedCalculation.macroProtein);
        var fc = (isNaN(this.selectedCalculation.fatCalories) ? 0 : this.selectedCalculation.fatCalories);
        var mf = (isNaN(this.selectedCalculation.macroFat) ? 0 : this.selectedCalculation.macroFat);

        //if (this.macroData.length === 0) {
        this.macroData.push({
            calories: Round(cl, 0),
            carbCals: Round(cc, 0),
            macroCarb: Round(mc, 0),
            carbPercent: 0,
            proteinCals: Round(pc, 0),
            macroProtein: Round(mp, 0),
            proteinPercent: 0,
            fatCals: Round(fc, 0),
            macroFat: Round(mf, 0),
            fatPercent: 0
        });
    }


    onChanged(sr: SpinnerReturn) {
        if (sr.spinName === "carbGoal") {
            (<FormControl>this.macroForm.controls['carbGoal']).setValue(sr.spinValue);
        } else if (sr.spinName === "proteinGoal") {
            (<FormControl>this.macroForm.controls['proteinGoal']).setValue(sr.spinValue);
        } else if (sr.spinName === "calorieDifference") {
            (<FormControl>this.macroForm.controls['calorieDifference']).setValue(sr.spinValue);
        }

        this.updateMacroData();
        if (this.firstCalc) {
            this.calculate();
        }
    }
}