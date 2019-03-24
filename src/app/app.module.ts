import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { SortablejsModule } from 'angular-sortablejs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WordSelectorComponent } from './WordSelector/WordSelector.component';
import { WordSorterComponent } from './WordSorter/WordSorter.component';
import { AlertComponent } from './alert.component';
import { TranslationComponent } from './Interactions/translation.component';
import { HomeComponent } from './Home/home.component';
import { MatchComponent } from './Interactions/match.component';
import { ConfigComponent } from './Config/config.component';
import { TrainingComponent } from './Training/training.component';

@NgModule({
  declarations: [
    AppComponent,
    WordSelectorComponent,
    WordSorterComponent,
    AlertComponent,
    TranslationComponent,
    HomeComponent,
    MatchComponent,
    ConfigComponent,
    TrainingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,
    SortablejsModule.forRoot({ animation: 150 }),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
