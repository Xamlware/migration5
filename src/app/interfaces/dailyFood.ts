import { DailyFoodItem } from './dailyFoodItem';
import { MealType } from '../enums/mealType.enum';
import { User } from './user';


export class DailyFoodArray {
  breakfast: DailyFoodItem[] = [];
  lunch: DailyFoodItem[] = [];
  dinner: DailyFoodItem[] = [];
  snack: DailyFoodItem[] = [];
}

export class DailyFood {
        pK_DailyFood: number;
        fK_User: number;
        date: Date;
        items: DailyFoodItem[]=[];

        createDailyFood(dfa: DailyFoodArray, u: User)  : DailyFood {
                let df = new DailyFood();
                df.date = new Date();
                df.fK_User = u.pK_User;

                for (var b of dfa.breakfast) {
                        b.meal = MealType.breakfast;
                        df.items.push(b);
                }

                for (var l of dfa.lunch) {
                        l.meal = MealType.lunch;
                        df.items.push(b);
                }

                for (var d of dfa.dinner) {
                        d.meal = MealType.dinner;
                        df.items.push(b);
                }

                for (var s of dfa.snack) {
                        s.meal = MealType.snack;
                        df.items.push(b);
                }

                return df;
        }
}

