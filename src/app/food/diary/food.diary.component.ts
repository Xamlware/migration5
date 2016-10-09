import { Component, OnInit } from '@angular/core';
// import {InputText, Checkbox, Message, Messages, Growl, Panel, Calendar, RadioButton, InputSwitch,
//         SelectButton, SelectItem, DataTable, Column, SplitButton, SplitButtonItem, Button} from 'primeng/primeng'
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DailyFoodItem } from '../../interfaces/dailyFoodItem';
import { User } from '../../interfaces/user';
import { SettingsService } from '../../services/settings.service';
import { FoodService } from '../../services/food.service';
import { LogoutService } from '../../services/logout.service';
import { NutritionixService } from '../../services/nutritionix.service';
import { MealType } from '../../enums/mealType.enum';

@Component({
        
        selector: 'k-fooddiary ',
        templateUrl: 'food.diary.component.html',
        styleUrls: ['food.diary.component.css']
})

export class FoodDiaryComponent implements OnInit {
        foodCols: any[];
        breakfastData: DailyFoodItem[] = [];
        selectedBreakfast: DailyFoodItem;
        lunchData: DailyFoodItem[] = [];
        dinnerData: DailyFoodItem[] = [];
        snackData: DailyFoodItem[] = [];
        userSettings: User;

        constructor(
                private ss: SettingsService,
                private r: Router,
                private fs: FoodService,
                private los: LogoutService) {
        }

        ngOnInit() {
                this.userSettings = this.ss.getUserSettings();
                this.setTableData();

                //this.breakfastData.push(new Food("1", MealType.breakfast, 1, "Taco", "Egg & Sausage Burrito supreme", 350, 38, 15, 30));

                this.foodCols = [
                        { field: 'name', header: 'Item' },
                        { field: 'calories', header: 'Calories' },
                        { field: 'carbs', header: 'Net Carbs' },
                        { field: 'protein', header: 'Protein' },
                        { field: 'fat', header: 'Fat' },
                ];

                for (let n of this.userSettings.nutrientData) {
                        if (n.track) {
                                this.foodCols.push({ field: n.abbr, header: n.name });
                        }
                }

                console.log("get logout subscribe food diary component")
                this.los.getLogout()
                        .subscribe(
                        logout => {
                                if (logout) {
                                        console.log("complete logout food diary component")
                                        this.breakfastData = [];
                                        this.lunchData = [];
                                        this.dinnerData = [];
                                        this.snackData = [];
                                        this.fs.completeLogout();
                                }
                        });
        }

        setTableData() {

                let df = this.fs.getDailyFoodArray();
                if (df != null && df != undefined) {
                        this.breakfastData = df.breakfast;
                        this.lunchData = df.lunch;
                        this.dinnerData = df.dinner;
                        this.snackData = df.snack;
                }

                for (let df of this.userSettings.dailyFoodData.items) {
                        this.fs.setDailyFood(df);
                }

        }

        addFood() {
                this.r.navigate(["/foodAdd"]);
        }

}