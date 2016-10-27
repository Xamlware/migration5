import { Component, OnInit, HostListener } from '@angular/core';
// import {InputText, Checkbox, Message, Messages, Growl, Panel, Calendar, RadioButton, InputSwitch,
//         SelectButton, SelectItem, DataTable, Column, SplitButton, SplitButtonItem, Button} from 'primeng/primeng'
import { Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DailyFoodItem } from '../../interfaces/dailyFoodItem';
import { User } from '../../interfaces/user';
import { FindHelper } from '../../helpers/find.helper';
import { SettingsService } from '../../services/settings.service';
import { FoodService } from '../../services/food.service';
import { LogoutService } from '../../services/logout.service';
import { CanDeactivateGuardService } from '../../services/canDeactivateGuard.service';
import { NutritionixService } from '../../services/nutritionix.service';
import { MealType } from '../../enums/mealType.enum';
import { DateSpinnerReturn } from '../../interfaces/dateSpinnerReturn';
import * as moment from "moment";
import { Observable } from 'rxjs/Observable';

@Component({

        selector: 'k-fooddiary ',
        templateUrl: 'food.diary.component.html',
        styleUrls: ['food.diary.component.css']
})

export class FoodDiaryComponent implements OnInit, CanDeactivate<FoodDiaryComponent> {
        foodCols: any[];
        selectedBreakfast: DailyFoodItem;

        breakfastData: DailyFoodItem[] = [];
        lunchData: DailyFoodItem[] = [];
        dinnerData: DailyFoodItem[] = [];
        snackData: DailyFoodItem[] = [];

        userSettings: User;
        diaryDate: Date;
        isFoodDate: boolean = false;

        @HostListener('window:unload', ['$event'])
        unloadHandler(event) {
                debugger;
        }

        @HostListener('window:beforeunload', ['$event'])
        beforeUnloadHander(event) {
                debugger;
        }

        constructor(
                private ss: SettingsService,
                private r: Router,
                private fs: FoodService,
                private los: LogoutService,
                private cd: CanDeactivateGuardService) {
        }

        canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
                // // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
                // if (!this.crisis || this.crisis.name === this.editName) {
                //         return true;
                // }
                // // Otherwise ask the user with the dialog service and return its
                // // promise which resolves to true or false when the user decides
                // return this.dialogService.confirm('Discard changes?');
                debugger;
                return true;
        }


        ngOnInit() {
                this.userSettings = this.ss.getUserSettings();
                this.fs.setDailyFood(this.userSettings.dailyFoodData);
                // this.fs.dailyFoodArray.push(this.fs.dailyFood)
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

                this.fs.getDailyFoodObservableByDate()
                        .subscribe(
                        dailyFood => {
                                if (dailyFood) {
                                        console.log("setting daily food from observable");
                                        this.setTableData();
                                }
                        });
        }

        setTableData() {

                let df = this.fs.getDailyFoodMeals();
                if (df != null && df != undefined) {
                        this.breakfastData = df.breakfast;
                        this.lunchData = df.lunch;
                        this.dinnerData = df.dinner;
                        this.snackData = df.snack;
                }

                for (let df of this.fs.dailyFood.items) {
                        debugger;
                        if (!df.processed) {
                                this.fs.setDailyFoodItem(df);
                                df.processed = true;
                        }
                }

        }

        addFood() {
                this.r.navigate(["/foodAdd"]);
        }


        onChanged(sr: DateSpinnerReturn) {
                this.diaryDate = sr.spinValue;
                debugger;

                this.fs.clearDailyFoodMeals();
                var fd = this.fs.foodDates;
                this.isFoodDate = FindHelper.findFoodDate(this.diaryDate, fd);
        }


        onLoadFood(sr: DateSpinnerReturn) {
                this.diaryDate = sr.spinValue;
                var d = moment(this.diaryDate).format("M-D-YYYY");
                debugger;
                var dfaItem = FindHelper.FindDailyFoodByDate(d, this.fs.dailyFoodArray);
                if (dfaItem != null) {
                        this.fs.dailyFood = dfaItem;
                        this.fs.setDailyFoodItemObservableByDate(dfaItem);
                        this.setTableData();
                }
                else {
                        this.fs.getDailyFoodByDate(d);
                }
        }

}