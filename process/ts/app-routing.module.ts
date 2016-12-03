import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { CrisisListComponent }      from './crisis-list.component';


const routes: Routes = [
    {
        path: 'crisis-center',
        component: CrisisListComponent
    }
];


@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}