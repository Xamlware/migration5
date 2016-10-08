import { MealType } from '../enums/mealType.enum';

export class DailyFoodItem {
    pK_DailyFoodItem: number = 0;
    fK_DailyFood: number = 0;
    id: string = "";
    brand_id: string = "";
    brand_name: string = "";
    item_description: string = "";
    updated: string = "";
    meal: MealType = MealType.none;
    quantity: number = 0;
    unit: number = 0;
    name: string = "";
    calories: number = 0;
    carbs: number = 0;
    protein: number = 0;
    fat: number = 0;
    sodium: number = 0;
    fiber: number = 0;
    satFat: number = 0;
    monoFat: number = 0;
    polyFat: number = 0;
    transFat: number = 0;
    cholesterol: number = 0;
    sugars: number = 0;
    vitA: number = 0;
    vitC: number = 0;
    calcium: number = 0;
    iron: number = 0;
    potassium: number = 0;

    // getNewDailyFoodItem() : DailyFoodItem {
    //     let dfi = new DailyFoodItem();
    //     dfi.pK_DailyFoodItem: number = 0;
    //     dfi.fK_DailyFood: number = 0;
    //     dfi.id: number = 0;
    //     dfi.meal: MealType.None;
    //     dfi.quantity: number = 0;
    //     dfi.unit: number = 0;
    //     dfi.name: string
    //     dfi.calories: number = 0;
    //     dfi.carbs: number = 0;
    //     dfi.protein: number = 0;
    //     dfi.fat: number = 0;
    //     dfi.sodium: number = 0;
    //     dfi.fiber: number = 0;
    //     dfi.satFat: number = 0;
    //     dfi.monoFat: number = 0;
    //     dfi.polyFat: number = 0;
    //     dfi.transFat: number = 0;
    //     dfi.cholesterol: number = 0;
    //     dfi.sugars: number = 0;
    //     dfi.vitA: number = 0;
    //     dfi.vitC: number = 0;
    //     dfi.calcium: number = 0;
    //     dfi.iron: number = 0;
    //     dfi.potassium: number = 0;

    //     return dfi;
    // }
}