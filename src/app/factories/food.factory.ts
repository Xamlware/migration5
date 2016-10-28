import { DailyFood } from '../interfaces/dailyFood';
import { DailyFoodItem } from '../interfaces/dailyFoodItem';

export class FoodFactory {

    createDailyFoodArray(df: DailyFood) : DailyFood[] {
        var dfao: DailyFood[] = []; 
        dfao.push(this.createDailyFood(df)); 

        return dfao;
    }

    createDailyFood(df: DailyFood): DailyFood {
        var dfo: DailyFood = new DailyFood();
        dfo.pK_DailyFood = df.pK_DailyFood;
        dfo.fK_User = df.fK_User;
        dfo.foodDate = df.foodDate;
        dfo.items = this.createDailyFoodItemArray(df);
        //dfo.meals =  DailyFoodMeals;

        return dfo;
    }

    createFoodItem(dfi: DailyFoodItem): DailyFoodItem {
        var dfio: DailyFoodItem = new DailyFoodItem();

        dfio.pK_DailyFoodItem = dfi.pK_DailyFoodItem;
        dfio.fK_DailyFood = dfi.fK_DailyFood;
        dfio.id = dfi.id;
        dfio.brand_id = dfi.brand_id;
        dfio.brand_name = dfi.brand_name;
        dfio.item_description = dfi.item_description;
        dfio.updated = dfi.updated;
        dfio.meal = dfi.meal;
        dfio.quantity = dfi.quantity;
        dfio.unit = dfi.unit;
        dfio.name = dfi.name;
        dfio.calories = dfi.calories;
        dfio.carbs = dfi.carbs;
        dfio.protein = dfi.protein;
        dfio.fat = dfi.fat;
        dfio.sodium = dfi.sodium;
        dfio.fiber = dfi.fiber;
        dfio.satFat = dfi.satFat;
        dfio.monoFat = dfi.monoFat;
        dfio.polyFat = dfi.polyFat;
        dfio.transFat = dfi.transFat;
        dfio.cholesterol = dfi.cholesterol;
        dfio.sugars = dfi.sugars;
        dfio.vitA = dfi.vitA;
        dfio.vitC = dfi.vitC;
        dfio.calcium = dfi.calcium;
        dfio.iron = dfi.iron;
        dfio.potassium = dfi.potassium;
        dfio.processed = false;


        return dfio;
    }

    createDailyFoodItemArray(df: DailyFood): DailyFoodItem[] {
        var dfi: DailyFoodItem[] = [];

        df.items.forEach(d => {
            dfi.push(new FoodFactory().createFoodItem(d));
        })

        return dfi;
    }
}