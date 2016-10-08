import {NgModule} from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ThemesComponent } from './themes.component';
import { routing } from './themes.routing' 
import { Menubar, InputText, Panel, Button, Dropdown } from 'primeng/primeng';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [ ThemesComponent ],
    bootstrap: [ ThemesComponent ],
    providers: []

}) 

export class ThemesModule {} 