import { MealType } from '../enums/mealType.enum';
import { DailyFoodItem } from '../interfaces/dailyFoodItem';

export interface IFood {
  id: string;
  meal: MealType;
  quantity: number;
  unit: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sodium: number;
  fiber: number;
}

export class Food implements IFood {
  id: string;
  meal: MealType;
  quantity: number;
  unit: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sodium: number
  fiber: number
  satFat: number
  monoFat: number
  polyFat: number
  transFat: number
  cholesterol: number
  sugars: number
  vitA: number
  vitC: number
  calcium: number
  iron: number
  potassium: number

  constructor(id: string, meal: MealType, quantity: number, unit: string, name: string, calories: number, carbs: number, protein: number, fat: number) {
    this.id = id;
    this.meal = meal;
    this.quantity = quantity;
    this.unit = unit;
    this.name = name;
    this.calories = calories;
    this.carbs = carbs;
    this.protein = protein;
    this.fat = fat;
  }

  // public static updateFood(name: string, value: boolean, nuts: Nutrient[]) {

  //       var n = FindHelper.FindNutrientItemByName(name, nuts);
  //       if (n != null)
  //       {
  //           n.track = value;
  //       }
  //   }

}

