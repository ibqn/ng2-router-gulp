import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { CanDeactivateGuard }       from './can-deactivate-guard.service';

import { PageNotFoundComponent }    from './not-found.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'crisis-center',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    providers: [ CanDeactivateGuard ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
