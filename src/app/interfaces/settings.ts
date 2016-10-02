import {IMeasurement, Measurement} from './measurement';

export interface ISettings {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    dob: Date;
    dobAsString: string;
    sex: string;
    emailAddress: string;
    profileMetric: boolean;
    measurementMetric: boolean;
    recipeMetric: boolean;
    measurements: Measurement[];
}

export class Settings implements ISettings {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    sex: string;
    dob: Date;
    dobAsString: string;
    emailAddress: string;
    profileMetric: boolean;
    measurementMetric: boolean;
    recipeMetric: boolean;
    measurements: Measurement[];


}