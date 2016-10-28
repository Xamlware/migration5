import { User } from '../interfaces/user';
import { Physical } from '../interfaces/physical';
import { Calculation } from '../interfaces/calculation';
import { Blood } from '../interfaces/blood';
import { Lipid } from '../interfaces/lipid';
import { Measurement } from '../interfaces/measurement';
import { Nutrient } from '../interfaces/nutrient';
import { DailyFood } from '../interfaces/dailyFood';

import { MeasurementFactory } from '../factories/measurement.factory';
import { PhysicalFactory } from '../factories/physical.factory';
import { BloodFactory } from '../factories/blood.factory';
import { LipidFactory } from '../factories/lipid.factory';
import { NutrientFactory } from '../factories/nutrient.factory';
import { CalculationFactory } from '../factories/calculation.factory';
import { FoodFactory } from '../factories/food.factory';


export class UserFactory {
    createNewUser() : User{
        var u: User = new User();
        u.userId = 0;
        u.pK_User = 0;
        u.userName = "";   
        u.firstName = "";
        u.lastName = "";
        u.sex = "";
        u.dob = "";
        u.emailAddress = "";
        u.profileMetric = false;
        u.measurementMetric = false;
        u.nutrientMetric = false;
        u.recipeMetric = false;
        u.measurementData = new Array<Measurement>();
        u.physicalData = Array<Physical>();
        u.bloodData = Array<Blood>();
        u.lipidData = Array<Lipid>();
        u.calculationData = Array<Calculation>();
        u.nutrientData = Array<Nutrient>();
        u.dailyFoodData =  Array<DailyFood>();
        u.foodDates = Array<Date>();
        u.theme = "";

        return u;
    }

    createUser(u: User) : User {
        var ur: User = new User;
        ur.userId = u.userId;
        u.pK_User = u.pK_User;
        ur.userName = u.userName; 
        ur.firstName = u.firstName;
        ur.lastName = u.lastName;        
        ur.sex = u.sex;
        ur.dob = u.dob;
        ur.emailAddress = u.emailAddress;
        ur.profileMetric = u.profileMetric;
        ur.measurementMetric = u.measurementMetric;
        ur.nutrientMetric = u.nutrientMetric;
        ur.recipeMetric = u.recipeMetric;
        ur.measurementData = new MeasurementFactory().createMeasurementArray(u.measurementData);
        ur.physicalData = new PhysicalFactory().createPhysicalArray(u.physicalData, u);
        ur.bloodData = new BloodFactory().createBloodArray(u.bloodData);
        ur.lipidData = new LipidFactory().createLipidArray(u.lipidData);
        ur.calculationData = CalculationFactory.createCalculationArray(u.calculationData, u, false);
        ur.nutrientData = new NutrientFactory().createNutrientArray(u.nutrientData);
        ur.dailyFoodData = new FoodFactory().createDailyFoodArray(u.dailyFoodData);
        ur.foodDates = Array<Date>();
        ur.theme = u.theme;

        return ur;
    }
}
