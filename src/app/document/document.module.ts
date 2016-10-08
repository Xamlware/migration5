import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';


import {DocumentComponent} from './document.component';
import {routing} from './document.routing'

@NgModule({
    imports: [BrowserModule, HttpModule, routing],
    declarations: [DocumentComponent],
    bootstrap: [DocumentComponent]
})

export class DocumentModule {}