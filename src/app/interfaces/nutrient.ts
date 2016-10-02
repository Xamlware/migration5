import { FindHelper } from '../helpers/find.helper';

export interface INutrient {  
   pK_Nutrient: number;
   fK_User: number;
   name: string;
   abbr: string;
}    

export class Nutrient implements INutrient {  
    pK_Nutrient: number;
    fK_User: number;
    name: string;
    abbr: string;
    order: number;
    track: boolean;


    public static updateNutrient(name: string, value: boolean, nuts: Nutrient[]) {

        var n = FindHelper.FindNutrientItemByName(name, nuts);
        if (n != null)
        {
            n.track = value;
        }
    }

}    