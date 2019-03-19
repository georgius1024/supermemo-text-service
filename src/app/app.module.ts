import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { SortablejsModule } from 'angular-sortablejs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WordSelectorComponent } from './WordSelector/WordSelector.component';
import { WordSorterComponent } from './WordSorter/WordSorter.component';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [
    AppComponent,
    WordSelectorComponent,
    WordSorterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    HttpClientModule,
    SortablejsModule.forRoot({ animation: 150 }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
