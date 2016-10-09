import { NgModule } from '@angular/core';

import { CalculatorComponent } from '../calculator/calculator.component';
import { KgSpinnerComponent } from '../shared/numberSpinner/kgSpinner.component';
import { ValidationService } from '../services/validation.service';
//import { ValidationMessageModule } from '../validation/validation.message.module';
import { SharedModule }   from '../shared/shared.module';
import { routing } from './calculator.routing'

@NgModule({
    imports: [ SharedModule, routing],
    declarations: [ CalculatorComponent, KgSpinnerComponent],
    bootstrap: [ CalculatorComponent ],
    exports: [ SharedModule ]


})  

export class CalculatorModule {}  