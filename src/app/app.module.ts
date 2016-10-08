import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterOutletMap } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// import { ErrorMessagesComponent } from './errorMessages/error.messages.component';
import { appRoutingProviders, appRoutes } from './app.routing';

import { HomeModule } from './home/home.module';
import { FoodModule } from './food/food.module';
import { SettingsModule } from './settings/settings.module';
import { ThemesModule } from './themes/themes.module';
import { DocumentModule } from './document/document.module';
import { CalculatorModule } from './calculator/calculator.module';

import { AboutModule } from './about/about.module';
import { SharedModule }   from './shared/shared.module';
// import { Menubar, MenuItem } from 'primeng/primeng';


@NgModule({
    imports: [ BrowserModule, RouterModule.forRoot(appRoutes), SharedModule.forRoot(),
    HomeModule, DocumentModule, AboutModule, SettingsModule, ThemesModule, CalculatorModule, FoodModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ],
    providers: [ appRoutingProviders ]

}) 

export class AppModule {} 