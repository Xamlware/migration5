import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorizationService } from '../services/authorization.service';
import { LoginService } from '../services/login.service';
import { LogoutService } from '../services/logout.service';

import { RegisterService } from '../services/register.service';
import { ThemeService } from '../services/theme.service';
import { NutritionixService } from '../services/nutritionix.service';
import { SettingsService } from '../services/settings.service';
import { ValidationService } from '../services/validation.service';
import { AppMenuService } from '../services/appMenu.service';
import { CalculationService  } from '../services/calculation.service';
import { ChallengeService  } from '../services/challenge.service';
import { AuthGuardService } from '../services/authGuard.service';
import { CanDeactivateGuardService } from '../services/canDeactivateGuard.service';
import { FoodService } from '../services/food.service';
import { ErrorMessagesComponent } from '../errorMessages/error.messages.component';
import { FoodDashboardComponent } from '../shared/foodDashboard/food.dashboard.component';
import { KgNumberSpinnerComponent } from '../shared/numberSpinner/kgNumberSpinner.component';
import { KgDateSpinnerComponent } from '../shared/dateSpinner/kgDateSpinner.component';

import {InputTextModule, GalleriaModule, MenubarModule, CheckboxModule, DialogModule, MessagesModule, GrowlModule,
  PanelModule, CalendarModule, RadioButtonModule, InputSwitchModule, SelectButtonModule, DataTableModule, DataListModule,
  SplitButtonModule, ButtonModule, DropdownModule, AccordionModule, ProgressBarModule, ConfirmDialogModule,ConfirmationService } from 'primeng/primeng'

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, 
            MenubarModule, GalleriaModule, InputTextModule, PanelModule, ButtonModule, DropdownModule, DialogModule, AccordionModule, 
            CalendarModule, SelectButtonModule, CheckboxModule, ProgressBarModule, DataTableModule, DataListModule, ConfirmDialogModule],
  declarations: [ ErrorMessagesComponent, FoodDashboardComponent, KgNumberSpinnerComponent, KgDateSpinnerComponent ],
  exports: [ CommonModule, ReactiveFormsModule, HttpModule, RouterModule, 
            MenubarModule, GalleriaModule, InputTextModule, PanelModule, ButtonModule, DropdownModule, DialogModule, AccordionModule, CalendarModule,
            SelectButtonModule, CheckboxModule, DataTableModule, DataListModule, ProgressBarModule, ErrorMessagesComponent, FoodDashboardComponent,
            KgNumberSpinnerComponent, KgDateSpinnerComponent, ConfirmDialogModule ]
        
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SettingsService, AppMenuService, AuthorizationService, LoginService, LogoutService, RegisterService, ThemeService, ValidationService,
        NutritionixService, AuthGuardService, CanDeactivateGuardService, CalculationService, ChallengeService, FoodService, ConfirmationService ]
    };
  }
}