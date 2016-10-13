import { Nutrient } from '../interfaces/nutrient';

export class NutrientFactory {

    createNewNutrient(): Nutrient {
        var l: Nutrient = new Nutrient();
        l.pK_Nutrient = 0;
        l.fK_User = 0;
        l.name = "";
        l.abbr = "";

        return l;
    }

    createNutrient(l: Nutrient): Nutrient {
        var lp: Nutrient = new Nutrient();

        lp.pK_Nutrient = l.pK_Nutrient;
        lp.fK_User = l.fK_User
        lp.name = l.name;
        lp.abbr = l.abbr;

        return lp;
    }

    createNutrientArray(na: Nutrient[]): Nutrient[] {
        var n: Nutrient[] = [];

        na.forEach(nt => {
            n.push(new NutrientFactory().createNutrient(nt));
        })

        return n;
    }
}