import { Component, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Button, Panel, Checkbox, SelectButton, SelectItem } from 'primeng/primeng';

import { Physical } from '../../interfaces/physical';
import { PhysicalFactory } from '../../factories/physical.factory';
import { User } from '../../interfaces/user';
import { SettingsService } from '../../services/settings.service';
import { ValidationService } from '../../services/validation.service';
import { SettingsPhysicalService } from '../../settings/physical/settings.physical.service';
import { FormModeType } from '../../enums/formModeType.enum';
import { ActivityLevelType } from '../../enums/activityLevelType.enum';
import * as moment from "moment";


@Component({

  templateUrl: 'settings.physical.component.html',
  styleUrls: ['settings.physical.component.css']
})


export class SettingsPhysicalComponent implements OnInit {
  formMode: string;
  physicalForm: FormGroup;
  userSettings: User;
  activityLevels: SelectItem[] = [];
  selectedActivityLevel: string;
  isHips: boolean;;

  constructor(private settingsService: SettingsService,
    private router: Router,
    private ar: ActivatedRoute,
    private sps: SettingsPhysicalService,
    private vs: ValidationService,
    private fb: FormBuilder) {

    this.formMode = FormModeType[ar.snapshot.params['mode']];

    this.activityLevels = [];
    this.activityLevels.push({ label: 'Sedentary', value: ActivityLevelType.sedentary });
    this.activityLevels.push({ label: 'Light', value: ActivityLevelType.light });
    this.activityLevels.push({ label: 'Moderate', value: ActivityLevelType.moderate });
    this.activityLevels.push({ label: 'Heavy', value: ActivityLevelType.heavy });
    this.activityLevels.push({ label: 'Extreme', value: ActivityLevelType.extreme });
    this.activityLevels.push({ label: 'Custom', value: ActivityLevelType.custom });

    // var modeString: string = FormModeType[FormModeType.Add];
    // var modeType : FormModeType = FormModeType["Add"];
  }

  ngOnInit() {
    this.userSettings = this.settingsService.getUserSettings();
    this.isHips = this.userSettings.sex === "F";
    var currentDate = new Date();
    var v = ValidationService;

    this.physicalForm = this.fb.group({
      date: [currentDate, [Validators.required, v.dateFieldValidator]],
      weight: ['', [Validators.required, v.numberFieldValidator]],
      height: ['', [Validators.required, v.numberFieldValidator]],
      hips: ['0', [v.numberFieldValidator]],
      waist: ['', [Validators.required, v.numberFieldValidator]],
      neck: ['', [Validators.required, v.numberFieldValidator]],
      activityLevel: [ActivityLevelType.sedentary, []],
      dateString: [moment(currentDate).format('MM/DD/YYYY'), []]
    });

    if (this.formMode === "Edit") {
      var p = this.settingsService.getSelectedPhysical(false);

      (<FormControl>this.physicalForm.controls['date']).updateValueAndValidity(moment(p.dateString).toDate());
      (<FormControl>this.physicalForm.controls['weight']).updateValueAndValidity(p.weight);
      (<FormControl>this.physicalForm.controls['height']).updateValueAndValidity(p.height);
      (<FormControl>this.physicalForm.controls['waist']).updateValueAndValidity(p.waist);
      (<FormControl>this.physicalForm.controls['neck']).updateValueAndValidity(p.neck);
      (<FormControl>this.physicalForm.controls['hips']).updateValueAndValidity(p.hips);
      (<FormControl>this.physicalForm.controls['activityLevel']).updateValueAndValidity(p.activityLevel);
      (<FormControl>this.physicalForm.controls['dateString']).updateValueAndValidity(moment(currentDate).format('MM/DD/YYYY'));
    }
  }

  onSubmit() {
    var val = <Physical>this.physicalForm.value;
    //val.userEmail = this.userSettings.emailAddress;
debugger;
    this.sps.updatePhysicalData(val);
  }

  onReset() {
    this.physicalForm.reset();
    if (this.formMode === "Edit") {
      var p = this.settingsService.getSelectedPhysical(false);

      (<FormControl>this.physicalForm.controls['date']).updateValueAndValidity(moment(p.dateString).toDate());
      (<FormControl>this.physicalForm.controls['weight']).updateValueAndValidity(p.weight);
      (<FormControl>this.physicalForm.controls['height']).updateValueAndValidity(p.height);
      (<FormControl>this.physicalForm.controls['waist']).updateValueAndValidity(p.waist);
      (<FormControl>this.physicalForm.controls['neck']).updateValueAndValidity(p.neck);
      (<FormControl>this.physicalForm.controls['hips']).updateValueAndValidity(p.hips);
      (<FormControl>this.physicalForm.controls['activityLevel']).updateValueAndValidity(p.activityLevel);
      (<FormControl>this.physicalForm.controls['dateString']).updateValueAndValidity(p.dateString);
    }
  }

  onCancel() {
    this.physicalForm.reset();
    this.router.navigate(['/settings']);
  }

}