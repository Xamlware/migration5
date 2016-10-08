import { RouterModule }  from '@angular/router';
import {ThemesComponent} from './themes.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from '../services/authGuard.service';

export const routing = RouterModule.forChild([
  { path: 'themes', component: ThemesComponent, canActivate: [ AuthGuardService ]}
]);

  