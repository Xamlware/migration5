import { Component, OnInit, HostListener } from '@angular/core';
import { Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';

import { DailyFoodItem } from '../../interfaces/dailyFoodItem';
import { User } from '../../interfaces/user';
import { NutrientDisplay } from '../../interfaces/nutrientDisplay';

import { FindHelper } from '../../helpers/find.helper';
import { SettingsService } from '../../services/settings.service';
import { FoodService } from '../../services/food.service';
import { LogoutService } from '../../services/logout.service';
import { CanDeactivateGuardService } from '../../services/canDeactivateGuard.service';
import { FoodFactory } from '../../factories/food.factory';
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
        totalData: DailyFoodItem[] = [];

        userSettings: User;
        diaryDate: Date;
        isFoodDate: boolean = false;
        nutrientDisplay: NutrientDisplay;
        isAddFood: boolean = false;

        // @HostListener('window:unload', ['$event'])
        // unloadHandler(event) {
        //         debugger;
        // }

        // @HostListener('window:beforeunload', ['$event'])
        // beforeUnloadHander(event) {
        //         debugger;
        //         this.confirm();

        // }

        constructor(
                private cs: ConfirmationService,
                private ss: SettingsService,
                private r: Router,
                private fs: FoodService,
                private los: LogoutService,
                private cd: CanDeactivateGuardService) {
        }

        confirm() {
                this.cs.confirm({
                        message: 'Do you want to save the additions to your food diary?',
                        accept: () => this.updateFood()
                })
        }

        canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
                // // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
                // if (!this.crisis || this.crisis.name === this.editName) {
                //         return true;
                // }
                // // Otherwise ask the user with the dialog service and return its
                // // promise which resolves to true or false when the user decides
                // return this.dialogService.confirm('Discard changes?');
                if (!this.isAddFood) {
                        this.isAddFood = false;
                        this.updateFood();
                }

                return true;
        }


        ngOnInit() {
                this.userSettings = this.ss.getUserSettings();
                this.nutrientDisplay = this.fs.getNutrientDisplay();
                this.setTableData();

                // this.foodCols = [
                //         { field: 'name', header: 'Item' },
                //         { field: 'calories', header: 'Calories' },
                //         { field: 'carbs', header: 'Net Carbs' },
                //         { field: 'protein', header: 'Protein' },
                //         { field: 'fat', header: 'Fat' },
                // ];

                // for (let n of this.userSettings.nutrientData) {
                //         if (n.track) {
                //                 this.foodCols.push({ field: n.abbr, header: n.name });
                //         }
                // }

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
                        df => {
                                if (df) {
                                        debugger;
                                        console.log("setting daily food from observable");
                                        this.setTableData();
                                }
                        });
        }

        setTableDataToEmpty() {
                this.breakfastData = [];
                this.lunchData = [];
                this.dinnerData = [];
                this.snackData = [];
                this.totalData = [];
        }

        setTableData() {
                if (this.diaryDate === null || this.diaryDate === undefined) {
                        this.diaryDate = moment(new Date()).toDate();
                        this.fs.diaryDate = this.diaryDate;
                }
                this.setTableDataToEmpty();
                var dailyFood = FindHelper.FindDailyFoodByDate(this.diaryDate, this.userSettings.dailyFoodData);
                if (dailyFood != null || dailyFood != undefined) {
                        this.breakfastData = FindHelper.FindDailyFoodByMeal(MealType.breakfast, dailyFood.items);
                        this.lunchData = FindHelper.FindDailyFoodByMeal(MealType.lunch, dailyFood.items);
                        this.dinnerData = FindHelper.FindDailyFoodByMeal(MealType.dinner, dailyFood.items);
                        this.snackData = FindHelper.FindDailyFoodByMeal(MealType.snack, dailyFood.items);
                        this.totalFoodItems(dailyFood.items);
                }
        }

        addFood() {
                this.isAddFood = true;
                this.r.navigate(["/foodAdd"]);
        }

        totalFoodItems(dfi: DailyFoodItem[]) {
                this.totalData.push(this.fs.totalDailyFoodItems(dfi));
                // this.totalData.push(this.fs.totalDailyGoal(dfi));
        }

        updateFood() {
                this.fs.updateDailyFood();
        }

        onChanged(sr: DateSpinnerReturn) {
                this.diaryDate = sr.spinValue;
                this.fs.resetNutrientFieldsToDisplay();
                var fd = this.fs.foodDates;
                this.fs.diaryDate = this.diaryDate;
                this.isFoodDate = FindHelper.findFoodDate(this.diaryDate, fd);
                this.setTableData();
        }


        onLoadFood(sr: DateSpinnerReturn) {
                this.diaryDate = sr.spinValue;
                var d = moment(this.diaryDate).format("M-D-YYYY");
                debugger;
                var dfaItem = FindHelper.FindDailyFoodByDateString(d, this.fs.dailyFoodArray);
                if (dfaItem === null) {
                        this.fs.getDailyFoodByDate(d);
                }
        }

}