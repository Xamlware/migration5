import { RouterModule }  from '@angular/router';
import {DocumentComponent} from './document.component';

export const routing = RouterModule.forChild([
  { path: 'document', component: DocumentComponent}
]);

  