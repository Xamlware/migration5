import { NgModule } from '@angular/core';
import { DocumentComponent } from './document.component';
import { SharedModule }   from '../shared/shared.module';
import {routing} from './document.routing'

@NgModule({
    imports: [ SharedModule, routing] ,
    declarations: [DocumentComponent],
    bootstrap: [DocumentComponent]
})

export class DocumentModule {}