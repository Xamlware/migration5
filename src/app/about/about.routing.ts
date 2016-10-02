import { RouterModule }  from '@angular/router';
import {AboutComponent} from './about.component';

export const routing = RouterModule.forChild([
  { path: 'about', component: AboutComponent}
]);
