import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {Menu, MenuItem, Panel, Menubar, Button, Galleria} from 'primeng/primeng'
import {AboutComponent} from './about.component';
import {routing} from './about.routing'; 

@NgModule({
    imports: [BrowserModule, HttpModule, routing],
    declarations: [AboutComponent],
    bootstrap: [AboutComponent],
    providers: []

}) 

export class AboutModule {} 