import { NgModule } from '@angular/core';

import { Menu, MenuItem, Panel, Button } from 'primeng/primeng'
import { FoodComponent } from '../food/food.component';
//import { FoodDashboardComponent } from '../food/dashboard/food.dashboard.component';
import { FoodDiaryComponent } from '../food/diary/food.diary.component';
import { FoodRecipeComponent } from '../food/recipe/food.recipe.component';
import { FoodExportComponent } from '../food/export/food.export.component';
import { FoodSettingsComponent } from '../food/settings/food.settings.component';
import { FoodAddComponent } from '../food/diary/add/food.add.component';
import { SharedModule } from '../shared/shared.module';

import { routing } from './food.routing'; 



@NgModule({
    imports: [ routing, SharedModule ],
    declarations: [ FoodComponent, FoodDiaryComponent, FoodRecipeComponent, FoodExportComponent, FoodSettingsComponent, FoodAddComponent ],
    bootstrap: [ FoodComponent ],
    providers: []

}) 

export class FoodModule {

} 