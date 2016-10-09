import { RouterModule }  from '@angular/router';
import {DocumentsComponent} from './documents.component';

export const routing = RouterModule.forChild([
  { path: 'documents', component: DocumentsComponent}
]);

  