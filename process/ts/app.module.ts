import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule }           from '@angular/http';

import { AppComponent }         from './app.component';
import { CrisisListComponent }  from './crisis-list.component';

import { HeroesModule }         from './heroes/heroes.module';

import { AppRoutingModule }   from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import './rxjs-extensions'


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        HeroesModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        CrisisListComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}

