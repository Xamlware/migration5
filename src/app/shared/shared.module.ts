import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//import { Angular2DataTableModule } from 'angular2-data-table';

import { AuthorizationService } from '../services/authorization.service';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';
import { ThemeService } from '../services/theme.service';
import { NutritionixService } from '../services/nutritionix.service';
import { SettingsService } from '../services/settings.service';
import { ValidationService } from '../services/validation.service';
import { AppMenuService } from '../services/appMenu.service';
import { CalculationService  } from '../services/calculation.service';
import { ChallengeService  } from '../services/challenge.service';
import { AuthGuardService } from '../services/authGuard.service';
import { FoodService } from '../services/food.service';
import { ErrorMessagesComponent } from '../errorMessages/error.messages.component';
import { FoodDashboardComponent } from '../shared/foodDashboard/food.dashboard.component';

import {InputTextModule, GalleriaModule, MenubarModule, CheckboxModule, DialogModule, MessagesModule, GrowlModule,
  PanelModule, CalendarModule, RadioButtonModule, InputSwitchModule, SelectButtonModule, DataTableModule, DataListModule,
  SplitButtonModule, ButtonModule, DropdownModule, AccordionModule, ProgressBarModule} from 'primeng/primeng'


@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, //Angular2DataTableModule, 
            MenubarModule, GalleriaModule, InputTextModule, PanelModule, ButtonModule, DropdownModule, DialogModule, AccordionModule, 
            CalendarModule, SelectButtonModule, CheckboxModule, ProgressBarModule, DataTableModule, DataListModule],
  declarations: [ ErrorMessagesComponent, FoodDashboardComponent ],
  exports: [ CommonModule, ReactiveFormsModule, HttpModule, RouterModule, //Angular2DataTableModule, 
            MenubarModule, GalleriaModule, InputTextModule, PanelModule, ButtonModule, DropdownModule, DialogModule, AccordionModule, CalendarModule,
            SelectButtonModule, CheckboxModule, DataTableModule, DataListModule, ProgressBarModule, ErrorMessagesComponent, FoodDashboardComponent ]
})

export class SharedModule {
  //
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SettingsService, AppMenuService, AuthorizationService, LoginService, RegisterService, ThemeService, ValidationService,
        NutritionixService, AuthGuardService, CalculationService, ChallengeService, FoodService ]
    };
  }
}