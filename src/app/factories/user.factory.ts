import {User} from '../interfaces/user';
import {Physical} from '../interfaces/physical';
import {Calculation} from '../interfaces/calculation';
import {Blood} from '../interfaces/blood';
import {Lipid} from '../interfaces/lipid';
import {Measurement} from '../interfaces/measurement';
import {MeasurementFactory} from '../factories/measurement.factory';
import {PhysicalFactory} from '../factories/physical.factory';
import {BloodFactory} from '../factories/blood.factory';
import {LipidFactory} from '../factories/lipid.factory';
import {CalculationFactory} from '../factories/calculation.factory';

export class UserFactory {
    createNewUser() : User{
        var u: User = new User();
        u.userId = 0;
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

        return u;
    }

    createUser(u: User) : User {
        var ur: User = new User;
        ur.userId = u.userId;
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

        return ur;
    }


}
