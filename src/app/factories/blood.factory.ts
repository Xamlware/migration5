import {Blood} from '../interfaces/blood';

export class BloodFactory {

  createNewBlood(): Blood {
    var b: Blood = new Blood();
    b.pK_Blood = 0;
    b.fK_Measurement = 0;
    b.dateString = "";
    b.wbc = 0;
    b.rbc = 0;
    b.hgb = 0;
    b.hct = 0;
    b.mcv = 0;
    b.mch = 0;
    b.mchc = 0;
    b.rdw = 0;
    b.plt = 0;

    return b;
  }

  createBlood(b: Blood): Blood {
    var bd: Blood = new Blood();
    bd.pK_Blood = b.pK_Blood;
    bd.fK_Measurement = b.fK_Measurement;
    bd.dateString = b.dateString;
    bd.wbc = b.wbc;
    bd.rbc = b.rbc;
    bd.hgb = b.hgb;
    bd.hct = b.hct;
    bd.mcv = b.mcv;
    bd.mch = b.mch;
    bd.mchc = b.mchc;
    bd.rdw = b.rdw;
    bd.plt = b.plt;

    return bd;
  }

  createBloodArray(b: Blood[]): Blood[] {
    var bd: Blood[] = [];

    b.forEach(bl => {
      bd.push(new BloodFactory().createBlood(bl));
    })

    return bd;
  }

}