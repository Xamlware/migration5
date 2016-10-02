import {Lipid} from '../interfaces/Lipid';

export class LipidFactory {

    createNewLipid(): Lipid {
        var l: Lipid = new Lipid();
        l.pK_Lipid = 0;
        l.fK_Measurement = 0;
        l.dateString = "";
        l.chol = 0;
        l.hdl = 0;
        l.ldl = 0;
        l.trig = 0;

        return l;
    }

    createLipid(l: Lipid): Lipid {
        var lp: Lipid = new Lipid();
        lp.pK_Lipid = l.pK_Lipid;
        lp.fK_Measurement = l.fK_Measurement;
        lp.dateString = l.dateString;
        lp.chol = l.chol;
        lp.hdl = l.hdl;
        lp.ldl = l.ldl;
        lp.trig = l.trig;

        return lp;
    }

    createLipidArray(l: Lipid[]): Lipid[] {
        var lp: Lipid[] = [];

        l.forEach(ld => {
            lp.push(new LipidFactory().createLipid(ld));
        })

        return lp;
    }
}