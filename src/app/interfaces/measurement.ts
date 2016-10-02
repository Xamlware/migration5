export interface IMeasurement {  
   pK_Measurement: number;
   fK_User: number;
   dateString: string;
}    

export class Measurement implements IMeasurement {  
    pK_Measurement: number;
    fK_User: number;
    dateString: string;
}    