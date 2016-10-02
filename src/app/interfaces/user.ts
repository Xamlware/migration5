import { Measurement } from './measurement';
import { Physical } from './physical';
import { Blood } from './blood';
import { Lipid } from './lipid';
import { Calculation } from './calculation';
import { Nutrient } from './nutrient';

export interface IUser {
    userId: number;
    identityId: string;
    isVerified: string;
    verifyCode: string
    userName: string;
    firstName: string;
    lastName: string;
    dob: string;
    sex: string;
    emailAddress: string;
    profileMetric: boolean;
    measurementMetric: boolean;
    nutrientMetric: boolean;
    recipeMetric: boolean;
    measurementData: Measurement[];
    physicalData: Physical[];
    bloodData: Blood[];
    lipidData: Lipid[];
    calculationData: Calculation[];
    nutrientData: Nutrient[];
    theme: string;
}

export class User implements IUser {
    userId: number;
    identityId: string = "";
    isVerified: string = "";
    verifyCode: string = "";
    userName: string = "";
    firstName: string = "";
    lastName: string = "";
    sex: string = "";
    dob: string = "";
    emailAddress: string = "";
    profileMetric: boolean = false;
    measurementMetric: boolean = false;
    nutrientMetric: boolean = false;
    recipeMetric: boolean = false;
    measurementData: Measurement[] = [];
    physicalData: Physical[] = [];
    bloodData: Blood[] = [];
    lipidData: Lipid[] = [];
    calculationData: Calculation[] = [];
    nutrientData: Nutrient[] = [];
    theme: string = "";
}