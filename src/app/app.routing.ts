import { Routes } from '@angular/router';
import { AuthGuardService } from './services/authGuard.service';

export const routeConfig = [
    { path: '', redirectTo: '/home', pathMatch: 'full'  },
    { path: 'home',  loadChildren: './app/home/home.module#HomeModule' },
    { path: 'document',  loadChildren: './app/document/document.module#DocumentModule' },
    { path: 'calculator', loadChildren: './app/calculator/calculator.module#CalculatorModule'},
    { path: 'food',  loadChildren: './app/food/food.module#FoodModule', canActivate: [ AuthGuardService ] },
    { path: 'themes',  loadChildren: './app/themes/themes.module#ThemesModule', canActivate: [ AuthGuardService ] },
    { path: 'settings',  loadChildren: './app/settings/settings.module#SettingsModule', canActivate: [ AuthGuardService ] },
    { path: 'about',  loadChildren: './app/about/about.module#AboutModule' },
    { path: '**',  loadChildren: './app/home/home.module#HomeModule' },
];

export const appRoutingProviders: any[] = []; 
 