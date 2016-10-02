import { Physical } from '../interfaces/physical';
import { User } from '../interfaces/user';
import { ActivityLevelType } from '../enums/activityLevelType.enum';
import { FindHelper } from '../helpers/find.helper';

export class PhysicalFactory {

    createNewPhysical(email: string): Physical {
        var p: Physical = new Physical;
        p.pK_Physical = 0;
        p.fK_Measurement = 0;
        p.dateString = "";
        p.type = "";
        p.weight = 0;
        p.height = 0;
        p.hips = 0;
        p.waist = 0;
        p.neck = 0;
        p.activityLevel = 0;
        p.activityLevelAsString = "sedentary";
        p.userEmail = email;

        return p;
    }

    createPhysical(p: Physical, u: User): Physical {
        var pl: Physical = new Physical();
        pl.pK_Physical = p.pK_Physical;
        pl.fK_Measurement = p.fK_Measurement;
        pl.dateString = p.dateString;
        pl.type = p.type;
        pl.weight = p.weight;
        pl.height = p.height;
        pl.hips = p.hips;
        pl.waist = p.waist;
        pl.neck = p.neck;
        pl.activityLevel = p.activityLevel;
        pl.activityLevelAsString = p.activityLevelAsString;
        pl.userEmail = u.emailAddress;

        return pl;
    }

    updateNewPhysical(p: Physical, u: User): Physical {
        var pl: Physical = null;

        
        pl = FindHelper.FindPhysicalByKey(p.pK_Physical, u)
        if (pl === undefined) {
            pl = this.createNewPhysical(u.emailAddress);
        }
        
        pl.dateString = p.dateString;
        pl.type = p.type;
        pl.weight = p.weight;
        pl.height = p.height;
        pl.hips = p.hips;
        pl.waist = p.waist;
        pl.neck = p.neck;
        pl.activityLevel = p.activityLevel;
        pl.activityLevelAsString = ActivityLevelType[p.activityLevel];
        pl.userEmail = u.emailAddress;

        return pl;
    };


    createPhysicalArray(p: Physical[], u: User): Physical[] {
        var pa: Physical[] = [];

        p.forEach(ps => {
            pa.push(new PhysicalFactory().createPhysical(ps, u));
        })

        return pa;
    }
}