import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { CrisisListComponent }      from './crisis-list.component';
import { HeroListComponent }        from './hero-list.component';


const routes: Routes = [
    {
        path: 'crisis-center',
        component: CrisisListComponent
    },
    {
        path: 'heroes',
        component: HeroListComponent
    }
];


@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}