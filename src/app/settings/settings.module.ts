import {NgModule} from '@angular/core';

import {Button, Panel, Checkbox, InputText, RadioButton, DataTable } from 'primeng/primeng';
import {SettingsComponent} from './settings.component';
import {SettingsPhysicalService} from './physical/settings.physical.service';
import {SettingsPhysicalComponent} from './physical/settings.physical.component';
import {routing} from './settings.routing'
import {SharedModule} from '../shared/shared.module' 

 
@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [ SettingsComponent, SettingsPhysicalComponent ],
    bootstrap: [ SettingsComponent ],
    providers:[ SettingsPhysicalService ]
})

export class SettingsModule {
    constructor() {
        
    }
}