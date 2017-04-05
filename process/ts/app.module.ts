import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { FormsModule }             from '@angular/forms';
import { RouterModule, Routes }    from '@angular/router';
import { HttpModule }              from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent }           from './app.component';
import { PageNotFoundComponent }  from './not-found.component';

import { HeroesModule }           from './heroes/heroes.module';
import { CrisisCenterModule }     from './crisis-center/crisis-center.module';
import { AdminModule }            from './admin/admin.module';

import { AppRoutingModule }       from './app-routing.module';
import { LoginRoutingModule }     from './login-routing.module';
import { LoginComponent }         from './login.component';

import { InMemoryWebApiModule }   from 'angular-in-memory-web-api';
import { InMemoryDataService }    from './in-memory-data.service';

import { DialogService }          from './dialog.service';

import './rxjs-extensions';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        LoginRoutingModule,
        CrisisCenterModule,
        HeroesModule,
        AdminModule,
        AppRoutingModule,
    ],
    declarations: [
        LoginComponent,
        PageNotFoundComponent,
        AppComponent
    ],
    providers: [
        DialogService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
