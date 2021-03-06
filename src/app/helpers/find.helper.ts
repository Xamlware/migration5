import { Physical } from '../interfaces/physical';
import { Measurement } from '../interfaces/measurement';
import { Calculation } from '../interfaces/calculation';
import { CalculationFactory } from '../factories/calculation.factory';
import { PhysicalFactory } from '../factories/physical.factory';
import { User } from '../interfaces/user';
import { Nutrient } from '../interfaces/nutrient';
import { DailyFood, DailyFoodMeals } from '../interfaces/dailyFood';
import { DailyFoodItem } from '../interfaces/dailyFoodItem';
import { MealType } from '../enums/mealType.enum';
import * as moment from "moment";

export class FindHelper {
    public static FindMeasurement(u: User): Measurement {
        var rec: Measurement = null;
        var m = u.measurementData.filter(m => {
            return m.fK_User == u.userId;
        });

        if (m.length > 0) {
            rec = m[0];
        }

        return rec;
    }

    public static FindMeasurementByKey(key: number, u: User): Measurement {
        var rec: Measurement = null;

        var m = u.measurementData.filter(m => {
            return m.pK_Measurement == key;
        });

        if (m.length > 0) {
            rec = m[0];
        }

        return rec;
    }

    public static FindMeasurementByDate(date: string, u: User): Measurement {
        var rec: Measurement = null;
        var m = u.measurementData.filter(m => {
            return m.dateString == date && m.fK_User == u.userId
        })

        if (m.length > 0) {
            rec = m[0];
        }


        return rec;
    }


    public static FindPhysicalByKey(key: number, u: User) {
        var pl: Physical = new Physical;
        for (let p of u.physicalData) {
            if (p.fK_Measurement === key) {
                pl = new PhysicalFactory().createPhysical(p, u);
                break;
            }
        }

        return pl;
    }


    public static FindPhysicalByDate(date: string, u: User) {
        var rec: Physical = null;
        var m = this.FindMeasurementByDate(date, u);
        if (m !== null) {
            var p = u.physicalData.filter(p => {
                return p.dateString == date && p.fK_Measurement == m.pK_Measurement
            });

            if (p.length > 0) {
                rec = p[0];
            }
        }

        return rec;
    }

    public static FindPhysicalByEmail(p: Physical, u: User): Physical {
        var rec: Physical = null;

        var ph = u.physicalData.filter(m => {
            return m.userEmail == u.emailAddress;
        });

        if (ph.length > 0) {
            rec = ph[0];
        }

        if (rec !== null && (rec.dateString !== undefined || rec.dateString === "")) {
            var m = this.FindMeasurementByKey(rec.fK_Measurement, u);
            rec.dateString = m.dateString;
        }

        return rec;
    }

    public static FindCalculation(p: Calculation, u: User): Calculation {
        var rec: Calculation = null;
        for (let cl of u.calculationData) {
            if (cl.userEmail = u.emailAddress) {
                rec = cl;
                break;
            }
        }

        if (rec !== null && (rec.dateString !== undefined || rec.dateString === "")) {
            var m = this.FindMeasurementByKey(rec.fK_Measurement, u);
            rec.dateString = m.dateString;
        }

        return rec;
    }


    public static FindCalculationByKey(user: User, key: number, display: boolean): Calculation {
        var calc: Calculation;

        for (let c of user.calculationData) {
            if (c.fK_Measurement === key) {
                calc = CalculationFactory.createCalculation(c, user, display);
                break;
            }
        }

        return calc;
    }


    public static FindCalculationByDate(date: string, u: User) {
        var rec: Calculation = null;
        var m = this.FindMeasurementByDate(date, u);
        if (m !== null) {
            var p = u.calculationData.filter(p => {
                return p.dateString == date && p.fK_Measurement == m.pK_Measurement
            });

            if (p.length > 0) {
                rec = p[0];
            }
        }

        return rec;
    }

    public static FindNutrientItemByName(name: string, nuts: Nutrient[]) {
        var rec: Nutrient = null;
        var n: Nutrient[] = null;

        // var nuts = nutrients.filter(p => {
        //     return p.track === true;
        // });

        // if (nuts.length > 0) {
        n = nuts.filter(r => {
            return r.abbr === name;
        });

        if (n.length > 0) {
            rec = n[0];
        }
        // }

        return rec;
    }



    public static FindDailyFoodByKey(date: string, key: number, u: User) {
        var rec: DailyFoodItem = null;
        var dfi: DailyFoodItem[];

        var df = FindHelper.FindDailyFoodByDateString(date, u.dailyFoodData);
        if (df != null) {
            dfi = df.items.filter(di => {
                return di.pK_DailyFoodItem === key;
            });
        }
        if (dfi.length > 0) {
            rec = dfi[0];
        }

        return rec;
    }

    /*
        Find daily food record by Date.
    */
    public static FindDailyFoodByDateString(date: string, dfa: DailyFood[]): DailyFood {
        var rec: DailyFood = null;

        if (dfa != null) {
            var df = dfa.filter(di => {
                return moment(di.foodDate).format("M/D/YYYY") === moment(date).format("M/D/YYYY");
            });

            if (df.length > 0) {
                rec = df[0];
            }
        }

        return rec;
    }

    public static FindDailyFoodByDate(date: Date, dfa: DailyFood[]): DailyFood {
        var rec: DailyFood = null;

        if (dfa != null) {
            var df = dfa.filter(di => {
                return moment(di.foodDate).format("M/D/YYYY") === moment(date.toDateString()).format("M/D/YYYY");
            });

            if (df.length > 0) {
                rec = df[0];
            }
        }

        return rec;
    }

    public static FindDailyFoodByMeal(meal: MealType, dfi: DailyFoodItem[]): DailyFoodItem[] {

        return dfi.filter(di => {
            return di.meal === meal;
        });

    }


    public static FindDailyFoodMealsByKey(key: number, meal: MealType, dfa: DailyFoodMeals): boolean {
        var array: DailyFoodItem[];

        switch (meal) {
            case MealType.breakfast:
                array = dfa.breakfast;
                break;
            case MealType.lunch:
                array = dfa.lunch;
                break;
            case MealType.dinner:
                array = dfa.dinner;
                break;
            case MealType.snack:
                array = dfa.snack;
                break;
        }

        return this.findFoodInMeal(meal, array, key);
    }

    private static findFoodInMeal(mealType: MealType, dfi: DailyFoodItem[], key: number): boolean {
        var item = dfi.filter(di => {
            return di.pK_DailyFoodItem === key;
        });

        return (item.length > 0);
    }

    public static findFoodDate(date: Date, fda: Array<Date>): boolean {
        var m = moment(date).format("M/D/YYYY");

        var fd = fda.filter(f => {
            return moment(f).format("M/D/YYYY") === m;
        });

        return fd.length > 0;
    }

}