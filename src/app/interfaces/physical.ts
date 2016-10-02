 import {ActivityLevelType} from '../enums/activityLevelType.enum';
 
 export interface IPhysical {  
    pK_Physical: number;
    fK_Measurement: number;
    dateString: string;
    type: string;
    weight: number;
    height: number;
    hips: number;
    waist: number;
    neck: number;
    activityLevel: ActivityLevelType;
    activityLevelAsString: string;
    userEmail: string;
}

  export class Physical {  
    pK_Physical: number;
    fK_Measurement: number;
    dateString: string;
    type: string;
    weight: number;
    height: number;
    hips: number;
    waist: number;
    neck: number;
    activityLevel: ActivityLevelType;
    activityLevelAsString: string;
    userEmail: string;
  }