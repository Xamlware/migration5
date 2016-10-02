import { Calculation } from '../interfaces/calculation';
import { BareCalculationFormat } from '../interfaces/calculation';
import { User } from '../interfaces/user';
import { Macro } from '../interfaces/macro';
import { ActivityLevelType } from '../enums/activityLevelType.enum';
import { FindHelper } from '../helpers/find.helper';
import { Round } from '../helpers/math.helper';
import * as moment from "moment";

export class CalculationFactory {

    public static createNewCalculation(email: string): Calculation {
        var calc: Calculation = new Calculation();
        calc.pK_Calculation = 0;
        calc.fK_Measurement = 0;
        calc.dateString = "";
        calc.fat = 0;
        calc.bmr = 0;
        calc.lbm = 0;
        calc.kmBmr = 0;
        calc.mjBmr = 0;
        calc.tdee = 0;
        calc.calories = 0;
        calc.carbRange = 0;
        calc.proteinRange = 0;
        calc.macroCarbs = 0;
        calc.macroProtein = 0;
        calc.macroFat = 0;
        calc.carbCalories = 0;
        calc.proteinCalories = 0;
        calc.fatCalories = 0;
        calc.calorieDifference = 0;
        calc.goal = "lose";
        calc.displayProteinRange = 0;
        calc.displayCarbRange = 0;
        calc.displayFat = 0;
        calc.displayBmr = 0;
        calc.displayLbm = 0;
        calc.displayKmBmr = 0;
        calc.displayMjBmr = 0;
        calc.displayTdee = 0;
        calc.displayMacroCarbs = 0;
        calc.displayMacroProtein = 0;
        calc.displayMacroFat = 0;
        calc.displayCarbCalories = 0;
        calc.displayProteinCalories = 0;
        calc.displayFatCalories = 0;
        calc.userEmail = email;
        calc.activityLevel = ActivityLevelType.sedentary;

        return calc;
    }

    public static createCalculation(c: Calculation, u: User, display: boolean) {
        var calc = new Calculation;
        if (display) {
            calc.pK_Calculation = Round(c.pK_Calculation, 0);
            calc.fK_Measurement = Round(c.fK_Measurement, 0);
            calc.dateString = c.dateString;
            calc.fat = Round(c.fat, 1);
            calc.bmr = Round(c.bmr, 0);
            calc.lbm = Round(c.lbm, 1);
            calc.kmBmr = Round(c.kmBmr, 0);
            calc.mjBmr = Round(c.mjBmr, 0);
            calc.tdee = Round(c.tdee, 0);
            calc.calories = Round(c.calories, 0);
            calc.carbRange = Round(c.carbRange, 0);
            calc.proteinRange = Round(c.proteinRange, 0);
            calc.macroCarbs = Round(c.macroCarbs, 0);
            calc.macroProtein = Round(c.macroProtein, 0);
            calc.macroFat = Round(c.macroFat, 0);
            calc.carbCalories = Round(c.carbCalories, 0);
            calc.proteinCalories = Round(c.proteinCalories, 0);
            calc.fatCalories = Round(c.fatCalories, 0);
            calc.calorieDifference = Round(c.calorieDifference, 0);
            calc.goal = c.goal;
            calc.displayProteinRange = Round(c.displayProteinRange, 0);
            calc.displayCarbRange = Round(c.displayCarbRange, 0);
            calc.displayFat = Round(c.displayFat, 0);
            calc.displayBmr = Round(c.displayBmr, 0);
            calc.displayLbm = Round(c.displayLbm, 0);
            calc.displayKmBmr = Round(c.displayKmBmr, 0);
            calc.displayMjBmr = Round(c.displayMjBmr, 0);
            calc.displayTdee = Round(c.displayTdee, 0);
            calc.displayMacroCarbs = Round(c.displayMacroCarbs, 0);
            calc.displayMacroProtein = Round(c.displayMacroProtein, 0);
            calc.displayMacroFat = Round(c.displayMacroFat, 0);
            calc.displayCarbCalories = Round(c.displayCarbCalories, 0);
            calc.displayProteinCalories = Round(c.displayProteinCalories, 0);
            calc.displayFatCalories = Round(c.displayFatCalories, 0);
            calc.userEmail = u.emailAddress;
            calc.activityLevel = c.activityLevel;

        } else {
            calc.pK_Calculation = c.pK_Calculation;
            calc.fK_Measurement = c.fK_Measurement;
            calc.dateString = c.dateString;
            calc.fat = c.fat;
            calc.bmr = c.bmr;
            calc.lbm = c.lbm;
            calc.kmBmr = c.kmBmr;
            calc.mjBmr = c.mjBmr;
            calc.tdee = c.tdee;
            calc.calories = c.calories
            calc.carbRange = c.carbRange
            calc.proteinRange = c.proteinRange;
            calc.macroCarbs = c.macroCarbs;
            calc.macroProtein = c.macroProtein;
            calc.macroFat = c.macroFat;
            calc.carbCalories = c.carbCalories;
            calc.proteinCalories = c.proteinCalories;
            calc.fatCalories = c.fatCalories;
            calc.calorieDifference = c.calorieDifference;
            calc.goal = c.goal;
            calc.displayProteinRange = c.displayProteinRange;
            calc.displayCarbRange = c.displayCarbRange;
            calc.displayFat = c.displayFat;
            calc.displayBmr = c.displayBmr;
            calc.displayLbm = c.displayLbm;
            calc.displayKmBmr = c.displayKmBmr;
            calc.displayMjBmr = c.displayMjBmr;
            calc.displayTdee = c.displayTdee;
            calc.displayMacroCarbs = c.displayMacroCarbs;
            calc.displayMacroProtein = c.displayMacroProtein;
            calc.displayMacroFat = c.displayMacroFat;
            calc.displayCarbCalories = c.displayCarbCalories;
            calc.displayProteinCalories = c.displayProteinCalories;
            calc.displayFatCalories = c.displayFatCalories;
            calc.userEmail = u.emailAddress;
            calc.activityLevel = c.activityLevel;
        }
        return calc;
    }

    public static createCalculationArray(c: Calculation[], u: User, display: boolean): Calculation[] {
        var cc: Calculation[] = [];

        c.forEach(cl => {
            cc.push(this.createCalculation(cl, u, display));
        })

        return cc;
    }


    public static updateNewCalculation(c: Calculation, u: User, mode: String): Calculation {
        var cl: Calculation = null;

        if (mode === "Add") {
            cl = this.createNewCalculation(u.emailAddress);
            cl.pK_Calculation = 0;
            cl.fK_Measurement = 0;
            cl.dateString = c.dateString === "" ? moment(new Date()).format('MM/DD/YYYY') : c.dateString;
        } else {
            cl = FindHelper.FindCalculation(c, u)
        }

        cl.fat = c.fat;
        cl.bmr = c.bmr;
        cl.lbm = c.lbm;
        cl.kmBmr = c.kmBmr;
        cl.mjBmr = c.mjBmr;
        cl.tdee = c.tdee;
        cl.calories = c.calories;
        cl.macroCarbs = c.macroCarbs;
        cl.macroProtein = c.macroProtein;
        cl.macroFat = c.macroFat;
        cl.activityLevel = c.activityLevel;
        cl.userEmail = u.emailAddress;
        return cl;
    };


    public static createBareCalaculationFormat(c: Calculation, u: User): BareCalculationFormat {
        var cl = new BareCalculationFormat();
        cl.pK_Calculation = 0;
        cl.fK_Measurement = 0;
        cl.dateString = c.dateString === "" ? moment(new Date()).format('MM/DD/YYYY') : c.dateString; cl.fat = c.fat;
        cl.bmr = c.bmr;
        cl.lbm = c.lbm;
        cl.kmBmr = c.kmBmr;
        cl.mjBmr = c.mjBmr;
        cl.tdee = c.tdee;
        cl.calories = c.calories;
        cl.macroCarbs = c.macroCarbs;
        cl.macroProtein = c.macroProtein;
        cl.macroFat = c.macroFat;
        cl.activityLevel = c.activityLevel;
        cl.userEmail = u.emailAddress;

        return cl;
    }
}