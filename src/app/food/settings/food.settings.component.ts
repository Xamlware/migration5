import {Component, OnInit, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Food } from '../../interfaces/food';
import { SettingsService } from '../../services/settings.service';
import { FoodService } from '../../services/food.service';

import { FindHelper } from '../../helpers/find.helper';
import { User } from '../../interfaces/user';
import { Nutrient } from '../../interfaces/nutrient';
import { NutrientDisplay } from '../../interfaces/nutrientDisplay';


@Component({
  
  selector: 'app-settings',
  templateUrl: 'food.settings.component.html',
  styleUrls: ['food.settings.component.css']
})



export class FoodSettingsComponent implements OnInit {
  foodSettingsForm: FormGroup;
  nutrientMetric: FormControl;

  userSettings: User;
  isChanged: boolean;
  value: boolean;
  errorMessage: string;
  nutrientDisplay: NutrientDisplay;

  constructor(
    private ss: SettingsService,
    private fs: FoodService,
    private r: Router,
    private fb: FormBuilder,
    private er: ElementRef) { }

  ngOnInit() {
    this.nutrientDisplay = this.fs.resetNutrientDisplay();
    

    this.foodSettingsForm = this.fb.group({
      nutrientMetric: [false],
      recipeMetric: [false],
      calories: [true],
      carbs: [true],
      protein: [true],
      fat: [true],

      fiber: [false],
      satFat: [false],
      monoFat: [false],
      polyFat: [false],
      transFat: [false],
      cholesterol: [false],
      sugars: [false],
      vitA: [false],
      vitC: [false],
      sodium: [false],
      calcium: [false],
      iron: [false],
      potassium: [false]
    });

    this.userSettings = this.ss.getUserSettings();
    if (this.userSettings.emailAddress != "") {
      this.foodSettingsForm.controls['nutrientMetric'].setValue(this.userSettings.nutrientMetric, { onlySelf: true });
      this.foodSettingsForm.controls['recipeMetric'].setValue(this.userSettings.recipeMetric, { onlySelf: true });
    }


    if (this.userSettings.nutrientData.length > 0) {
      for (let n of this.userSettings.nutrientData) {
        var nut = FindHelper.FindNutrientItemByName(n.abbr, this.userSettings.nutrientData);
        if (nut !== null) {
          this.foodSettingsForm.controls[n.abbr].setValue(n.track, { onlySelf: true });
          this.fs.setNutrientDisplayItem(n.abbr, this.foodSettingsForm.controls[n.abbr].value)
        }
      }
    }

    //this.subscribeToFormChanges();
    // this.foodSettingsForm.valueChanges
    //   .map((value) => {
    //     return value;
    //   })

    //   //.filter((value) => this.PhysicalForm.valid) 
    //   .subscribe((value) => {

    //     //FindHelper.FindNutrientItemByName(value)

    //   });

    for (let nut of this.userSettings.nutrientData) {
      this.foodSettingsForm.controls[nut.abbr].valueChanges
        //   .map((value) => {
        //     return value;
        //   })
        .subscribe(v => { console.log("value: ", v); this.completeValueChange(nut.abbr, v); });
      //   error => { this.errorMessage = error },
      //   () => this.completeValueChange('nutrientMetric'));
    }
  }

  
  completeValueChange(field: string, value: boolean) {
    this.isChanged = true;
    Nutrient.updateNutrient(field, value, this.userSettings.nutrientData);
  }


  onSubmit() {
    debugger;
    this.ss.updateNutrientData(this.userSettings);
    this.r.navigate(["/food"]);
  }

  onCancel() {
    this.r.navigate(["/food"])
  }

  subscribeToFormChanges() {
    // initialize stream
    const foodSettingsFormValueChanges$ = this.foodSettingsForm.valueChanges;

    // subscribe to the stream 
    foodSettingsFormValueChanges$.subscribe(x => {
    });
  }
}
