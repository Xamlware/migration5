import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputText, Checkbox, Message, Messages, Growl, Panel, Calendar, RadioButton, InputSwitch,
    SelectButton, SelectItem, DataTable, Column, SplitButton, Button, Dropdown } from 'primeng/primeng'

import { SettingsService } from '../services/settings.service';
import { ValidationService } from '../services/validation.service';
import { User } from '../interfaces/User';
import { UserFactory } from '../factories/user.factory';
import { FindHelper } from '../helpers/find.helper';
import { Calculation } from '../interfaces/calculation';
import { Blood } from '../interfaces/blood';
import { Lipid } from '../interfaces/lipid';
import { Physical } from '../interfaces/physical';
import { PhysicalFactory } from '../factories/physical.factory';
import { CalculationFactory } from '../factories/calculation.factory';
import { MeasurementType } from '../enums/measurementType.enum';
import { FormModeType } from '../enums/formModeType.enum';
import * as moment from "moment";

@Component({
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.css']

})

export class SettingsComponent implements OnInit {
    userSettings: User = new UserFactory().createNewUser();
    errorMessage: string;
    profileForm: FormGroup;
    gridForm: FormGroup;
    physicalForm: FormGroup;
    //grid: FormControl;
    measurementType: MeasurementType;
    calculationCols: any[];
    bloodCols: any[];
    diabetesCols: any[];
    lipidCols: any[];
    urineCols: any[];
    isPhysicalGrid: boolean;
    isCalculationGrid: boolean;
    isBloodGrid: boolean;
    isLipidGrid: boolean;
    selectedTablePhysical: Physical;
    selectedPhysical: Physical;
    selectedLipid: Lipid;
    selectedBlood: Blood;
    selectedCalculation: Calculation;
    physicalCols: any[];
    physicalData: Physical[] = [];
    msgs: Message[] = [];
    selectedPk: number = 0;
    selectedMetrics: string[] = [];
    sexes: SelectItem[] = [];
    selectedSex: string;
    calculationData: Calculation[] = [];
    bloodData: Blood[] = [];
    lipiddData: Lipid[] = [];
    grids: SelectItem[];
    selectedGrid: string;
    display: boolean = false;



    //, private tokenService: TokenService
    constructor(private settingsService: SettingsService,
        private builder: FormBuilder,
        private router: Router) {

        this.physicalCols = [
            { field: 'dateString', header: 'Date' },
            { field: 'weight', header: 'Weight' },
            { field: 'height', header: 'Height' },
            { field: 'waist', header: 'Waist' },
            { field: 'neck', header: 'Neck' },
            { field: 'activityLevelAsString', header: 'Activity Level' }
        ];

        this.calculationCols = [
            { field: 'dateString', header: 'Date' },
            { field: 'macroCarbs', header: 'Carbs' },
            { field: 'macroProtein', header: 'Protein' },
            { field: 'macroFat', header: 'Fat' },
            { field: 'fat', header: 'Body Fat' },
            { field: 'bmr', header: 'BMR' },
            { field: 'lbm', header: 'LBM' },
            { field: 'kmBmr', header: 'KmBMR' },
            { field: 'mjBmr', header: 'MjBMR' },
            { field: 'tdee', header: 'TDEE' }
        ];

        this.bloodCols = [
            { field: 'dateString', header: 'Date' },
            { field: 'wbc', header: 'WBC' },
            { field: 'rbc', header: 'RBC' },
            { field: 'hgb', header: 'HGB' },
            { field: 'hct', header: 'HCT' },
            { field: 'mcv', header: 'MCV' },
            { field: 'mch', header: 'MCH' },
            { field: 'mchc', header: 'MCHC' },
            { field: 'rdw', header: 'RDW' },
            { field: 'plt', header: 'PLT' }
        ];

        this.lipidCols = [
            { field: 'dateString', header: 'Date' },
            { field: 'chol', header: 'Choleterol' },
            { field: 'hdl', header: 'Hdl (good)' },
            { field: 'ldl', header: 'Ldl (bad)' },
            { field: 'trig', header: 'TriGlycerides' }
        ];

        this.sexes = [];
        this.sexes.push({ label: 'Male', value: 'M' });
        this.sexes.push({ label: 'Female', value: 'F' });

        this.grids = [];
        this.grids.push({ label: 'Physical Data', value: "physical" });
        this.grids.push({ label: 'Macro Calculation Data', value: "calculation" });
        this.grids.push({ label: 'Blood Test Data', value: "blood" });
        this.grids.push({ label: 'Lipid Data', value: "lipid" });


        var us = this.settingsService.getUserSettings();
        if (us != undefined) {
            this.userSettings = new UserFactory().createUser(us);

            this.isPhysicalGrid = true;
            this.physicalData = new PhysicalFactory().createPhysicalArray(this.userSettings.physicalData, this.userSettings);
            this.calculationData = CalculationFactory.createCalculationArray(this.userSettings.calculationData, this.userSettings, true);



            if (this.userSettings.profileMetric === true) {
                this.selectedMetrics.push("profile")
            }

            if (this.userSettings.nutrientMetric === true) {
                this.selectedMetrics.push("nutrient")
            }

            if (this.userSettings.recipeMetric === true) {
                this.selectedMetrics.push("recipe")
            }

            if (this.userSettings.sex) {
                this.selectedSex = this.userSettings.sex;
                if (this.userSettings.sex === "F") {
                    this.physicalCols.push({ field: 'hips', header: 'Hips' });
                }
            }
        }

    }

    ngOnInit() {
        this.selectedGrid = "physical"
        if (this.physicalData.length > 0) {
            this.selectedTablePhysical = this.physicalData[0];
            this.selectedPhysical = FindHelper.FindPhysicalByKey(this.physicalData[0].pK_Physical, this.userSettings);
            this.settingsService.setSelectedPhysical(this.selectedPhysical);
        }

        var v = ValidationService;

        this.profileForm = this.builder.group({
            userName: [''],
            lastName: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            dob: ['', [Validators.required]],
            sex: ['', [Validators.required]],
            emailAddress: [''],
            profileMetric: [false],
            activityLevel: ['', []]
        });

        this.gridForm = this.builder.group({
            grid: ['physical', []],
        });

        this.physicalForm = this.builder.group({
            date: ['', []]
        });

        this.physicalForm.controls['date'].setValue(moment(new Date()).format("ddd, MMM DD, YYYY"));

        var us = this.settingsService.getUserSettings()
//        this.profileForm.controls['userName'].setValue({value: us.userName, disabled: true }, {onlySelf: true });
        this.profileForm.controls['lastName'].setValue(us.lastName, { onlySelf: true });
        this.profileForm.controls['firstName'].setValue(us.firstName, { onlySelf: true });
        this.profileForm.controls['dob'].setValue(us.dob, { onlySelf: true });
        if (us.sex === null) {
            us.sex = 'M';
        }

        if (us.sex === "F") {
            this.physicalCols.push({ field: 'hips', header: 'Hips' });
        }

        this.profileForm.controls['sex'].setValue(us.sex, { onlySelf: true });
        //this.profileForm.controls['emailAddress'].setValue({value: us.emailAddress, disabled: true }, { onlySelf: true });
        this.profileForm.controls['profileMetric'].setValue(us.profileMetric, { onlySelf: true });


        // if (us.profileMetric === true) {
        //     this.selectedMetrics.push("profile")
        // }


        if (this.userSettings.sex) {
            this.selectedSex = this.userSettings.sex;
            if (this.userSettings.sex === "F") {
                this.physicalCols.push({ field: 'hips', header: 'Hips' });
            }
        }
    }

    onSubmit(): void {
        if (this.profileForm.touched) {
            this.settingsService.updateProfileInformation(this.profileForm.value);
        }
    }

    onEdit() {
    }

    updateData(event: any) {
        this.selectedGrid = event.value;
        this.isPhysicalGrid = (this.selectedGrid === 'physical');
        this.isCalculationGrid = (this.selectedGrid === 'calculation');
        this.isBloodGrid = (this.selectedGrid === 'blood');
        this.isLipidGrid = (this.selectedGrid === 'lipid');
    }


    onCalculateMacros() {
        this.router.navigate(['/calculator']);
    }

    onChartData() {
    }

    onDobChanged(event: any) {
    }

    onSexChanged(event: any) {
        this.userSettings.sex = event;
    }

    onProfileMetricChanged(event: any) {
        this.userSettings.profileMetric = event;
    }

    onNutrientMetricChanged(event: any) {
        this.userSettings.nutrientMetric = event;
    }

    onRecipeMetricChanged(event: any) {
        this.userSettings.recipeMetric = event;
    }

    onAddData() {
        if (this.isPhysicalGrid) {

            var mode: FormModeType = FormModeType["Add"];
            this.router.navigate(['/physical/' + mode]);
        }
    }

    onEditData() {
        if (this.isPhysicalGrid) {
            var mode: FormModeType = FormModeType["Edit"];
            this.router.navigate(['/physical/' + mode]);
        }
    }

    onPhysicalSelect(event: any) {
        this.selectedPhysical = FindHelper.FindPhysicalByEmail(<Physical>event.data, this.userSettings);
        this.settingsService.setSelectedPhysical(this.selectedPhysical);
    }

    onCalculationSelect(event: any) {
        this.selectedCalculation = FindHelper.FindCalculation(<Calculation>event.data, this.userSettings);
        this.settingsService.setSelectedCalculation(this.selectedCalculation);
    }

    onBloodSelect(event: any) {
        this.selectedBlood = <Blood>event.data;
        this.settingsService.setSelectedBlood(this.selectedBlood);

    }

    onLipidSelect(event: any) {
        this.selectedLipid = <Lipid>event.data;
        this.settingsService.setSelectedLipid(this.selectedLipid);

    }

    completeDataGet() {
        this.settingsService.setUserSettings(this.userSettings);
        //this.physicalData = this.userSettings.physicalData;

        if (this.userSettings.profileMetric === true) {
            this.selectedMetrics.push("profile")
        }

        if (this.userSettings.nutrientMetric === true) {
            this.selectedMetrics.push("nutrient")
        }

        if (this.userSettings.recipeMetric === true) {
            this.selectedMetrics.push("recipe")
        }

        // if (this.userSettings.sex) {
        //     this.selectedSex = this.userSettings.sex;
        //     if (this.userSettings.sex === "F") {
        //         this.physicalCols.push({ field: 'hips', header: 'Hips' });
        //     }
        // }
    }
}
