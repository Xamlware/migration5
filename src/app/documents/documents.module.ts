import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';


import {DocumentsComponent} from './documents.component';
import {routing} from './documents.routing'

@NgModule({
    imports: [BrowserModule, HttpModule, routing],
    declarations: [DocumentsComponent],
    bootstrap: [DocumentsComponent]
})

export class DocumentsModule {}