import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { CanDeactivateGuard }       from './can-deactivate-guard.service';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'crisis-center',
        pathMatch: 'full'
    },
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    providers: [ CanDeactivateGuard ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}