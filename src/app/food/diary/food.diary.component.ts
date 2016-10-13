import { Component, OnInit } from '@angular/core';
// import {InputText, Checkbox, Message, Messages, Growl, Panel, Calendar, RadioButton, InputSwitch,
//         SelectButton, SelectItem, DataTable, Column, SplitButton, SplitButtonItem, Button} from 'primeng/primeng'
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DailyFoodItem } from '../../interfaces/dailyFoodItem';
import { User } from '../../interfaces/user';
import { FindHelper } from '../../helpers/find.helper';
import { SettingsService } from '../../services/settings.service';
import { FoodService } from '../../services/food.service';
import { LogoutService } from '../../services/logout.service';
import { NutritionixService } from '../../services/nutritionix.service';
import { MealType } from '../../enums/mealType.enum';
import { DateSpinnerReturn } from '../../interfaces/dateSpinnerReturn';
import * as moment from "moment";

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
        diaryDate: string;
        isFoodDate: boolean = false;

        constructor(
                private ss: SettingsService,
                private r: Router,
                private fs: FoodService,
                private los: LogoutService) {
        }

        ngOnInit() {
                this.userSettings = this.ss.getUserSettings();
                this.setTableData();

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

                this.los.getLogout()
                        .subscribe(
                        logout => {
                                if (logout) {
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


        onChanged(sr: DateSpinnerReturn) {
           this.diaryDate = sr.spinValue;
           var fd = this.ss.getUserSettings().foodDates;
           this.isFoodDate = FindHelper.findFoodDate(this.diaryDate, fd);
        }

        onLoadFood(sr: DateSpinnerReturn) {
           this.diaryDate = sr.spinValue;
           var d = moment(this.diaryDate).format("M-D-YYYY")
           this.fs.getDailyFoodByDate(d);
    }

}