import {Calculation} from '../interfaces/calculation';
import {User} from '../interfaces/user';
import {Physical} from '../interfaces/physical';
import {GetAge} from '../helpers/age.helper';
import { Round } from '../helpers/math.helper';
import {TdeeMultiplier} from '../interfaces/tdeeMultiplier';
import {ActivityLevelType} from '../enums/activityLevelType.enum';
import {SettingsService} from '../services/settings.service';

export class Calculator {
    multipliers: TdeeMultiplier[] = [];
    carbMultiplier: number = 4;
    proteinMultiplier: number = 4;
    fatMultiplier: number = 9;
    carbRangeDefault: number = 20;
    proteinRangeDefault: number = .6;

    constructor() {
        this.multipliers.push({ activityLevel: ActivityLevelType.sedentary, multiplier: 1.2 });
        this.multipliers.push({ activityLevel: ActivityLevelType.light, multiplier: 1.375 });
        this.multipliers.push({ activityLevel: ActivityLevelType.moderate, multiplier: 1.55 });
        this.multipliers.push({ activityLevel: ActivityLevelType.heavy, multiplier: 1.725 });
        this.multipliers.push({ activityLevel: ActivityLevelType.extreme, multiplier: 1.9 });
    }

    calculateBodyFat(user: User, selectedPhysical: Physical): number {
        //us navy formula to compute body fat %
        var fat = 0;
        var waist = selectedPhysical.waist * 1;
        var neck = selectedPhysical.neck * 1;
        var hips = selectedPhysical.hips * 1;
        var height = selectedPhysical.height * 1;
        var wn = waist - neck;
        var whn = (waist + hips) - neck;

        if (user.measurementMetric === true) {
            // convert cm to inches
            waist = waist * .3937008;
            neck = neck * .3937008;
            hips = hips * .3937008;
            wn = waist - neck;
            whn = (waist + hips) - neck;
            //convert meters to inches
            height = height * 39.37008;
        }

        if (user.sex === 'M') {
            //The formula for men: %Fat=495/(1.0324-.19077(log(abdomen-neck))+.15456(log(height)))-450
            //fat = 495 / (1.0324 - (.19077 * (Math.log(wn))) + (.15456 * (Math.log(height)))) - 450;
            fat = (86.010 * Math.log10(wn)) - (70.041 * Math.log10(height)) + 36.76;

        }
        else {
            //The formula for women: %Fat=495/(1.29579-.35004(log(abdomen+hip-neck))+.22100(log(height)))-450
           // fat = 495 / (1.29579 - (.35004 * (Math.log(whn))) + (.22100 * (Math.log(height)))) - 450;
           fat = (163.205 * Math.log10(whn)) - (97.684 * Math.log10(height)) - 78.387;
        }

        console.log("fat = " + fat);
        return fat;
    }

    calculateLbm(u: User, p: Physical, c: Calculation): number {
        /*Katch-Mcardle BMR Formula:
        Lean Body Mass = (Weight(kg) x (100-(Body Fat)))/100 */

        var w = p.weight;
        if (u.measurementMetric === false) {
            w = p.weight / 2.2046;
        };

        var lbm = (w * (100 - (c.fat))) / 100;
        if (u.measurementMetric === false) {
            lbm = lbm * 2.2046;
        }
        console.log("lbm = " + lbm);
        return lbm;
    };

    calculateKmBmr(u: User, c: Calculation): number {
        //Katch-Mcardle BMR Formula:
        //    BMR = 370 + (21.6 x Lean Body Mass(kg) )
        var weight: number = c.lbm;

        if (u.measurementMetric === false) {
            console.log(c.lbm)
            weight = c.lbm / 2.2046;
        };

        var kmBmr = 370 + (21.6 * weight);

        console.log("kmBmr = " + kmBmr);

        return kmBmr;
    }

    calculateMjbmr(u: User, p: Physical): number {
        // Mifflin St. Jeor Equation
        //     For men: BMR = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (years) + 5
        //     For women: BMR = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (years) – 161 */
        var cal: number = 0;
        var weight: number = p.weight;
        var height: number = p.height;
        var mjbmr = 0;
        var age: number = GetAge(u);

        if (u.measurementMetric === false) {
            //convert to metric
            weight = weight / 2.2046;
            height = height * 2.54;
        } else {
            //convert meters to cm
            height = height * 100;
        }


        if (weight > 0 && height > 0 && height > 0) {
            mjbmr = (10 * weight) + (6.25 * height) - (5 * age);

            if (u.sex === 'M') {
                //For men: BMR = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (years) + 5
                mjbmr = (mjbmr + 5);
            }
            else {
                //For women: BMR = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (years) – 161
                mjbmr = mjbmr - 161;
            }
        }
        console.log("mjBmr = " + mjbmr);

        return mjbmr;
    }

    calculateBmr(user: User, physical: Physical, c: Calculation): number {
        var mjbmr = this.calculateMjbmr(user, physical);
        c.mjBmr = mjbmr;

        var res = (mjbmr + c.kmBmr) / 2;

        console.log("Bmr = " + res);

        return res;
    }


    calculateTdee(p: Physical, c: Calculation): number {
        var retVal = 0;
        for (let m of this.multipliers) {
            if (m.activityLevel === p.activityLevel) {
                var cal = m.multiplier * c.bmr;
                retVal = cal; // + (cal * .10);
                break;
            }
        }
        console.log("tdee = " + retVal);

        return retVal;
    }

    calculateMacroCarbs(c: Calculation): number {
        var carb = (c.carbRange === 0 ? this.carbRangeDefault : c.carbRange);
        console.log("carbs = " + carb);

        return carb;
    }

    calculateCarbCalories(c: Calculation): number {
        var carbCals = c.carbRange * this.carbMultiplier;
        console.log('carb range = ' + c.carbRange);
        console.log("carb cals = " + carbCals);

        return carbCals;
    }

    calculateMacroProtein(c: Calculation): number {
        var p = (c.lbm * (c.proteinRange === 0 ? this.proteinRangeDefault : c.proteinRange));

        console.log('proteinRange = ' + c.proteinRange);
        console.log("protein = " + p);

        return p;
    }

    calculateProteinCalories(c: Calculation): number {
        var pCals = c.macroProtein * this.proteinMultiplier
        console.log('multiplier = ' + this.proteinMultiplier);
        console.log("protein cals = " + pCals);

        return pCals;
    }

    calculateMacroFat(c: Calculation): number {
        var tCals: number = 0;
        var factor: number = 0;
        if ((c.goal === "lose" || c.goal === "maintain")) {
            tCals = (c.tdee - (c.tdee * (c.calorieDifference / 100)));
            // cals = cals - (cals * (c.calorieDifference/100));
        }
        else {
            tCals = (c.tdee + (c.tdee * (c.calorieDifference / 100)));
            // cals = cals + (cals * (c.calorieDifference/100))
        }

        var cals = tCals - c.carbCalories - c.proteinCalories;
        var f = cals / this.fatMultiplier;
        console.log("cal left = " + cals);
        console.log("fatmacro = " + f);
        return f;
    }

    calculateFatCalories(c: Calculation): number {
        var fCals = c.macroFat * this.fatMultiplier;
        console.log("fat cals = " + fCals);
        return fCals;
    }

    calculateCarbPercent(c: Calculation): number {
        return c.carbCalories / (c.carbCalories + c.proteinCalories + c.fatCalories)
    }

    calculateProteinPercent(c: Calculation): number {
        return c.proteinCalories / (c.carbCalories + c.proteinCalories + c.fatCalories)
    }

    calculateFatPercent(c: Calculation): number {
        return c.fatCalories / (c.carbCalories + c.proteinCalories + c.fatCalories)
    }

    calculateKrRatio() {
        //The equation basically gives you the potential ketone producing potential of a given meal depending on the relative ketogenic or anti-ketogenic effect of the different macronutrients.
        // 0.9 fat + 0.46 protein / 1 * carbohydrate + .1 * fat + .58 * protein >= 1.5
    }

    calculateCalories(c: Calculation): number {
        return ((Round(c.macroCarbs, 0) + Round(c.macroProtein, 0)) * 4) + (Round(c.macroFat,0) * 9);
    }
}