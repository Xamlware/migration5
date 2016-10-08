import { RouterModule }  from '@angular/router';
import { FoodComponent } from './food.component';
import { FoodDiaryComponent } from './diary/food.diary.component';
import { FoodRecipeComponent } from './recipe/food.recipe.component';
import { FoodExportComponent } from './export/food.export.component';
import { FoodSettingsComponent } from './settings/food.settings.component';
import { FoodAddComponent } from './diary/add/food.add.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from '../services/authGuard.service';

export const routing = RouterModule.forChild([
  { path: 'food', component: FoodComponent, canActivate: [ AuthGuardService ]},
  { path: 'diary', component: FoodDiaryComponent, canActivate: [AuthGuardService] },
  { path: 'recipe', component: FoodRecipeComponent, canActivate: [AuthGuardService] },
  { path: 'export', component: FoodExportComponent, canActivate: [AuthGuardService] },
  { path: 'foodSettings', component: FoodSettingsComponent, canActivate: [AuthGuardService] },
  { path: 'foodAdd', component: FoodAddComponent, canActivate: [AuthGuardService] },
]);
