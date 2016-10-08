import { RouterModule }  from '@angular/router';
import { CalculatorComponent } from './calculator.component';

export const routing = RouterModule.forChild([
  { path: 'calculator', component: CalculatorComponent }
 
]);
