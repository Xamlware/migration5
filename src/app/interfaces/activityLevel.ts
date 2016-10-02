import {ActivityLevelType} from '../enums/activityLevelType.enum';

export interface IActivityLevel {
    activityLevel: number;
    male: number;
    female: number;
    message: string;
}

export class ActivityLevel implements IActivityLevel {
    activityLevel: number;
    male: number;
    female: number;
    message: string;  
}