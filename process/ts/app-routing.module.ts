import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'crisis-center',
        pathMatch: 'full'
    },
];


@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}