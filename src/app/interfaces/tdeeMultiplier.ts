import {ActivityLevelType} from '../enums/activityLevelType.enum';

export interface ITdeeMultiplier {  
   activityLevel: ActivityLevelType;
   multiplier: number;
 }

  export class TdeeMultiplier {  
    activityLevel: ActivityLevelType;
   multiplier: number;
}
