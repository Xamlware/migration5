import { RouterModule }  from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SettingsPhysicalComponent } from './physical/settings.physical.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from '../services/authGuard.service';

export const routing = RouterModule.forChild([
  { path: 'settings', component: SettingsComponent, canActivate: [ AuthGuardService ] },
  { path: 'physical/:mode', component: SettingsPhysicalComponent, canActivate: [ AuthGuardService ] },
]);

  