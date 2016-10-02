 import {Measurement} from '../interfaces/measurement';

export class MeasurementFactory {
    
    createNewMeasurement() : Measurement{
        var m: Measurement = new Measurement();
        m.pK_Measurement = 0;
        m.fK_User = 0;
        m.dateString = "";

        return m;
    }

      createMeasurement(m: Measurement) : Measurement {
        var ms: Measurement = new Measurement();
        ms.pK_Measurement = m.pK_Measurement;
        ms.fK_User = m.fK_User;

        ms.dateString = m.dateString;

        return ms;
    }

      createMeasurementArray(m: any) : Measurement[] {
        var mt: Measurement[] = [];

        for(let ms of m){
        }

        // m.forEach(mm => {
        //     mt.push(new MeasurementFactory().createMeasurement(mm));
        // })

        return mt;
    }
}