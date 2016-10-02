import {Round} from '../helpers/math.helper';
import {ActivityLevelType} from '../enums/activityLevelType.enum';
export interface ICalculation {
    pK_Calculation: number;
    fK_Measurement: number;
    dateString: string;
    fat: number;
    bmr: number;
    lbm: number;
    kmBmr: number;
    mjBmr: number;
    tdee: number;
    calories: number;
    macroCarbs: number;
    macroProtein: number;
    macroFat: number;
    userEmail: string;
    activityLevel: ActivityLevelType;
}

export class BareCalculationFormat implements ICalculation {
    pK_Calculation: number;
    fK_Measurement: number;
    dateString: string;
    fat: number;
    bmr: number;
    lbm: number;
    kmBmr: number;
    mjBmr: number;
    tdee: number;
    calories: number;
    macroCarbs: number;
    macroProtein: number;
    macroFat: number;
    activityLevel: ActivityLevelType;
    userEmail: string;
}

export class Calculation implements ICalculation {
    pK_Calculation: number;
    fK_Measurement: number;
    dateString: string;
    fat: number;
    bmr: number;
    lbm: number;
    kmBmr: number;
    mjBmr: number;
    tdee: number;
    proteinRange: number = .6;
    carbRange: number = 20;
    macroCarbs: number;
    macroProtein: number;
    macroFat: number;
    calories: number;
    carbCalories: number;
    proteinCalories: number;
    fatCalories: number;
    calorieDifference: number;
    goal: string;
    displayCalories: number = 0;
    displayProteinRange: number = 0;
    displayCarbRange: number = 0;
    displayFat: number = 0;
    displayBmr: number = 0;
    displayLbm: number = 0;
    displayKmBmr: number = 0;
    displayMjBmr: number = 0;
    displayTdee: number = 0;
    displayMacroCarbs: number = 0;
    displayMacroProtein: number = 0;
    displayMacroFat: number = 0;
    displayCarbCalories: number = 0;
    displayProteinCalories: number = 0;
    displayFatCalories: number = 0;
    activityLevel: ActivityLevelType;
    userEmail: string;

    setDisplayCalories() {
        this.displayCalories = Round(isNaN(this.calories) ? 0 : this.calories, 0);
    }

    setDisplayCarbRange() {
        this.displayCarbRange = Round(isNaN(this.carbRange) ? 0 : this.carbRange, 0);
    }

    setDisplayProteinRange() {
        this.displayProteinRange = Round(this.proteinRange, 1);
    }
    setDisplayFat() {
        this.displayFat = Round(isNaN(this.fat) ? 0 : this.fat, 1);
    }

    setDisplayCarbCalories() {
        this.displayCarbCalories = Round(this.carbCalories, 0);
    }

    setDisplayProteinCalories() {
        this.displayProteinCalories = Round(this.proteinCalories, 1);
    }

    setDisplayFatCalories() {
        this.displayFatCalories = Round(this.fatCalories, 0);
    }

    setDisplayBmr() {
        this.displayBmr = Round(isNaN(this.bmr) ? 0 : this.bmr, 0);
    }

    setDisplayLbm() {
        this.displayLbm = Round(isNaN(this.lbm) ? 0 : this.lbm, 1);
    }

    setDisplayKmBmr() {
        this.displayKmBmr = Round(isNaN(this.kmBmr) ? 0 : this.kmBmr, 0);
    }

    setDisplayMjBmr() {
        this.displayMjBmr = Round(isNaN(this.mjBmr) ? 0 : this.mjBmr, 0);
    }

    setDisplayTdee() {
        this.displayTdee = Round(isNaN(this.tdee) ? 0 : this.tdee, 0);
    }

    setDisplayMacroCarbs() {
        this.displayMacroCarbs = Round(this.macroCarbs, 0);
    }

    setDisplayMacroProtein() {
        this.displayMacroProtein = Round(this.macroProtein, 0);
    }

    setDisplayMacroFat() {
        this.displayMacroFat = Round(this.macroFat, 0);
    }
}